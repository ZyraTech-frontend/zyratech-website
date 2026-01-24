import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import ImpactHeroSection from '../../../components/pages/impact/ImpactHeroSection';
import ImpactCommunitySection from '../../../components/pages/impact/ImpactCommunitySection';
import ImpactValuesSection from '../../../components/pages/impact/ImpactValuesSection';
import ImpactPeopleHighlightsSection from '../../../components/pages/impact/ImpactPeopleHighlightsSection';

const ImpactPage = () => {
  const values = [
    {
      title: 'Diversity',
      description:
        "We believe growth and innovation happen when we embrace different backgrounds, experiences, and ideas. We build an environment of respect and open-mindedness where everyone can learn and contribute."
    },
    {
      title: 'Collaboration',
      description:
        "We work hand-in-hand with learners, schools, partners, and communities. We value each person’s strengths and combine them to deliver solutions with real impact."
    },
    {
      title: 'Excellence',
      description:
        'We strive for high quality in our training, products, and partnerships—aiming to exceed expectations through professionalism, discipline, and continuous improvement.'
    },
    {
      title: 'Integrity',
      description:
        'We act with honesty and consistency. We communicate transparently and take responsibility for our work, our outcomes, and our commitments.'
    },
    {
      title: 'Passion',
      description:
        'We are driven by purpose. Passion fuels our energy to keep learning, to go the extra mile, and to build technology that improves lives.'
    }
  ];

  const highlights = [
    {
      name: '— Magdalene',
      role: 'Human Resources Team Lead, Ghana'
    },
    {
      name: '— Zyra Tech Hub',
      role: 'STEM Education & Innovation Community, Ghana'
    },
    {
      name: '— Our Learners',
      role: 'Builders, problem-solvers, and future tech leaders'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <ImpactHeroSection />
      <ImpactCommunitySection />
      <ImpactValuesSection items={values} />
      <ImpactPeopleHighlightsSection people={highlights} />

      <NewsletterHero />
    </div>
  );
};

export default ImpactPage;
