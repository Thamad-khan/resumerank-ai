export default function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>
    </>
  );
}