export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-5">

      <h1 className="text-6xl font-extrabold">
        AI Resume Screening
      </h1>

      <p className="text-gray-400 mt-6 max-w-2xl text-xl">
        Upload resumes, compare them with job descriptions,
        and let AI rank the best candidates in seconds.
      </p>

      <button className="mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold">
        Get Started
      </button>

    </section>
  );
}