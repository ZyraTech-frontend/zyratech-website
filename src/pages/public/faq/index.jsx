import FaqHero from '../../../components/pages/faq/FaqHero';
import FaqCategories from '../../../components/pages/faq/FaqCategories';
import HrContactSection from '../../../components/common/HrContactSection';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import useSEO from '../../../hooks/useSEO';

const FaqPage = () => {
  useSEO({
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about Zyra Tech Hub training programs, courses, enrollment, partnerships, and IT services in Ghana.',
    url: '/faq',
    keywords: 'FAQ, frequently asked questions, Zyra Tech Hub help, training questions, IT courses FAQ Ghana'
  });

  return (
    <div className="min-h-screen bg-white">
      <FaqHero />
      <FaqCategories />
      <HrContactSection title="HR Team Lead" />
      <NewsletterHero />
    </div>
  );
};

export default FaqPage;
