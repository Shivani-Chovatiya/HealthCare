import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-teal-600">404</h1>
      <p className="mt-2 text-slate-600">Page not found.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-teal-600 px-5 py-2 font-semibold text-white hover:bg-teal-700"
      >
        Go Home
      </Link>
    </section>
  );
}
