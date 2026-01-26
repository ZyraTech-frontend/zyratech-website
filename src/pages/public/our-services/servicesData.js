import { Award, Globe, Monitor, Settings, ShieldCheck, Users, Zap } from 'lucide-react';

export const services = [
  {
    title: 'Product Engineering',
    desc: 'Build and scale reliable digital products — from discovery and architecture to delivery and iteration.',
    icon: Monitor,
    highlights: ['Web & mobile applications', 'Backend systems & APIs', 'Cloud architecture & DevOps'],
  },
  {
    title: 'Web and App Development',
    desc: 'High-quality interfaces and performant apps that ship fast and remain maintainable over time.',
    icon: Zap,
    highlights: ['UI/UX implementation', 'Modern frameworks & tooling', 'Performance & accessibility'],
  },
  {
    title: 'Quality Assurance',
    desc: 'Confident releases through modern testing, automation, and quality engineering practices.',
    icon: Award,
    highlights: ['Test strategy & planning', 'Automation & CI integration', 'Performance & regression testing'],
  },
  {
    title: 'Security',
    desc: 'Reduce risk with practical security reviews, baseline controls, and secure delivery practices.',
    icon: ShieldCheck,
    highlights: ['Security testing & hardening', 'Secure architecture guidance', 'Data protection best practices'],
  },
  {
    title: 'Managed Services',
    desc: 'Operate and improve critical systems with monitoring, maintenance, and responsive support.',
    icon: Settings,
    highlights: ['Monitoring & observability', 'Incident response & SLAs', 'Continuous improvements'],
  },
  {
    title: 'Capacity Building',
    desc: 'Upskill teams with hands-on programs that drive adoption of modern engineering practices.',
    icon: Users,
    highlights: ['Team training & workshops', 'Mentorship & coaching', 'Process & delivery enablement'],
  },
  {
    title: 'Innovation Labs',
    desc: 'Prototype quickly, validate ideas, and de-risk investments with rapid experimentation.',
    icon: Zap,
    highlights: ['MVP design & prototyping', 'User validation & iteration', 'Roadmaps & execution plans'],
  },
  {
    title: 'Market Access',
    desc: 'Navigate expansion with support for regional compliance, rollout planning, and scaling.',
    icon: Globe,
    highlights: ['Go-to-market support', 'Localization & rollout planning', 'Operational readiness'],
  },
];
