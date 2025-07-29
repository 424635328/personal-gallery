// components/layout/AnimatedGradientBackground.tsx

export default function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
      <div className="relative h-full w-full">
        {/* The spinning container */}
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] animate-[blob-spin_25s_linear_infinite]">
          {/* Blob 1 */}
          <div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-50 blur-3xl animate-[blob-move-1_15s_ease-in-out_infinite]"
          />
          {/* Blob 2 */}
          <div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-50 blur-3xl animate-[blob-move-2_18s_ease-in-out_infinite_reverse]"
          />
        </div>
      </div>
    </div>
  );
}