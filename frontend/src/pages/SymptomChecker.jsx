import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

const urgencyStyles = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  emergency: "bg-red-100 text-red-800",
};

export default function SymptomChecker() {
  const [form, setForm] = useState({ symptoms: "", age: "", gender: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const data = await api("/symptoms/check", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        AI Symptom Checker
      </h1>
      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        Describe how you feel and get general guidance. This is not a medical
        diagnosis.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-100 sm:p-8"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Your symptoms *
          </label>
          <textarea
            name="symptoms"
            value={form.symptoms}
            onChange={handleChange}
            rows="4"
            maxLength="1000"
            required
            className={inputClass}
            placeholder="Example: headache and mild fever for 2 days, feeling tired"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Age
            </label>
            <input
              name="age"
              type="number"
              min="0"
              max="120"
              value={form.age}
              onChange={handleChange}
              className={inputClass}
              placeholder="28"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Prefer not to say</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-60 sm:w-auto"
        >
          {loading
            ? "Analyzing your symptoms (can take up to 2-3 mins)..."
            : "Check Symptoms"}
        </button>
      </form>

      {result && (
        <div className="mt-8 space-y-4 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-100 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">Your result</h2>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${urgencyStyles[result.urgency]}`}
            >
              {result.urgency} urgency
            </span>
          </div>

          {result.urgency === "emergency" && (
            <div className="rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white">
              These symptoms may be serious. Call your local emergency number or
              go to the nearest hospital now.
            </div>
          )}

          {result.possibleConditions.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-slate-700">
                May be related to
              </p>
              <ul className="mt-1 list-inside list-disc text-sm text-slate-600">
                {result.possibleConditions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-slate-700">Advice</p>
            <p className="mt-1 text-sm text-slate-600">{result.advice}</p>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700">
              Suggested department:{" "}
              <strong>{result.recommendedDepartment}</strong>
            </p>
            <Link
              to="/book"
              state={{ department: result.recommendedDepartment }}
              className="rounded-lg bg-teal-600 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-teal-700"
            >
              Book this department
            </Link>
          </div>

          <p className="text-xs text-slate-400">
            General guidance only, not a substitute for professional medical
            advice.
          </p>
        </div>
      )}
    </section>
  );
}
