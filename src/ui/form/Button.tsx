type Props = {
  children: React.ReactNode;
  type?: "primary" | "secondary";
  onClick?: () => void;
  styles?: string;
  role?: "submit" | "button";
};

export default function Button({
  children,
  type = "primary",
  onClick,
  styles = "",
  role = "button",
}: Props) {
  return (
    <button
      type={role}
      onClick={onClick}
      className={`p-2 font-semibold rounded-md border ${
        type === "primary"
          ? "bg-sky-600 text-white border-sky-600 hover:bg-sky-800"
          : "bg-white text-sky-600 border-sky-600 hover:bg-slate-200"
      } ${styles}`}
    >
      {children}
    </button>
  );
}
