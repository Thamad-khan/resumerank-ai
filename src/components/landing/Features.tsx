"use client";

import { Brain, FileText, BarChart3, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Analyze resumes using Ollama AI.",
  },
  {
    icon: FileText,
    title: "PDF Parser",
    description: "Extract candidate details instantly.",
  },
  {
    icon: BarChart3,
    title: "ATS Score",
    description: "Generate ATS compatibility score.",
  },
  {
    icon: Shield,
    title: "Secure",
    description: "All processing happens locally.",
  },
];

export default function Features() {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-10 pb-20">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <motion.div
            key={feature.title}
            whileHover={{
              scale: 1.05,
              y: -8,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              rounded-2xl
              border
              border-slate-800
              bg-slate-900
              p-6
              hover:border-cyan-500
              transition
            "
          >
            <Icon className="text-cyan-400" size={40} />

            <h2 className="mt-5 font-bold text-xl">
              {feature.title}
            </h2>

            <p className="text-gray-400 mt-3">
              {feature.description}
            </p>
          </motion.div>
        );
      })}
    </section>
  );
}