import cn from "classnames";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  const location = useLocation();
  return (
    <header className="header">
      <h2 className="header__heading">Movies viewer</h2>
      <div className="header__buttons">
        <Link
          to={{
            pathname: "/login",
            state: { background: location },
          }}
        >
          <Button className={cn("header__button", "header__button--auth")}>
            Войти
          </Button>
        </Link>
        <Link
          to={{
            pathname: "/registr",
            state: { background: location },
          }}
        >
          <Button className={cn("header__button", "header__button--reg")}>
            Регистрация
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
