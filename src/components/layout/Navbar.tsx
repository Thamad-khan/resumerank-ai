export default function Navbar() {
  return (
    <nav className="w-full px-8 py-5 flex justify-between items-center border-b border-slate-800">
      <h1 className="text-2xl font-bold text-blue-500">
        ResumeRank AI
      </h1>

      <div className="space-x-6">
        <a href="#" className="hover:text-blue-500">
          Features
        </a>

        <a href="#" className="hover:text-blue-500">
          Pricing
        </a>

        <a href="#" className="hover:text-blue-500">
          Contact
        </a>
      </div>
    </nav>
  );
}