import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="
        px-4 py-2 rounded-full border text-sm transition
        bg-black text-white
        dark:bg-white dark:text-black
      "
    >
      {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
