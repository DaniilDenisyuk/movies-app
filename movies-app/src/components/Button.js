import "./Button.scss";
import cn from "classnames";

const Button = ({ className, type, handleClick, children }) => {
  return (
    <button
      type={type}
      className={cn(className, "button")}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
