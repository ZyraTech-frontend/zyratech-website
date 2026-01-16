import React from 'react';
import TrainingNavbar from '../../../../components/TrainingNavbar';
import ContactHero from '../../../../components/pages/contact/ContactHero';
import MapSection from '../../../../components/pages/contact/MapSection';
import PartnershipCTA from '../../../../components/pages/contact/PartnershipCTA';
import FAQ from '../../../../components/pages/contact/FAQ';

const TrainingContactPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TrainingNavbar />
      <div className="flex-grow">
        <ContactHero />
        <MapSection />
        <PartnershipCTA />
        <FAQ />
      </div>
    </div>
  );
};

export default TrainingContactPage;
