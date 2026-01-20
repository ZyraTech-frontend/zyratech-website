import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShieldCheck, ClipboardCheck, BookOpen, Users } from 'lucide-react';

const qaServices = [
  { title: 'End-to-end testing', desc: 'Functional, integration and acceptance testing to validate user journeys.', icon: ClipboardCheck },
  { title: 'Test automation', desc: 'Design and build maintainable automation suites integrated into CI.', icon: BookOpen },
  { title: 'Performance testing', desc: 'Load and stress testing to ensure reliability at scale.', icon: ShieldCheck },
  { title: 'Security testing', desc: 'Vulnerability scanning and basic security reviews to reduce risk.', icon: ShieldCheck },
  { title: 'Manual & Exploratory QA', desc: 'Human-led testing for edge cases, usability and accessibility checks.', icon: Users },
  { title: 'QA consultancy & ops', desc: 'Roadmaps, tooling and hands-on support to embed QA practices.', icon: CheckCircle },
];

const QualityAssurance = () => {
  return (
    <div className="bg-white">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-[#004fa2] to-[#003d7a] text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">Quality Assurance</h1>
              <p className="text-lg max-w-2xl mb-6">Release with confidence. ZyraTech helps you build robust, secure and high-performing products through modern QA practices and automation.</p>
              <div className="flex gap-4 mb-8">
                <Link to="/contact" className="bg-white text-[#004fa2] px-6 py-3 rounded-lg font-semibold shadow">Start a QA review</Link>
                <Link to="/training/programs" className="border border-white text-white px-6 py-3 rounded-lg font-semibold">QA Training</Link>
              </div>
              <div className="flex gap-6 items-center mt-8">
                <span className="text-sm text-white/80">Trusted by</span>
                <div className="flex gap-3">
                  <div className="w-16 h-8 bg-white/10 rounded flex items-center justify-center text-xs">Logo</div>
                  <div className="w-16 h-8 bg-white/10 rounded flex items-center justify-center text-xs">Logo</div>
                  <div className="w-16 h-8 bg-white/10 rounded flex items-center justify-center text-xs">Logo</div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <img src="/images/quality-assurance-hero.jpg" alt="Quality Assurance" className="w-full max-w-md rounded-lg shadow-lg object-cover h-80" onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1200'}} />
            </div>
          </div>
        </section>

        {/* How Do We Work? */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Do We Work?</h2>
            <p className="text-gray-600 mb-10 max-w-3xl">We continuously work towards delivering high-quality digital products and services to our global and local client base. Our development environment allows us to efficiently and effectively achieve these goals: we work in teams following agile principles while combining them with carefully selected tools and the V-model to ensure quality.</p>
          </div>
        </section>

        {/* Our Quality Standards */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Quality Standards</h2>
            <p className="text-gray-600 mb-10 max-w-3xl">We follow the highest international operating and security standards. Our industry certificates validate our commitment to excellence in service delivery, information security, and technological expertise, propelling us to drive global digital transformation with continuous learning and advancement.</p>
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-4">This certification affirms that we adhere to the stringent requirements outlined by the German Association of the Automotive Industry (VDA) and is a trusted partner within the automotive supply chain. By achieving TISAX certification, we demonstrate our dedication to safeguarding customer data and protecting sensitive information.</p>
                <p className="text-sm text-green-600 font-semibold">Result: Achieved compliance status with no non-conformities and highest possible score, in accordance with ENX ISA Catalogue.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-4">The ISO 27001:2013 certification ensures our capability in risk management, security control implementation, and safeguarding the confidentiality, integrity, and availability of information, providing clients and partners with peace of mind regarding data protection.</p>
                <p className="text-sm text-green-600 font-semibold">Result: Achieved compliance status with no non-conformities in December 2021.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-4">This globally acknowledged standard guarantees that we consistently meets customer demands. Through effective quality control and continuous improvement, we aim to surpass customer expectations and deliver outstanding value.</p>
                <p className="text-sm text-green-600 font-semibold">Result: Achieved compliance status on the quality of process and procedures regarding how operations are carried out in the most efficient way</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tools We Work With */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tools We Work With</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Slack</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">MS Teams</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Confluence</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Jira</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Clockify</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Codecademy</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Masterclass</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">CodeSignal</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Pluralsight</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">GitHub</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">SonarLint</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Postman</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">JetBrains</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Balsamiq</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Figma</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Google Play</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Adobe</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Sentry</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Jenkins</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Azure</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">SonarQube</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">GCP</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Grafana</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">AWS</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">TestNG</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Selenium</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Xray</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">JUnit</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs">Cypress</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Quality Assurance */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Quality Assurance</h2>
            <p className="text-gray-600 mb-10 max-w-3xl">Internalized clean coding standards, peer reviews, and automated testing are key to our quality assurance.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Clean Coding Standards</h3>
                <p className="text-gray-600">We have adopted and internalized clean coding standards. Common principles are core to our quality standards. We expect most of our clients to have their own norms and standards and ensure to adopt them as part of project onboarding.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Peer Reviews</h3>
                <p className="text-gray-600">We use pair programming to improve quality, reduce error rate, and enable peer learning. Our development process standard integrates code reviews before the code is committed. We use code walkthroughs as an additional quality mechanism and to ensure broad knowledge of the code base across the team.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Testing</h3>
                <p className="text-gray-600">TDD and BDD are core principles of our development process. Our developers are trained to write unit tests for everything they do. Our dedicated QA specialists automate much of the testing process with a modern toolset. To ensure full coverage, we conduct extensive manual testing in addition to automated processes.</p>
              </div>
            </div>
            <div className="mt-12 flex justify-center space-x-8">
              <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300" alt="Software Developer" className="rounded-lg shadow-lg" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" alt="Marketing Team Lead" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* Our Professional Development */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Professional Development</h2>
            <p className="text-gray-600 mb-10 max-w-3xl">We offer continuous professional development opportunities for our teams.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-green-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold">In-house Seminars and Workshops</h3>
                </div>
                <p className="text-gray-600">Workshops focus on soft skills such as communication, teamwork, cooperation, productivity tools, protection, and working with people with disabilities, etc.</p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-green-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold">Skill-Based And Technical Training</h3>
                </div>
                <p className="text-gray-600">Programmes mainly focused on honing professional skills that will aid employees in carrying out their daily work duties – Programming, DevOps, Mentoring, etc.</p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-green-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold">Industry Certifications</h3>
                </div>
                <p className="text-gray-600">Employees are provided with personalized learning experiences. Certification programmes on niche topics relevant to an employee's role or client project requirements.</p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <CheckCircle className="text-green-600 mr-3" size={24} />
                  <h3 className="text-lg font-semibold">Learning Community</h3>
                </div>
                <p className="text-gray-600">Employees can connect within the company, but also create networks outside the company. Internal platforms and events allow employees to receive and share best practices, knowledge, and experiences.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently asked questions */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How can you ensure, that your employees are qualified to handle projects?</h3>
                <p className="text-gray-600">It is a minimum requirement for our employees to have a bachelor's degree in selected IT/tech-related fields. Prior to joining us, our Software Developers, Software Testers, and Data Scientists successfully completed IT/digital training at AmaliTech's Training Academy, including an 8-week capstone project to showcase their technical capabilities.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How do you handle project management?</h3>
                <p className="text-gray-600">This is the first time I am considering working with you. Is AmaliTech prepared to share the risk?</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What happens if I am not happy with the services?</h3>
                <p className="text-gray-600">How can I ensure that my intellectual property is in safe hands?</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Are your business processes secure?</h3>
                <p className="text-gray-600">Where is AmaliTech Services located?</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">This is the first time I am working together with partners located in Africa. How can I make sure that we will not encounter misunderstandings due to cultural differences?</h3>
                <p className="text-gray-600">I would like to understand how project is contributing to the African community</p>
              </div>
            </div>
          </div>
        </section>

        {/* Let's Have A Conversation */}
        <section className="py-16 bg-[#004fa2] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Let's Have A Conversation</h2>
            <p className="mb-8 max-w-2xl mx-auto">Ready to discuss your QA needs? Schedule a discovery session with our experts.</p>
            <div className="flex justify-center">
              <div className="text-center">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="QA Lead" className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                <p className="text-white/80 mb-4">QA Director</p>
                <Link to="/contact" className="inline-block bg-white text-[#004fa2] px-6 py-3 rounded-lg font-semibold">Schedule Meeting</Link>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default QualityAssurance;
