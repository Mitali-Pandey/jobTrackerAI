import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900 tracking-tight">JobTrackr</span>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
              Sign in
            </Link>
            <Link
              to="/register"
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-block text-xs font-medium text-gray-500 border border-gray-200 rounded-full px-3 py-1 mb-6">
          Built for job seekers
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
          Track every application.
          <br />
          Miss nothing.
        </h1>
        <p className="text-gray-500 mt-5 text-base max-w-md mx-auto">
          JobTrackr keeps your applications, interviews, and offers organized —
          with AI that checks how well your resume matches each role.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Link
            to="/register"
            className="group bg-gray-900 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            Get started free
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 px-5 py-2.5 border border-gray-200 rounded hover:border-gray-300 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-t border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-8 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl font-semibold text-gray-900">100%</p>
            <p className="text-xs text-gray-500 mt-1">Free to use</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">AI</p>
            <p className="text-xs text-gray-500 mt-1">Resume matching</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">Secure</p>
            <p className="text-xs text-gray-500 mt-1">JWT authentication</p>
          </div>
        </div>
      </section>

      {/* Feature rows */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="space-y-1">
          {[
            {
              title: "One place for every application",
              desc: "Company, role, status, and notes — organized so you always know where things stand.",
            },
            {
              title: "AI resume matching",
              desc: "Upload your resume against any job description and get a match score with specific feedback.",
            },
            {
              title: "A dashboard that makes sense",
              desc: "See applications, interviews, and offers at a glance instead of digging through spreadsheets.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group flex items-start gap-6 py-6 border-b border-gray-100 last:border-0 hover:bg-white transition-colors px-4 -mx-4 rounded"
            >
              <span className="text-xs text-gray-300 font-mono pt-1 w-6">
                0{i + 1}
              </span>
              <div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 max-w-md">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Ready to get organized?</h2>
          <p className="text-sm text-gray-500 mt-2">Takes less than a minute to set up.</p>
          <Link
            to="/register"
            className="inline-block mt-6 bg-gray-900 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Create your account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;