import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import Identification from '@/components/Identification';
import Benefits from '@/components/Benefits';
import Contents from '@/components/Contents';
import Samples from '@/components/Samples';
import ChatDemo from '@/components/ChatDemo';
import RealConversations from '@/components/RealConversations';
import Testimonials from '@/components/Testimonials';
import Offer from '@/components/Offer';
import Refund from '@/components/Refund';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import MobileStickyCTA from '@/components/MobileStickyCTA';

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Highlights />
        <Identification />
        <Benefits />
        <Contents />
        <Samples />
        <ChatDemo />
        <RealConversations />
        <Testimonials />
        <Offer />
        <Refund />
        <FAQ />
        <FinalCTA />
      </main>
      <div id="site-footer">
        <Footer />
      </div>
      <MobileStickyCTA />
    </>
  );
}
