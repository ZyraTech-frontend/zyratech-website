const ImpactCommunitySection = ({
  title = 'The ZyraTech Community',
  description =
    'The ZyraTech community is a vibrant and diverse network of learners, mentors, educators, and partners dedicated to building practical skills and technology solutions that matter. United by a common goal, we collaborate across different backgrounds and perspectives—working together to create opportunity, strengthen local innovation, and build a more connected future through technology.'
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">{title}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default ImpactCommunitySection;
