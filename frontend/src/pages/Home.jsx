import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen overflow-hidden transition-colors duration-500
        bg-gradient-to-br 
        from-gray-100 via-white to-gray-200
        dark:from-black dark:via-gray-900 dark:to-black
        text-gray-900 dark:text-white
      "
    >
      {/* 🌌 Background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 opacity-20 rounded-full blur-3xl animate-pulse" />

      {/* 🌟 Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-10 py-6 animate-fadeDown">
        <h1 className="text-2xl font-bold">🚨 CivicLens AI</h1>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => navigate("/admin/login")}
            className="
              px-5 py-2 rounded-full border transition
              border-gray-400 dark:border-white/20
              hover:bg-black hover:text-white
              dark:hover:bg-white dark:hover:text-black
            "
          >
            Admin Login
          </button>
        </div>
      </nav>

      {/* 🧠 HERO */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 mt-24 animate-fadeUp">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          From Complaints <br />
          <span className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            to Urban Intelligence
          </span>
        </h2>

        <p className="max-w-2xl text-lg mb-10 text-gray-600 dark:text-gray-300">
          CivicLens AI transforms citizen complaints into{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            prioritized, actionable insights
          </span>{" "}
          using AI-powered image analysis, duplicate detection,
          and smart dashboards.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate("/report")}
            className="
              px-8 py-4 rounded-xl font-semibold transition
              bg-gradient-to-r from-red-600 to-orange-500
              hover:scale-105
            "
          >
            🚀 Raise a Complaint
          </button>

          <button
            onClick={() => navigate("/admin/login")}
            className="
              px-8 py-4 rounded-xl border transition
              border-gray-400 dark:border-white/30
              hover:bg-black hover:text-white
              dark:hover:bg-white dark:hover:text-black
            "
          >
            🔐 Admin Dashboard
          </button>
        </div>
      </section>

      {/* 🧩 FEATURES */}
      <section className="relative z-10 mt-32 px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            title: "AI-Powered Analysis",
            desc: "Gemini AI analyzes images to detect issue type and severity.",
          },
          {
            title: "Smart Prioritization",
            desc: "Duplicate detection and priority scoring surface urgent issues.",
          },
          {
            title: "Visual Intelligence",
            desc: "Dashboards and heatmaps enable data-driven governance.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{ animationDelay: `${idx * 150}ms` }}
            className="
              animate-fadeUp transition
              bg-white dark:bg-white/5
              text-gray-700 dark:text-gray-300
              border border-gray-200 dark:border-white/10
              backdrop-blur-lg p-6 rounded-2xl
              hover:border-red-500 hover:scale-105
            "
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 🏁 Footer */}
      <footer className="relative z-10 mt-32 pb-10 text-center text-gray-500 dark:text-gray-400 text-sm animate-fadeUp">
        © {new Date().getFullYear()} CivicLens AI · Smart Cities · AI for Good
      </footer>
    </div>
  );
}
