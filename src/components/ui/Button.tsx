type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button
      className="
      bg-gradient-to-r
      from-blue-600
      to-cyan-500
      px-6
      py-3
      rounded-xl
      font-semibold
      hover:scale-105
      transition
      duration-300
      shadow-lg
      shadow-cyan-500/20
      "
    >
      {text}
    </button>
  );
}