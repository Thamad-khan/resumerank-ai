const stats = [
  {
    number: "5000+",
    label: "Resumes Processed",
  },
  {
    number: "98%",
    label: "Matching Accuracy",
  },
  {
    number: "200+",
    label: "Recruiters",
  },
  {
    number: "24/7",
    label: "AI Availability",
  },
];

export default function Stats() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-6 text-center hover:border-cyan-500 transition"
          >
            <h2 className="text-4xl font-bold text-cyan-400">
              {stat.number}
            </h2>

            <p className="mt-3 text-gray-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}