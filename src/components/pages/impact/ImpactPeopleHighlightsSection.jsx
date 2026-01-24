const ImpactPeopleHighlightsSection = ({
  title = 'Voices from Our Community',
  description =
    'Our values come alive through the people who learn with us, build with us, and partner with us.',
  people = []
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">{description}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {people.map((person) => (
            <div
              key={person.name}
              className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm"
            >
              <div className="text-lg font-bold text-gray-900">{person.name}</div>
              <div className="mt-2 text-sm text-gray-600">{person.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactPeopleHighlightsSection;
