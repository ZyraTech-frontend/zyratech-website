import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTopButton = ({
  threshold = 400,
  ariaLabel = 'Back to top',
  className =
    'fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#004fa2] text-white shadow-lg flex items-center justify-center hover:bg-[#003d7a] transition',
  icon,
  scrollOptions = { top: 0, behavior: 'smooth' },
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo(scrollOptions)}
      className={className}
      aria-label={ariaLabel}
    >
      {icon || <ChevronUp />}
    </button>
  );
};

export default BackToTopButton;
