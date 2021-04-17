import { Link } from "react-router-dom";
import cn from "classnames";
import "./Home.scss";

export const Home = () => {
  return (
    <section className="home">
      <h2 className="home__title">Доступные разделы</h2>
      <div className="home__wrapper">
        <div className={cn("home__routes", "home__routes--public")}>
          <p className="home__heading">Публичные</p>
          <Link className="home__route" to="/films">
            Фильмы
          </Link>
        </div>
        <div className={cn("home__routes", "home__routes--private")}>
          <p className="home__heading">Для авторизированных</p>
          <Link className="home__route" to="/profiles">
            Профили
          </Link>
        </div>
        <div className={cn("home__routes", "home__routes--admin")}>
          <p className="home__heading">Для администраторов</p>
          <Link className="home__route" to="/users">
            Пользователи
          </Link>
          <Link className="home__route" to="/statistic">
            Статистика
          </Link>
        </div>
      </div>
    </section>
  );
};
