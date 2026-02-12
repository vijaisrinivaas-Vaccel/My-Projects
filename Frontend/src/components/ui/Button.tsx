interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className="bg-blue-600 text-white hover:bg-blue-700 bg-linear-to-r from-blue-500 via-blue-600 to-blue-700
         hover:bg-linear-to-br
         focus:outline-none focus:ring-4 focus:ring-blue-300
         shadow-lg shadow-blue-500/50
         font-medium rounded-md
         text-sm px-4 py-2.5 text-center leading-5"
    >
      {children}
    </button>
  );
}
