import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Settings, Zap, Users, Award, Globe } from 'lucide-react';

const services = [
  { title: 'Product Engineering', desc: 'Custom software and hardware solutions for scale and impact.', icon: Monitor },
  { title: 'Quality Assurance', desc: 'Testing, verification and compliance to ensure robust deliveries.', icon: Award },
  { title: 'Managed Services', desc: 'Hosted solutions and ongoing maintenance for mission-critical systems.', icon: Settings },
  { title: 'Capacity Building', desc: 'Training programs, bootcamps and tailored upskilling for teams.', icon: Users },
  { title: 'Innovation Labs', desc: 'Rapid prototyping and incubations to de-risk new ideas.', icon: Zap },
  { title: 'Market Access', desc: 'Support getting products to European, US and African markets.', icon: Globe },
];

const OurServices = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#004fa2] to-[#003d7a] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">Our Services</h1>
            <p className="text-lg max-w-xl opacity-95">We design, build and scale technology solutions with partners — combining engineering rigor with practical delivery models.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-block bg-white text-[#004fa2] px-6 py-3 rounded-lg font-semibold shadow">Get Started</Link>
              <Link to="/collaboration-models" className="inline-block border border-white text-white px-6 py-3 rounded-lg font-semibold">Collaboration Models</Link>
            </div>
          </div>
          <div>
            <img src="/images/our-services-hero.jpg" alt="Our Services" className="w-full rounded-lg shadow-lg object-cover h-64 lg:h-80" onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200'}} />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What we do</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">From product engineering to market entry, our service stack is built to help organisations deliver value quickly and sustainably.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 bg-[#e6f0fb] rounded-md flex items-center justify-center mb-4 text-[#004fa2]"><Icon size={20} /></div>
                  <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-gray-600 mb-4">{s.desc}</p>
                  <Link to="/contact" className="text-[#004fa2] font-semibold">Talk to us</Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* + Why choose us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Why partners choose us</h3>
            <p className="text-gray-600 mb-6">We combine deep technical expertise with local delivery and international market experience to reduce risk and accelerate impact.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white border rounded-lg">
                <h4 className="font-semibold mb-2">Reliable delivery</h4>
                <p className="text-gray-600 text-sm">Robust processes and QA ensure predictable outcomes.</p>
              </div>
              <div className="p-4 bg-white border rounded-lg">
                <h4 className="font-semibold mb-2">Local teams</h4>
                <p className="text-gray-600 text-sm">On-the-ground teams who understand context and execution.</p>
              </div>
              <div className="p-4 bg-white border rounded-lg">
                <h4 className="font-semibold mb-2">Market experience</h4>
                <p className="text-gray-600 text-sm">Support for market entry and scaling across regions.</p>
              </div>
              <div className="p-4 bg-white border rounded-lg">
                <h4 className="font-semibold mb-2">Impact focus</h4>
                <p className="text-gray-600 text-sm">We measure outcomes and align work to impact goals.</p>
              </div>
            </div>
          </div>

          <aside className="bg-white border rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-3">Our value proposition</h4>
            <ul className="space-y-3 text-gray-700">
              <li><span className="text-[#004fa2] mr-2">•</span>Local delivery + international reach</li>
              <li><span className="text-[#004fa2] mr-2">•</span>Proven engineering practices</li>
              <li><span className="text-[#004fa2] mr-2">•</span>Flexible collaboration models</li>
            </ul>
            <div className="mt-6">
              <Link to="/partner/apply" className="block text-center bg-[#004fa2] text-white px-4 py-3 rounded-lg">Apply as a partner</Link>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#004fa2] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to work with us?</h3>
          <p className="mb-6">Reach out to explore a project, partnership or training collaboration.</p>
          <Link to="/contact" className="inline-block bg-white text-[#004fa2] px-6 py-3 rounded-lg font-semibold">Contact Us</Link>
        </div>
      </section>
    </div>
  );
};

export default OurServices;
