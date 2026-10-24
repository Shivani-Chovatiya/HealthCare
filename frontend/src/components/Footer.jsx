export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <p className="text-lg font-bold text-white">
          Care<span className="text-teal-400">Mate</span>
        </p>
        <p className="max-w-md text-xs text-slate-400">
          CareMate provides general guidance only and is not a substitute for
          professional medical advice. In an emergency, call your local
          emergency number.
        </p>
        <p className="text-xs">© {new Date().getFullYear()} CareMate</p>
      </div>
    </footer>
  );
}
