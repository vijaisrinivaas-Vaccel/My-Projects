interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export  function Button({ children, ...rest }: Props) {
  return (
    <button
      type="button"
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
export function Delbutton({ children, ...rest }: Props) {
  return (
    <button
      type="button"
      {...rest}
      className="bg-red-600 text-white hover:bg-red-700 bg-linear-to-r from-red-500 via-red-600 to-red-700
         hover:bg-linear-to-br
         focus:outline-none focus:ring-4 focus:ring-red-300
         shadow-lg shadow-red-500/50
         font-medium rounded-md
         text-sm px-4 py-2.5 text-center leading-5"
    >
      {children}
    </button>
  );
}