
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

          <span className="text-lg font-bold text-gray-900 tracking-tight">
            JobTrackr
          </span>

          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
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
      <section className="relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse" />

          <div
            className="absolute top-20 right-1/4 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />

        </div>


        {/* Hero Content */}
        <div className="relative max-w-3xl mx-auto px-6 pt-24 pb-20 text-center">

          <div className="inline-block text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 mb-8">
            Built for job seekers
          </div>


          <h1
            className="text-5xl md:text-6xl text-gray-900 leading-[1.1]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
            }}
          >
            Track every application.
            <br />

            <span className="text-indigo-600">
              Miss nothing.
            </span>
          </h1>


          <p className="text-gray-500 mt-6 text-lg max-w-md mx-auto">
            JobTrackr keeps your applications, interviews, and offers organized
            — with AI that checks how well your resume matches each role.
          </p>


          <div className="flex items-center justify-center gap-3 mt-9">

            <Link
              to="/register"
              className="group bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              Get started free

              <span className="group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>


            <Link
              to="/login"
              className="text-sm font-semibold text-gray-700 hover:text-gray-900 px-6 py-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-white transition-colors"
            >
              Sign in
            </Link>

          </div>

        </div>
      </section>


      {/* Stats */}
      <section className="border-t border-b border-gray-200 bg-white">

        <div className="max-w-3xl mx-auto px-6 py-10 grid grid-cols-3 gap-6 text-center">

          <div>
            <p className="text-3xl font-bold text-gray-900">
              100%
            </p>

            <p className="text-xs text-gray-500 mt-1.5">
              Free to use
            </p>
          </div>


          <div>
            <p className="text-3xl font-bold text-indigo-600">
              AI
            </p>

            <p className="text-xs text-gray-500 mt-1.5">
              Resume matching
            </p>
          </div>


          <div>
            <p className="text-3xl font-bold text-gray-900">
              Secure
            </p>

            <p className="text-xs text-gray-500 mt-1.5">
              JWT authentication
            </p>
          </div>

        </div>

      </section>


      {/* Feature Cards */}
      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

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
              className="group border border-gray-200 rounded-xl p-6 bg-white hover:border-indigo-200 hover:shadow-md transition-all duration-200"
            >

              <span className="text-xs text-indigo-400 font-mono">
                0{i + 1}
              </span>


              <h3 className="text-base font-semibold text-gray-900 mt-3">
                {feature.title}
              </h3>


              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {feature.desc}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* Final CTA */}
      <section className="border-t border-gray-200 bg-white">

        <div className="max-w-3xl mx-auto px-6 py-16 text-center">

          <h2
            className="text-3xl text-gray-900"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
            }}
          >
            Ready to get organized?
          </h2>


          <p className="text-sm text-gray-500 mt-2">
            Takes less than a minute to set up.
          </p>


          <Link
            to="/register"
            className="inline-block mt-6 bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Create your account
          </Link>

        </div>

      </section>


      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">

        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* About */}
          <div>

            <span
              className="text-xl text-gray-900"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
              }}
            >
              JobTrackr
            </span>


            <p className="text-sm text-gray-500 mt-3 max-w-xs leading-relaxed">
              A full-stack project that keeps job applications organized —
              making the job hunt a little less chaotic with AI-powered
              resume matching.
            </p>

          </div>


          {/* Contact */}
          <div className="md:text-right">

            <h4 className="text-sm font-semibold text-gray-900">
              Get in touch
            </h4>


            <p className="text-sm text-gray-500 mt-2">
              Open to opportunities, feedback, and collaboration.
            </p>


            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mitalipandey16052005@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-indigo-600 hover:text-indigo-700 mt-2 inline-block transition-colors"
            >
              mitalipandey16052005@gmail.com
            </a>

          </div>

        </div>


        {/* Footer Bottom */}
        <div className="border-t border-gray-100">

          <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} JobTrackr. Built by Mitali Pandey.
            </p>


            <div className="flex items-center gap-5">

              {/* GitHub */}
              <a
                href="https://github.com/Mitali-Pandey"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>


              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/mitali-pandey-288166256/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.208 0 22.225 0z" />
                </svg>
              </a>


              {/* Email */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=mitalipandey16052005@gmail.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Email"
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                </svg>
              </a>

            </div>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Landing;

