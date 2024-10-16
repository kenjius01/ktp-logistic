import { translate } from '@vitalets/google-translate-api';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { NextRequest, NextResponse } from 'next/server';

// Danh sách các selector cần loại bỏ
const SELECTORS_TO_REMOVE = ['header', 'footer', '.ad-banner', '.sidebar'];

/**
 * Lấy và dịch tất cả nội dung văn bản từ một element, bỏ qua script/style.
 */
async function translateElementContent(element: Element): Promise<void> {
  const childNodes = Array.from(element.childNodes);

  for (const node of childNodes) {
    if (node.nodeType === 3) {
      // Node.TEXT_NODE
      const originalText = node.textContent?.trim();
      if (originalText) {
        try {
          const translated = await translate(originalText, { to: 'vi' });
          node.textContent = translated.text;
        } catch (error) {
          console.error('Translation error:', error);
        }
      }
    } else if (node.nodeType === 1) {
      // Node.ELEMENT_NODE
      const tagName = (node as Element).tagName;
      if (!['SCRIPT', 'STYLE'].includes(tagName)) {
        await translateElementContent(node as Element); // Đệ quy cho các phần tử con
      }
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
      return new NextResponse('Missing target URL', { status: 400 });
    }

    // Bước 1: Lấy HTML từ trang web mục tiêu
    const { data: html } = await axios.get(targetUrl);
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Bước 2: Loại bỏ các phần tử không cần thiết
    SELECTORS_TO_REMOVE.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => el.remove());
    });

    // Bước 3: Dịch toàn bộ nội dung trong <body>, bỏ qua script và style
    await translateElementContent(document.body);

    // Bước 4: Trả về HTML đã dịch
    return new NextResponse(dom.serialize(), {
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error fetching or translating content:', error);
    return new NextResponse('Failed to load or translate content', { status: 500 });
  }
}
