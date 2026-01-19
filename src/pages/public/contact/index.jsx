import React from 'react';
import { useLocation } from 'react-router-dom';
import TrainingNavbar from '../../../components/TrainingNavbar';
import Breadcrumb from '../../../components/pages/contact/Breadcrumb';
import ContactHero from '../../../components/pages/contact/ContactHero';
import MapSection from '../../../components/pages/contact/MapSection';
import PartnershipCTA from '../../../components/pages/contact/PartnershipCTA';
import FAQ from '../../../components/pages/contact/FAQ';

const ContactPage = () => {
  const location = useLocation();
  
  // Determine which service navbar to show based on the state or previous path
  const serviceContext = location.state?.from || '';
  
  // Check if coming from training page
  const isFromTraining = serviceContext.includes('training');
  
  return (
    <div>
      {/* Show training navbar if coming from training */}
      {isFromTraining && <TrainingNavbar />}
      
      <Breadcrumb />
      <ContactHero />
      <MapSection />
      <PartnershipCTA />
      <FAQ />
    </div>
  );
};

export default ContactPage;
