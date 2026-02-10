interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      {children}
    </button>
  );
}
