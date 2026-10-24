import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-teal-50 to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:py-28">
        <div className="text-center md:text-left">
          <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-700">
            AI-Powered Healthcare
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Understand your symptoms. Book care in minutes.
          </h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Describe how you feel, get an instant AI triage suggestion, and
            schedule an appointment with a clinic, all in one place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link
              to="/symptom-checker"
              className="rounded-lg bg-teal-600 px-6 py-3 text-center font-semibold text-white hover:bg-teal-700"
            >
              Check Symptoms
            </Link>
            <Link
              to="/book"
              className="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 hover:bg-slate-50"
            >
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Placeholder card, replaced by real features later */}
        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
          <div className="grid grid-cols-2 gap-4 text-center">
            {[
              ["24/7", "AI Assistance"],
              ["2 min", "Avg. Triage"],
              ["Easy", "Booking"],
              ["Secure", "Your Data"],
            ].map(([big, small]) => (
              <div key={small} className="rounded-xl bg-teal-50 p-4">
                <p className="text-xl font-bold text-teal-700 sm:text-2xl">
                  {big}
                </p>
                <p className="text-xs text-slate-600 sm:text-sm">{small}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
