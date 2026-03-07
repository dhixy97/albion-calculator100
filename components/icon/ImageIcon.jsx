export default function ImageIcon() {
  return (
    <>
      <div className="w-15 h-15 bg-slate-800 border border-slate-600 rounded-md flex items-center justify-center">
        <svg
          className="w-5 h-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8" cy="10" r="2" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
    </>
  );
}
