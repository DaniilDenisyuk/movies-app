import cn from "classnames";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import Loading from "./Loading";
import { useEffect } from "react";
import { connect } from "react-redux";
import { refreshToken, logout } from "../redux/actionCreators/users";

const Header = ({ refreshToken, logout, user, isLoggingIn, isLoggedIn }) => {
  const location = useLocation();
  useEffect(() => {
    refreshToken();
  }, [refreshToken]);
  return (
    <header className="header">
      <h2 className="header__heading">Movies viewer</h2>
      {isLoggingIn ? (
        <Loading className="header__user-name" message="Вход" />
      ) : (
        isLoggedIn && <p className="header__user-name">{user.username}</p>
      )}
      {isLoggedIn ? (
        <div className="header__buttons">
          <Button
            onClick={() => logout(user.jwt)}
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

const mapState = (state) => {
  const { isLoggingIn, isLoggedIn, user } = state.auth;
  return { isLoggingIn, isLoggedIn, user };
};

const mapDispatch = {
  refreshToken,
  logout,
};

export default connect(mapState, mapDispatch)(Header);
