export const DEFAULT_FILTER = {
  keyword: '',
  filters: [],
  pageable: {
    page: 1,
    page_size: 10,
  },
};

export const DEFAULT = {
  PAGE: 1,
  PAGE_SIZE: 10,
  NEWS_PAGE_SIZE: 9,
};

export const socialContacts = [
  {
    link: 'sms:+84948484859',
    image: '/images/fbIcon.png',
    type: 'facebook',
    color: '#000',
  },
  {
    link: 'https://zalo.me/0948484859',
    image: '/images/zalo.png',
    type: 'zalo',
  },

  {
    link: 'https://wa.me/0979222357',
    image: '/images/whatsapp.png',
    type: 'whatsapp',
  },
  {
    link: 'tel:+84948484859',
    image: '/images/Call-Icon.png',
    type: 'phone',
  },
];

export const listAdInfos = [
  {
    id: 1,
    title: 'Đa Dạng Hình Thức',
    image: '/images/logistics1.png',
    desc: 'Cung cấp đa dạng các hình thức vận chuyển như đường biển, đường bộ, đường hàng không. Đáp ứng mọi nhu cầu gửi hàng của quý khách.',
    style: { backgroundColor: '#fef3c7' },
  },
  {
    id: 2,
    title: 'Vận Chuyển Nhanh',
    style: { backgroundColor: '#e9d5ff' },

    image: '/images/logistics2.png',
    desc: 'Gửi hàng đi Singapore, Malaysia nhận sau 1-2 ngày. Đi Hàn Quốc, Đài Loan nhận sau 3-5 ngày. Các nước hâu Âu, Mỹ nhận hàng sau 7-10 ngày.',
  },
  {
    id: 3,
    title: 'Cước Phí Ưu Đãi',
    style: { backgroundColor: '#6ee7b7' },
    image: '/images/logistics3.png',
    desc: 'Hỗ trợ khách hàng trong quá trình thông quan hàng hóa, đóng gói và bảo quản hàng hóa. Từ đó giảm tải được nhiều chi phí phát sinh.',
  },
  {
    id: 4,
    title: 'Thủ Tục Đơn Giản',
    style: { backgroundColor: '#fda4af' },
    image: '/images/logistic4.png',
    desc: 'Các thủ tục trước khi bay như đóng gói, cân kiểm hàng hóa sẽ do Thịnh Phát Logistics đảm nhiệm. Mọi chứng từ, thủ tục thông quan sẽ được nhân viên Thịnh Phát Logistics đảm nhiệm.',
  },
];

export const processList = [
  {
    id: 1,
    image: '/images/customerService.png',
    title: '1. Tiếp nhận dịch vụ và tư vấn gửi hàng',
    desc: 'Tư vấn giá cước của các tuyến theo nhu cầu khách hàng. Giải đáp các câu hỏi về kích cỡ hàng hóa, trọng lượng hàng hóa, các loại hàng cấm, hàng khó gửi,…',
  },
  {
    id: 2,
    image: '/images/cashOnDelivery.png',
    title: '2. Nhận hàng tại kho sau khi đã đạt thỏa thuận',
    desc: 'Sau khi đã đạt được các thỏa thuận liên quan tới chi phí, thủ tục, thời gian vận chuyển để gửi hàng đi nước ngoài. Khách hàng có thể gửi hàng tới kho của Thịnh Phát Logistics. Tại kho, Thịnh Phát Logistics sẽ tiến hành các bước cân kiểm hàng hóa và bổ sung thêm thông tin của người nhận để làm thủ tục thông quan hàng hóa.',
  },
  {
    id: 3,
    image: '/images/deliveryMan.png',
    title: '3. Đóng gói hàng hóa và thanh toán',
    desc: 'Sau khi hàng hóa được kiểm tra và không phát sinh các vấn đề liên quan. Thịnh Phát Logistics sẽ tiến hành đóng gói hàng và báo cước vấn chuyển. Khách hàng thanh toán cước vận chuyển và đối chiếu lại thông tin để tránh sai sót.',
  },
  {
    id: 4,
    image: '/images/delivery.png',
    title: '4. Thông quan - vận chuyển và giao hàng',
    desc: 'Quá trình thông quan và vận chuyển sẽ được thực hiện gần như cùng một khoảng thời gian. Thịnh Phát Logistics sẽ cập nhật tình trạng đơn hàng liên tục cho tới khi khách hàng nhận thành công đơn hàng.\n Lưu ý: Người gửi chỉ thanh toán một lần duy nhất và người nhận chỉ nhận hàng!',
  },
];

export const listFeedback = [
  {
    id: 1,
    image: '/feedback/feedback.png',
  },
  {
    id: 2,
    image: '/feedback/feedback2.png',
  },
  {
    id: 3,
    image: '/feedback/feedback3.png',
  },
  {
    id: 4,
    image: '/feedback/feedback4.png',
  },
  {
    id: 5,
    image: '/feedback/feedback5.png',
  },
  { id: 6, image: '/feedback/feedback6.png' },
  {
    id: 7,
    image: '/feedback/feedback7.png',
  },
  {
    id: 8,
    image: '/feedback/feedback8.png',
  },
  {
    id: 9,
    image: '/feedback/feedback9.png',
  },
];

export const GENDER_OPTIONS = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ', label: 'Nữ' },
];

export const proxyConfigs = [
  {
    url: 'https://eservice.7-11.com.tw/e-tracking/search.aspx',
    selectorsToRemove: ['header', 'footer'],
  },
  {
    url: 'https://fmec.famiport.com.tw/FP_Entrance/QueryBox',
    selectorsToRemove: ['.site-header', '.site-footer'],
  },
  {
    url: 'https://www.t-cat.com.tw/inquire/trace.aspx',
    selectorsToRemove: ['.nav-bar', '.bottom-section'], // Xóa navbar và footer của một trang khác
  },
];
