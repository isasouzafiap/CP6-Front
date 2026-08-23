import "./Button.css";

function Button({ label, onClick, variant = "primary", disabled = false }) {
  return (
    <button
      type="button"
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
