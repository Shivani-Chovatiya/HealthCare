import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
const links = [
  { name: "Home", to: "/" },
  { name: "Symptom Checker", to: "/symptom-checker" },
  { name: "Book Appointment", to: "/book" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="text-xl font-bold text-teal-600">
          Care<span className="text-slate-800">Mate</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.name}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium hover:text-teal-600 ${isActive ? "text-teal-600" : "text-slate-600"}`
                }
              >
                {l.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/book"
          className="hidden md:inline-block rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
        >
          Get Started
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded p-2 text-slate-700 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <li key={l.name}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 hover:bg-teal-50 ${isActive ? "text-teal-600 font-semibold" : "text-slate-700"}`
                  }
                >
                  {l.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
