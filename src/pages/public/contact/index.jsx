import React from 'react';
import { useLocation } from 'react-router-dom';
import TrainingNavbar from '../../../components/TrainingNavbar';
import ContactHero from '../../../components/pages/contact/ContactHero';
import MapSection from '../../../components/pages/contact/MapSection';
import FAQ from '../../../components/pages/contact/FAQ';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import useSEO from '../../../hooks/useSEO';

const ContactPage = () => {
  const location = useLocation();

  useSEO({
    title: 'Contact Us',
    description: 'Get in touch with Zyra Tech Hub in Koforidua, Ghana. Contact us for training programs, partnerships, IT services, or any inquiries.',
    url: '/contact',
    keywords: 'contact Zyra Tech, Ghana tech hub contact, Koforidua IT services, training inquiries Ghana'
  });
  
  // Determine which service navbar to show based on the state or previous path
  const serviceContext = location.state?.from || '';
  
  // Check if coming from training page
  const isFromTraining = serviceContext.includes('training');
  
  return (
    <div>
      {/* Show training navbar if coming from training */}
      {isFromTraining && <TrainingNavbar />}
      
      <ContactHero />
      <MapSection />
      <FAQ />
      <NewsletterHero />
    </div>
  );
};

export default ContactPage;
