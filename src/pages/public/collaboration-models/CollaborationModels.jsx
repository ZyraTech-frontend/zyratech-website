import React from 'react';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import CollaborationHeroSection from '../../../components/pages/collaboration-models/CollaborationHeroSection';
import CollaborationModelsNavSection from '../../../components/pages/collaboration-models/CollaborationModelsNavSection';
import CollaborationModelSection from '../../../components/pages/collaboration-models/CollaborationModelSection';
import CollaborationTestimonialSection from '../../../components/pages/collaboration-models/CollaborationTestimonialSection';
import CollaborationProcessSection from '../../../components/pages/collaboration-models/CollaborationProcessSection';
import BackToTopButton from '../../../components/common/BackToTopButton';
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

      {/* Models */}
      <CollaborationModelsNavSection models={collaborationModels} />
      {collaborationModels.map((model, idx) => (
        <CollaborationModelSection key={model.id} model={model} reverse={idx % 2 !== 0} />
      ))}

      {/* Value Proposition + Markets */}
      <CollaborationTestimonialSection testimonial={collaborationTestimonial} />

      {/* Process / Steps */}
      <CollaborationProcessSection steps={collaborationProcessSteps} />

      {/* CTA */}
      <NewsletterHero />

      <BackToTopButton />
    </div>
  );
};

export default CollaborationModels;
