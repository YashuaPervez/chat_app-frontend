"use client";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={`bg-blue-500 h-8 px-4 rounded text-white ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
