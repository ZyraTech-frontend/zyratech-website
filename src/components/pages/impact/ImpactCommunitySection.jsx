const ImpactCommunitySection = ({
  title = 'The ZyraTech Community',
  description =
    'The ZyraTech community is a vibrant and diverse network of learners, mentors, educators, and partners dedicated to building practical skills and technology solutions that matter. United by a common goal, we collaborate across different backgrounds and perspectives—working together to create opportunity, strengthen local innovation, and build a more connected future through technology.'
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
