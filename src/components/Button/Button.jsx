const VARIANT_CLASSES = {
  primary: "bg-accent text-accent-text",
  secondary: "bg-panel text-panel-text",
  outline: "bg-transparent border border-outline text-text",
  ghost: "bg-white/10 text-text",
};

function Button({ label, onClick, variant = "primary", disabled = false, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-[22px] py-2.5 text-[0.85rem] font-semibold cursor-pointer
        transition duration-150 hover:brightness-110 active:scale-[0.97]
        disabled:opacity-[0.45] disabled:cursor-not-allowed
        ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </button>
  );
}

export default Button;