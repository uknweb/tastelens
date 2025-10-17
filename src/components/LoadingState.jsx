export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="relative w-16 h-16 mb-8">
        <svg className="animate-spin" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="8 4"
            strokeLinecap="round"
            className="text-black"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="8 4"
            strokeLinecap="round"
            className="text-neutral-300 opacity-40"
            style={{ transform: 'rotate(180deg)', transformOrigin: 'center' }}
          />
        </svg>
      </div>
      <p className="text-black text-lg font-light tracking-wide">Analyzing through 3 taste lenses...</p>
    </div>
  );
}
