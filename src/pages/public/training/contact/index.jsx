import React from 'react';
import TrainingLayout from '../../../../components/TrainingLayout';
import ContactHero from '../../../../components/pages/contact/ContactHero';
import MapSection from '../../../../components/pages/contact/MapSection';
import PartnershipCTA from '../../../../components/pages/contact/PartnershipCTA';
import FAQ from '../../../../components/pages/contact/FAQ';
import useSEO from '../../../../hooks/useSEO';

const TrainingContactPage = () => {
  useSEO({
    title: 'Contact Training Team',
    description: 'Get in touch with Zyra Tech Hub training team. Ask questions about courses, schedules, or enrollment processes.'
  });

  return (
    <TrainingLayout>
      <ContactHero />
      <MapSection />
      <PartnershipCTA />
      <FAQ />
    </TrainingLayout>
  );
};

export default TrainingContactPage;
