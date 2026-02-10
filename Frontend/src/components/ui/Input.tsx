interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}
