// Primary Button
export function PrimaryBtn({ children, ...props }) {
  return (
    <button
      type="button"
      className="
        bg-blue-600 
        text-white 
        px-6 py-2 
        rounded-xl 
        shadow-md 
        hover:bg-blue-700 
        transition-all 
        duration-300
      "
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryBtn({ children, ...props }) {
  return (
    <button
      type="button"
      className="
        border-2 border-blue-600 
        text-blue-600 
        px-6 py-2 
        rounded-xl 
        hover:bg-blue-50 
        transition-all 
        duration-300
      "
      {...props}
    >
      {children}
    </button>
  );
}


export function GetStartedBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-green-600 
        text-white 
        px-6 py-3 
        rounded-2xl 
        font-semibold 
        shadow-md 
        hover:bg-green-700 
        hover:shadow-lg 
        transition-all 
        duration-300
      "
    >
      Get Started
    </button>
  );
}
