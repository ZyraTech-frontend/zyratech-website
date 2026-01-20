import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Code, Globe, CheckCircle } from 'lucide-react';

const CollaborationModels = () => {
  const models = [
    {
      title: 'Project Partnerships',
      description: 'Joint projects with corporates and NGOs to deliver tech solutions and scale impact.',
      icon: Briefcase,
    },
    {
      title: 'Custom Product Development',
      description: 'End-to-end product development tailored to partner needs — from research to deployment.',
      icon: Code,
    },
    {
      title: 'Capacity Building & Training',
      description: 'Bespoke training programmes and upskilling to grow local talent and teams.',
      icon: Users,
    },
  ];

  const markets = [
    'European Market',
    'US Market',
    'African Market'
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#004fa2] to-[#003d7a] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">Collaboration Models</h1>
            <p className="text-lg max-w-xl opacity-95">We partner with organisations to co-create technology, build capacity, and deliver measurable impact across markets.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-block bg-white text-[#004fa2] px-6 py-3 rounded-lg font-semibold shadow">Work With Us</Link>
              <Link to="/projects" className="inline-block border border-white text-white px-6 py-3 rounded-lg font-semibold">See Our Projects</Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img src="/images/collaboration-hero.jpg" alt="Collaboration" className="w-full rounded-lg shadow-lg object-cover h-56 lg:h-72" onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1508873699372-7ae17b2f6f92?w=1200'}} />
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How we collaborate</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">Whether you need a partner to build a product, run a training program, or co-deliver an innovation project — we adapt our model to fit your goals.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {models.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.title} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 bg-[#e6f0fb] rounded-md flex items-center justify-center mb-4 text-[#004fa2]"><Icon size={20} /></div>
                  <h3 className="text-xl font-semibold mb-2">{m.title}</h3>
                  <p className="text-gray-600 mb-4">{m.description}</p>
                  <Link to="/contact" className="text-[#004fa2] font-semibold inline-flex items-center gap-2">Start a conversation <CheckCircle size={16} /></Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Proposition + Markets */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-2/3">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our value proposition</h3>
            <p className="text-gray-600 mb-4">We combine local delivery capacity, international market access, and rigorous quality assurance to deliver results you can trust.</p>
            <ul className="list-none space-y-3">
              <li className="flex items-start gap-3"><span className="text-[#004fa2] mt-1">•</span><span>Local project delivery teams with technical and domain expertise.</span></li>
              <li className="flex items-start gap-3"><span className="text-[#004fa2] mt-1">•</span><span>International partnership networks for market entry and scaling.</span></li>
              <li className="flex items-start gap-3"><span className="text-[#004fa2] mt-1">•</span><span>Quality assurance and impact measurement baked into every engagement.</span></li>
            </ul>
          </div>

          <aside className="lg:w-1/3 bg-white border border-gray-100 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-3">Target markets</h4>
            <ul className="space-y-3">
              {markets.map((m) => (
                <li key={m} className="flex items-center gap-3 text-gray-700"><span className="text-[#004fa2]">—</span>{m}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Link to="/partner/apply" className="block text-center bg-[#004fa2] text-white px-4 py-3 rounded-lg">Apply as a partner</Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Process / Steps */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold mb-6">Our collaboration process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg border p-6 text-center">
              <div className="text-3xl font-bold text-[#004fa2] mb-2">1</div>
              <h4 className="font-semibold mb-2">Discover</h4>
              <p className="text-gray-600">Understand needs, constraints and impact goals.</p>
            </div>
            <div className="bg-white rounded-lg border p-6 text-center">
              <div className="text-3xl font-bold text-[#004fa2] mb-2">2</div>
              <h4 className="font-semibold mb-2">Design</h4>
              <p className="text-gray-600">Co-design the solution and delivery plan.</p>
            </div>
            <div className="bg-white rounded-lg border p-6 text-center">
              <div className="text-3xl font-bold text-[#004fa2] mb-2">3</div>
              <h4 className="font-semibold mb-2">Deliver</h4>
              <p className="text-gray-600">Build, test and deploy the solution.</p>
            </div>
            <div className="bg-white rounded-lg border p-6 text-center">
              <div className="text-3xl font-bold text-[#004fa2] mb-2">4</div>
              <h4 className="font-semibold mb-2">Scale</h4>
              <p className="text-gray-600">Scale with partners and measure impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#004fa2] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to collaborate?</h3>
          <p className="mb-6">Contact us to explore a partnership or request a proposal.</p>
          <Link to="/contact" className="inline-block bg-white text-[#004fa2] px-6 py-3 rounded-lg font-semibold">Contact Us</Link>
        </div>
      </section>
    </div>
  );
};

export default CollaborationModels;
