const Home = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,#1A1A2E,#000000)] font-sans antialiased text-white overflow-hidden">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#32CD32,transparent_70%)] animate-pulse-slow opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-extrabold text-center mb-16">
            <span className="bg-gradient-to-r from-[#8A2BE2] to-[#B0C4DE] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(138,43,226,0.7)]">
              Core Features
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Anime Tracking", desc: "Monitor your anime journey effortlessly", icon: "🎬" },
              { title: "Community Hub", desc: "Connect with fellow anime enthusiasts", icon: "👥" },
              { title: "Live Updates", desc: "Stay ahead with real-time anime news", icon: "📡" },
              { title: "Custom Profiles", desc: "Showcase your anime passion", icon: "🎨" },
              { title: "Holo Cards", desc: "Collect rare digital anime cards", icon: "🎲" },
              { title: "VR Ready", desc: "Immerse in anime worlds", icon: "🕶️" },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-[rgba(26,26,46,0.8)] backdrop-blur-lg rounded-xl p-6 border border-[rgba(255,255,255,0.1)] hover:border-neon-cyan hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute -inset-2 bg-gradient-to-br from-[#00FFFF] to-[#8A2BE2] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-neon-cyan transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-cool-gray group-hover:text-white transition-colors duration-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[rgba(26,26,46,0.9)] backdrop-blur-lg border-b border-[rgba(255,255,255,0.1)] shadow-[0_0_20px_rgba(0,255,255,0.2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#00FFFF] to-[#FF69B4] bg-clip-text text-transparent animate-text-shimmer">
            Animite
          </h1>
          <nav className="flex space-x-8">
            {["Home", "Anime", "Community", "Profile"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-cool-gray hover:text-neon-cyan transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_rgba(0,255,255,0.4)]"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-[conic-gradient(at_center,#00FFFF,#8A2BE2,transparent_70%)] animate-spin-slow opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(26,26,46,0.95)] to-[rgba(255,105,180,0.3)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 animate-fade-up">
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter">
            <span className="bg-gradient-to-r from-[#32CD32] to-[#00FFFF] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.7)]">
              Welcome to the Future
            </span>
          </h2>
          <p className="text-2xl text-cool-gray max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-[rgba(26,26,46,0.5)] p-4 rounded-xl border border-[rgba(255,255,255,0.15)]">
            Dive into Animite - your portal to an anime multiverse. Discover, connect, and live the ultimate experience.
          </p>
          <div className="flex justify-center gap-6">
            <button className="relative px-8 py-4 bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] text-deep-space-black font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.7)] transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] animate-shine" />
            </button>
            <button className="relative px-8 py-4 bg-gradient-to-r from-[#FF69B4] to-[#32CD32] text-deep-space-black font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(255,105,180,0.7)] transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Explore Now</span>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] animate-shine" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}


      {/* Call to Action */}
      <section className="relative py-24 bg-[linear-gradient(to_right,#1A1A2E,#FF69B4)]">
        <div className="absolute inset-0 bg-[conic-gradient(at_bottom_left,#00FFFF,#FF69B4,transparent_70%)] animate-spin-slow opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter">
            <span className="bg-gradient-to-r from-[#FF69B4] to-[#32CD32] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,105,180,0.7)]">
              Join the Animite Revolution
            </span>
          </h2>
          <p className="text-xl text-cool-gray max-w-2xl mx-auto backdrop-blur-sm bg-[rgba(26,26,46,0.5)] p-6 rounded-xl border border-[rgba(255,255,255,0.15)]">
            Step into a new era of anime fandom. Sign up now and become part of the future.
          </p>
          <button className="relative px-12 py-4 bg-gradient-to-r from-[#32CD32] to-[#00FFFF] text-deep-space-black font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_30px_rgba(50,205,50,0.7)] transition-all duration-300 animate-pulse-slow overflow-hidden">
            <span className="relative z-10">Launch Now</span>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] animate-shine" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 bg-deep-space-black border-t border-[rgba(255,255,255,0.1)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#8A2BE2,transparent_70%)] animate-pulse-slow opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] bg-clip-text text-transparent">
              Animite
            </h3>
            <p className="text-cool-gray text-sm">
              Your gateway to the ultimate anime experience.
            </p>
          </div>
          {["Explore", "Features", "Community", "Support"].map((section) => (
            <div key={section}>
              <h4 className="text-lg font-semibold text-white mb-4">{section}</h4>
              <ul className="space-y-2 text-cool-gray text-sm">
                {[1, 2, 3].map((item) => (
                  <li
                    key={item}
                    className="hover:text-neon-cyan transition-all duration-300 hover:translate-x-2 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                  >
                    {section} Link {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        :root {
          --neon-cyan: #00FFFF;
          --deep-space-black: #1A1A2E;
          --vivid-purple: #8A2BE2;
          --hot-pink: #FF69B4;
          --cool-gray: #B0C4DE;
          --lime-green: #32CD32;
        }

        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-shine {
          animation: shine 3s linear infinite;
        }

        .animate-text-shimmer {
          animation: text-shimmer 4s ease-in-out infinite;
          background-size: 200% 200%;
        }

        .animate-fade-up {
          animation: fade-up 1.2s ease-in-out;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes shine {
          0% { background-position: -200%; }
          100% { background-position: 200%; }
        }

        @keyframes text-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;