import "./Button.scss";
import cn from "classnames";

const Button = ({ className, type, children }) => {
  return (
    <button type={type} className={cn(className, "button")}>
      {children}
    </button>
  );
};

export default Button;
