import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { dark, toggleTheme } = useTheme();

  return (
    <header
      className={`sticky top-0 z-10 flex w-full min-w-0 items-center justify-between gap-4 border-b px-4 py-4 transition-colors sm:px-6 ${
        dark
          ? "border-gray-700 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-gray-900"
      }`}
    >
      {/* Search input */}
      <div className="relative min-w-0 w-full max-w-[420px] flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search products..."
          className={`w-full rounded-[10px] border py-2 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
            dark
              ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
              : "border-gray-300 bg-gray-100 text-gray-900 placeholder:text-gray-500"
          }`}
        />
      </div>

      {/* Theme button */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`flex shrink-0 items-center justify-center rounded-lg p-2 transition ${
          dark
            ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {dark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}

export default Header;