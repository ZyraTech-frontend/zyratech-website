import { useEffect } from 'react';

const BASE_TITLE = 'Zyra Tech Hub';

/**
 * Custom hook to set page title and meta description for SEO.
 * @param {Object} options - SEO options
 * @param {string} options.title - Page title (will be appended with base title)
 * @param {string} [options.description] - Meta description for the page
 */
const useSEO = ({ title, description }) => {
  useEffect(() => {
    // Set document title
    const fullTitle = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
    document.title = fullTitle;

    // Set meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }

    // Cleanup: restore defaults when component unmounts
    return () => {
      document.title = `${BASE_TITLE} - Empowering Ghana's Future Through Technology`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = 'Zyra Tech Hub in Koforidua, Ghana empowers students, schools, and businesses through hands-on digital training, internships, and professional IT services.';
      }
    };
  }, [title, description]);
};

export default useSEO;
