import { Mail } from 'lucide-react';
import { useSelector } from 'react-redux';

const HrContactSection = ({
  name,
  title,
  imageUrl = '/images/Dalene.png',
  email
}) => {
  // Get settings from Redux store
  const settings = useSelector((state) => state.settings.values);

  // Use props if provided, otherwise fall back to settings, then defaults
  const hrName = name || settings.hrName || 'Magdalene';
  const hrTitle = title || settings.hrTitle || 'Human Resources Team Lead';
  const hrEmail = email || settings.hrEmail || 'magdalene@zyratech.com';

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full md:w-2/5 lg:w-2/5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
              Do you have any questions?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Please feel free to contact {hrName}, our {hrTitle} in Ghana. We're here to help you with any questions about our training programs and enrollment process.
            </p>

            <a
              href={`mailto:${hrEmail}`}
              className="inline-flex items-center gap-3 bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <Mail size={20} />
              Contact Us
            </a>
          </div>

          <div className="relative w-full md:w-auto flex justify-center md:justify-start md:ml-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={imageUrl}
                alt={hrName}
                loading="lazy"
                className="w-full max-w-md md:max-w-none md:w-[580px] h-auto aspect-[3/4] md:aspect-auto md:h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HrContactSection;
