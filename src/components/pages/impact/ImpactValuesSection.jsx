const ImpactValuesSection = ({
  title = 'Our Values',
  subtitle = 'We have five fundamental beliefs that drive our work, shape our culture, and guide our actions.',
  items = []
}) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">{title}</h2>
          {subtitle ? (
            <p className="text-lg text-gray-700 leading-relaxed">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const isFeatured = idx === 0;
            return (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#004fa2]/25 cursor-pointer ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="relative p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-[#004fa2] text-white flex items-center justify-center font-bold transition-transform duration-200 group-hover:scale-105">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">{item.title}</h3>
                        <div className="mt-2 h-1 w-10 rounded-full bg-[#004fa2]/80" />
                      </div>
                    </div>

                    <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-[#004fa2]/25 bg-white text-gray-900 transition-colors duration-300 group-hover:border-[#004fa2]/60 group-hover:text-[#004fa2]">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactValuesSection;
