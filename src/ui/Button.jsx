import { Link } from "react-router-dom";

function Button({ children, disabled, to, type }) {
  const miniButtonStyle = `focus: inline-block rounded-full 
    font-bold uppercase tracking-wide transition-colors 
    focus:outline-none focus:ring focus:ring-offset-2 
    disabled:cursor-not-allowed`;

  const buttonBaseStyle = `${miniButtonStyle}  bg-yellow-400 
    text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300  
    focus:ring-yellow-300  
  `;

  const buttonStyles = {
    primary: buttonBaseStyle + " px-4 py-3 md:px-6 md:py-4",
    small: buttonBaseStyle + " px-4 py-2 md:px-5 md:py-3 text-xs",
    secondary:
      miniButtonStyle +
      ` bg-transparent text-stone-800 focus:text-stone-800 
      focus:ring-stone-200 focus:bg-stone-300 hover:bg-stone-400 
      hover:text-stone-800 text-stone-400 border-2 border-stone-300 px-4 
      py-2.5 md:px-6 md:py-3.5
    `,
  };

  if (to)
    return (
      <Link className={buttonStyles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={buttonStyles[type]}>
      {children}
    </button>
  );
}

export default Button;
