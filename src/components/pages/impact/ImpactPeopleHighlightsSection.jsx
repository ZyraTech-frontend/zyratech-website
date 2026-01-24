const ImpactPeopleHighlightsSection = ({
  title = 'Voices from Our Community',
  description =
    'Our values come alive through the people who learn with us, build with us, and partner with us.',
  people = []
}) => {
  const isSingle = people.length === 1;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">{title}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map((person) => {
            const hasQuote = Boolean(person.quote);
            const cardLayoutClass = isSingle ? 'lg:col-start-2' : '';
            const initials = String(person.name || '')
              .trim()
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part.charAt(0).toUpperCase())
              .join('');

            return (
              <div
                key={person.name}
                tabIndex={0}
                className={`rounded-2xl bg-white border-[3px] border-[#004fa2] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004fa2]/35 focus-visible:ring-offset-2 ${cardLayoutClass}`}
              >
                <div className="p-6 sm:p-7">
                  {hasQuote ? (
                    <>
                      <div className="text-[#004fa2] text-5xl leading-none font-extrabold">“</div>
                      <p className="mt-3 text-base sm:text-lg text-gray-700 leading-relaxed">
                        {person.quote}
                      </p>
                    </>
                  ) : null}

                  <div className={hasQuote ? 'mt-6' : ''}>
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-full bg-[#004fa2] text-white flex items-center justify-center font-bold overflow-hidden">
                        <span className="relative z-10">{initials || 'ZT'}</span>
                        {person.image ? (
                          <img
                            src={person.image}
                            alt={person.name}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : null}
                      </div>

                      <div>
                        <div className="text-lg font-bold text-gray-900">{person.name}</div>
                        <div className="mt-1 text-sm sm:text-base text-gray-600 leading-relaxed">
                          {person.role}
                          {person.organization ? `, ${person.organization}` : ''}
                        </div>
                      </div>
                    </div>
                    {person.location ? (
                      <div className="mt-3">
                        <span className="inline-flex text-sm font-semibold text-[#004fa2] bg-[#004fa2]/10 px-3 py-1 rounded-full">
                          {person.location}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactPeopleHighlightsSection;
