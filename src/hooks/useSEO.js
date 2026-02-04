import { useEffect } from 'react';

const BASE_TITLE = 'Zyra Tech Hub';
const BASE_URL = 'https://zyratech-hub.netlify.app';
const DEFAULT_IMAGE = '/zyratecpng.png';

/**
 * Custom hook to set page title and meta tags for SEO.
 * @param {Object} options - SEO options
 * @param {string} options.title - Page title (will be appended with base title)
 * @param {string} [options.description] - Meta description for the page
 * @param {string} [options.image] - Open Graph image URL
 * @param {string} [options.url] - Canonical URL (relative path)
 * @param {string} [options.type] - Open Graph type (default: 'website')
 * @param {string} [options.keywords] - SEO keywords
 */
const useSEO = ({ 
  title, 
  description, 
  image = DEFAULT_IMAGE,
  url = '',
  type = 'website',
  keywords = 'tech training Ghana, IT courses Ghana, digital skills training, internships Ghana, Koforidua tech hub'
}) => {
  useEffect(() => {
    // Set document title
    const fullTitle = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
    document.title = fullTitle;

    const canonicalUrl = `${BASE_URL}${url}`;
    const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

    // Helper function to set meta tag
    const setMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attrName, attrValue] = selector.match(/\[(.+?)="(.+?)"\]/)?.slice(1, 3) || [];
        if (attrName && attrValue) {
          element.setAttribute(attrName, attrValue);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // Set meta description
    if (description) {
      setMetaTag('meta[name="description"]', 'content', description);
    }

    // Set keywords
    setMetaTag('meta[name="keywords"]', 'content', keywords);

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Open Graph tags
    setMetaTag('meta[property="og:title"]', 'content', fullTitle);
    setMetaTag('meta[property="og:description"]', 'content', description || 'Digital training, internships, and IT services for students, schools, and organizations in Ghana.');
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    setMetaTag('meta[property="og:type"]', 'content', type);
    setMetaTag('meta[property="og:image"]', 'content', imageUrl);
    setMetaTag('meta[property="og:site_name"]', 'content', BASE_TITLE);

    // Twitter Card tags
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'content', description || 'Digital training, internships, and IT services for students, schools, and organizations in Ghana.');
    setMetaTag('meta[name="twitter:image"]', 'content', imageUrl);

    // Cleanup function
    return () => {
      document.title = `${BASE_TITLE} - Empowering Ghana's Future Through Technology`;
    };
  }, [title, description, image, url, type, keywords]);
};

export default useSEO;
