

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const Milestones = () => {
	const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
	const leftAnimation = useScrollAnimation({ type: 'slideLeft', delay: 0.05 });
	const rightAnimation = useScrollAnimation({ type: 'slideRight', delay: 0.1 });

	return (
		<section className="py-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

					{/* Left - text list */}
					<motion.div
						ref={leftAnimation.ref}
						initial={leftAnimation.initial}
						animate={leftAnimation.animate}
						variants={leftAnimation.variants}
						transition={leftAnimation.transition}
						className="lg:col-span-7"
					>
						<motion.h2
							ref={titleAnimation.ref}
							initial={titleAnimation.initial}
							animate={titleAnimation.animate}
							variants={titleAnimation.variants}
							transition={titleAnimation.transition}
							className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6"
						>
							Our Milestones
						</motion.h2>

						<ul className="space-y-8">
							<li className="flex gap-4">
								<div className="mt-1">
								<CheckCircle className="text-[#004fa2]" size={22} />
								</div>
								<div>
									<h4 className="font-semibold text-black">Expansions to New Regions</h4>
									<p className="text-gray-600">Our new locations in Ghana mark a significant chapter in our mission to bring digital opportunities to local talent. By establishing state-of-the-art offices, we continue to empower tech talent in Koforidua.</p>
								</div>
							</li>

							<li className="flex gap-4">
								<div className="mt-1">
								<CheckCircle className="text-[#004fa2]" size={22} />
								</div>
								<div>
									<h4 className="font-semibold text-black">Successful Projects</h4>
									<p className="text-gray-600">We have delivered cutting-edge solutions for clients worldwide. Our service portfolio showcases expertise across multiple industries.</p>
								</div>
							</li>

							<li className="flex gap-4">
								<div className="mt-1">
								<CheckCircle className="text-[#004fa2]" size={22} />
								</div>
								<div>
									<h4 className="font-semibold text-black">Strategic Partnerships</h4>
									<p className="text-gray-600">Strong partnerships with global organisations enhance our capacity to deliver top-tier services and provide trainees with career opportunities.</p>
								</div>
							</li>

							<li className="flex gap-4">
								<div className="mt-1">
								<CheckCircle className="text-[#004fa2]" size={22} />
								</div>
								<div>
									<h4 className="font-semibold text-black">Awards and Recognition</h4>
									<p className="text-gray-600">Our dedication to excellence has earned us awards, highlighting our impact on the tech ecosystem and role in fostering sustainable development.</p>
								</div>
							</li>
						</ul>
					</motion.div>

					{/* Right - image with brown offset */}
					<motion.div
						ref={rightAnimation.ref}
						initial={rightAnimation.initial}
						animate={rightAnimation.animate}
						variants={rightAnimation.variants}
						transition={rightAnimation.transition}
						className="lg:col-span-5 flex justify-center lg:justify-end"
					>
						<div className="relative w-full max-w-md">
							<div className="absolute -right-6 top-8 w-6 bg-[#004fa2] h-48 hidden md:block" />
							<div className="rounded-lg overflow-hidden shadow-lg border border-gray-100">
								<img src="/images/milestones.jpg" alt="Milestone" className="w-full h-96 object-cover" onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200'}} />
							</div>
						</div>
					</motion.div>

				</div>
			</div>
		</section>
	);
};

export default Milestones;

