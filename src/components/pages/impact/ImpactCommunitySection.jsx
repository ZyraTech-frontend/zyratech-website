const ImpactCommunitySection = ({
  title = 'The Zyra Tech Community',
  description =
    'Our community is a growing network of learners, mentors, educators, and partners working together to drive technology transformation and social impact. We build with local context in mind—so solutions are practical, sustainable, and rooted in real needs.'
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default ImpactCommunitySection;
