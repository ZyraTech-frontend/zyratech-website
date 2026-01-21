import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Calendar, MapPin } from 'lucide-react';

const openings = [
  { role: 'Full Stack Engineer', location: 'Accra, Ghana', type: 'Full-time' },
  { role: 'QA Engineer', location: 'Remote', type: 'Contract' },
  { role: 'Program Manager', location: 'Lagos, Nigeria', type: 'Full-time' },
];

const WorkWithUs = () => {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-[#004fa2] to-[#003d7a] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">Work With Us</h1>
            <p className="text-lg max-w-xl opacity-95">Join a team building impactful technology solutions across African, European and US markets.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/training" className="inline-block bg-white text-[#004fa2] px-6 py-3 rounded-lg font-semibold shadow">View Training</Link>
              <Link to="/contact" className="inline-block border border-white text-white px-6 py-3 rounded-lg font-semibold">Contact Us</Link>
            </div>
          </div>
          <div>
            <img src="/images/work-with-us-hero.jpg" alt="Work with us" className="w-full rounded-lg shadow-lg object-cover h-64 lg:h-80" onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200'}} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Opportunities</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">We hire engineers, product builders, trainers and program leads. Below are some open roles — if you don't see a fit, still send us a note.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {openings.map((o) => (
              <div key={o.role} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{o.role}</h3>
                  <span className="text-sm text-gray-500">{o.type}</span>
                </div>
                <p className="text-gray-600 mb-4">Location: {o.location}</p>
                <Link to="/partner/apply" className="text-[#004fa2] font-semibold">Apply now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">How we hire</h3>
            <p className="text-gray-600 mb-6">A concise, respectful process that focuses on skills and potential.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white border rounded-lg text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center text-[#004fa2] mb-2"><Briefcase /></div>
                <h4 className="font-semibold">Apply</h4>
                <p className="text-gray-600 text-sm">Submit CV and a short note about your fit.</p>
              </div>
              <div className="p-4 bg-white border rounded-lg text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center text-[#004fa2] mb-2"><Users /></div>
                <h4 className="font-semibold">Interview</h4>
                <p className="text-gray-600 text-sm">Short technical and cultural conversations.</p>
              </div>
              <div className="p-4 bg-white border rounded-lg text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center text-[#004fa2] mb-2"><Calendar /></div>
                <h4 className="font-semibold">Onboard</h4>
                <p className="text-gray-600 text-sm">Fast, clear onboarding and initial goals.</p>
              </div>
            </div>
          </div>

          <aside className="bg-white border rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-3">Locations</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center"><MapPin className="mr-2" /> Accra, Ghana</li>
              <li className="flex items-center"><MapPin className="mr-2" /> Lagos, Nigeria</li>
              <li className="flex items-center"><MapPin className="mr-2" /> Remote roles</li>
            </ul>
            <div className="mt-6">
              <Link to="/contact" className="block text-center cta-btn px-4 py-3">Talk to recruiting</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#004fa2] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Want to join ZyraTech?</h3>
          <p className="mb-6">Send your CV and a one-paragraph note about where you'd like to contribute.</p>
          <Link to="/partner/apply" className="inline-block bg-white text-[#004fa2] px-6 py-3 rounded-lg font-semibold">Apply Now</Link>
        </div>
      </section>
    </div>
  );
};

export default WorkWithUs;
