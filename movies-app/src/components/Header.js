import { useContext } from "react";
import cn from "classnames";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import useLogout from "./../hooks/useLogout";
import Button from "./Button";

const Header = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { logoutUser } = useLogout();

  return (
    <header className="header">
      <h2 className="header__heading">Movies viewer</h2>
      {user ? (
        <div className="header__buttons">
          <Button
            onClick={logoutUser}
            className={cn("header__button", "header__button--logout")}
          >
            Выйти
          </Button>
        </div>
      ) : (
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
      )}
    </header>
  );
};

export default Header;
