

import React, { useState, useEffect } from 'react';
import { CheckCircle, Flag, Target, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import contentService from '../../../services/contentService';

const ICON_MAP = { CheckCircle, Flag, Target, Globe };

const Milestones = () => {
	const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
	const leftAnimation = useScrollAnimation({ type: 'slideLeft', delay: 0.05 });
	const rightAnimation = useScrollAnimation({ type: 'slideRight', delay: 0.1 });

	const [milestones, setMilestones] = useState([
		{
			icon: CheckCircle,
			title: 'Expansions to New Regions',
			description: 'Expanding across Ghana represents a pivotal milestone in our mission to democratize digital opportunities for local talent. Through state-of-the-art facilities in Koforidua and beyond, we are cultivating the next generation of tech professionals and driving innovation across the region.'
		},
		{
			icon: CheckCircle,
			title: 'Successful Projects',
			description: 'We deliver transformative, cutting-edge solutions for clients across the globe. Our comprehensive service portfolio showcases deep technical expertise spanning multiple industries and emerging technology domains.'
		},
		{
			icon: CheckCircle,
			title: 'Strategic Partnerships',
			description: 'Strategic alliances with leading global organizations amplify our ability to deliver world-class services while creating valuable career pathways and industry networks for our trainees.'
		},
		{
			icon: CheckCircle,
			title: 'Awards and Recognition',
			description: "Our commitment to excellence has garnered prestigious awards and international recognition, underscoring our transformative impact on Africa's tech ecosystem and our leadership in driving sustainable development across the continent."
		}
	]);

	useEffect(() => {
		const fetchMilestones = async () => {
			try {
				const { data } = await contentService.getMilestones();
				if (data && data.length > 0) {
					setMilestones(data.map(m => ({
						...m,
						icon: ICON_MAP[m.icon] || CheckCircle
					})));
				}
			} catch (error) {
				console.error('Error fetching milestones:', error);
			}
		};
		fetchMilestones();
	}, []);

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
							className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-6"
						>
							Our Milestones
						</motion.h2>

						<ul className="space-y-8">
							{milestones.map((milestone, index) => {
								const Icon = milestone.icon;
								return (
									<li key={index} className="flex gap-4">
										<div className="mt-1">
											<Icon className="text-[#004fa2]" size={22} />
										</div>
										<div>
											<h4 className="font-semibold text-black">{milestone.title}</h4>
											<p className="text-gray-600">{milestone.description}</p>
										</div>
									</li>
								);
							})}
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
								<img src="/images/aboutmilstone.png" alt="ZyraTech Milestone" className="w-full h-96 object-cover object-top" />
							</div>
						</div>
					</motion.div>

				</div>
			</div>
		</section>
	);
};

export default Milestones;

