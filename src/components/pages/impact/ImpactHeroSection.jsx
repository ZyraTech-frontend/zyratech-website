const ImpactHeroSection = ({
  title = 'Our Impact',
  description =
    'Zyra Tech Hub exists to create measurable change—by expanding access to STEM education, building practical skills, and supporting purpose-driven innovation for communities in Ghana.'
}) => {
  return (
    <section className="pt-20 sm:pt-28 lg:pt-32 pb-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactHeroSection;
