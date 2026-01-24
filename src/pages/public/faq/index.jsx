import FaqHero from '../../../components/pages/faq/FaqHero';
import FaqCategories from '../../../components/pages/faq/FaqCategories';
import HrContactSection from '../../../components/common/HrContactSection';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';

const FaqPage = () => {
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
