import React from 'react';
import PartnershipHero from '../../../components/pages/partnership/PartnershipHero';
import ImpactStats from '../../../components/pages/partnership/ImpactStats';
import PartnershipStories from '../../../components/pages/partnership/PartnershipStories';
import WhyPartner from '../../../components/pages/partnership/WhyPartner';
import PartnershipCTA from '../../../components/pages/partnership/PartnershipCTA';
import PartnershipFAQ from '../../../components/pages/partnership/PartnershipFAQ';
import Partners from '../../../components/pages/home/Partners';

const PartnershipPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <PartnershipHero />
      <ImpactStats />
      <PartnershipStories />
      <WhyPartner />
      <PartnershipCTA />
      <PartnershipFAQ />
      <Partners />
    </div>
  );
};

export default PartnershipPage;
