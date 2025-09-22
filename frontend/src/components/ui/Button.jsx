
const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
