import { Link } from 'react-router-dom';
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
      name: 'Magdalene',
      role: 'Human Resources Team Lead',
      organization: 'ZyraTech',
      location: 'Koforidua, Ghana',
      image: '/images/team/magdalene.jpg',
      quote:
        'Working with the ZyraTech team in Koforidua has shown me how integrity and collaboration create real opportunities for learners—when we stay consistent, people grow and teams deliver.'
    }
  ];

  const livingOurValues = [
    {
      title: 'Learning by doing',
      description:
        'We create hands-on experiences that help learners build confidence, teamwork, and real-world problem-solving skills.',
      to: '/blog'
    },
    {
      title: 'Building with community',
      description:
        'We collaborate with schools, mentors, and partners to design initiatives that are grounded in local context and real needs.',
      to: '/blog'
    },
    {
      title: 'Quality that lasts',
      description:
        'We focus on craftsmanship and continuous improvement—so what we teach and build can be trusted and scaled.',
      to: '/blog'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <ImpactHeroSection />
      <ImpactCommunitySection />
      <ImpactValuesSection items={values} />
      <ImpactPeopleHighlightsSection people={highlights} />

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">How We Live Our Values</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our values are not just words. They guide how we show up for our learners, how we collaborate with partners, and how we build solutions.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {livingOurValues.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col"
              >
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
                  {item.description}
                </p>
                <div className="mt-4">
                  <Link
                    to={item.to}
                    className="inline-flex items-center font-semibold text-[#004fa2] hover:text-[#003d7a]"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterHero />
    </div>
  );
};

export default ImpactPage;
