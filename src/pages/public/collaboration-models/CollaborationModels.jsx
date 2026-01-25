import React from 'react';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import CollaborationHeroSection from '../../../components/pages/collaboration-models/CollaborationHeroSection';
import CollaborationModelsNavSection from '../../../components/pages/collaboration-models/CollaborationModelsNavSection';
import CollaborationModelSection from '../../../components/pages/collaboration-models/CollaborationModelSection';
import CollaborationTestimonialSection from '../../../components/pages/collaboration-models/CollaborationTestimonialSection';
import CollaborationProcessSection from '../../../components/pages/collaboration-models/CollaborationProcessSection';
import BackToTopButton from '../../../components/common/BackToTopButton';
import ParallaxDivider from '../../../components/common/ParallaxDivider.jsx';
import {
  collaborationHero,
  collaborationModels,
  collaborationProcessSteps,
  collaborationTestimonial,
} from '../../../data/collaborationModelsData';

const CollaborationModels = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <CollaborationHeroSection hero={collaborationHero} />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      {/* Models */}
      <CollaborationModelsNavSection models={collaborationModels} />
      {collaborationModels.map((model, idx) => (
        <CollaborationModelSection key={model.id} model={model} reverse={idx % 2 !== 0} />
      ))}

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      {/* Value Proposition + Markets */}
      <CollaborationTestimonialSection testimonial={collaborationTestimonial} />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      {/* Process / Steps */}
      <CollaborationProcessSection steps={collaborationProcessSteps} />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      {/* CTA */}
      <NewsletterHero />

      <BackToTopButton />
    </div>
  );
};

export default CollaborationModels;
