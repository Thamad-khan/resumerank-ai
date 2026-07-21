import { Upload, BrainCircuit, Trophy } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description:
      "Upload a candidate's resume in PDF format with a single click.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "Our AI powered by Ollama analyzes skills, experience, and job compatibility.",
  },
  {
    icon: Trophy,
    title: "Get Ranked",
    description:
      "Receive ATS scores, candidate rankings, and hiring recommendations instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-8">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center">
          How It Works
        </h2>

        <p className="text-center text-gray-400 mt-4 mb-16">
          Three simple steps to hire the best candidates.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center hover:border-cyan-500 hover:-translate-y-2 transition duration-300"
              >

                <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Icon size={32} className="text-cyan-400" />
                </div>

                <h3 className="text-2xl font-semibold mt-6">
                  {index + 1}. {step.title}
                </h3>

                <p className="text-gray-400 mt-4">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}