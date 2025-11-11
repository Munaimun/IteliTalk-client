import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";

const Intro = () => {
  return (
    <Fragment>
      <div className="w-full bg-[#0a0a0f] text-[#f1f0ff] min-h-screen overflow-hidden px-2 sm:px-4 md:px-6 py-4">
        <div className="w-full max-w-5xl mx-auto flex flex-col justify-start lg:justify-center items-center space-y-6 md:space-y-8 text-center">
          {/* Logo + Title */}
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shadow-lg shadow-black/40">
              <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                I
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-snug px-1">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent">
                InteliTalk
              </span>
            </h1>

            <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-tight px-2">
              Your intelligent AI assistant for academic excellence — get
              instant answers about courses, campus life, and more. Simplify
              your learning journey.
            </p>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {[
              {
                icon: "💡",
                title: "Instant Answers",
                desc: "Quick responses 24/7",
              },
              {
                icon: "🎓",
                title: "Academic Support",
                desc: "Guidance for courses",
              },
              { icon: "🚀", title: "Smart AI", desc: "Accurate AI assistance" },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-[#12121a] p-3 sm:p-4 rounded border border-[#2c2c3a] hover:bg-[#1c1c27] transition"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-700 rounded flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-base sm:text-lg">
                    {f.icon}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold mb-1 text-[#f1f0ff]">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center w-full sm:w-auto">
            <Link to="/login" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto px-4 py-1 sm:px-6 sm:py-2 text-[#f1f0ff] hover:text-white hover:bg-[#1c1c27] border border-[#2c2c3a] rounded transition text-xs sm:text-sm">
                Sign In
              </Button>
            </Link>
            <Link to="/chat" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto px-4 py-1 sm:px-6 sm:py-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded font-medium transition text-xs sm:text-sm">
                Try as Guest
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Intro;
