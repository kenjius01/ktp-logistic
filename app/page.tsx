import { Banner } from '@/components/Banner/Banner';
import { Contact } from '@/components/contact/Contact';
import ServicesIntro from '@/components/pages/home/ServicesIntro';

export default function Home() {
  return (
    <div className="">
      <Banner />
      <ServicesIntro />
      <Contact />
    </div>
  );
}
