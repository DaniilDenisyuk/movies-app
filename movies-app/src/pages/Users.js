import { Link } from "react-router-dom";
import cn from "classnames";

const Users = () => {
  return (
    <section className="home">
      <div className={cn("home__routes", "home__routes--public")}>
        <p className="home__heading">Публичные маршруты</p>
        <Link className="home__route" to="/films">
          Фильмы
        </Link>
        <Link className="home__route" to="/profiles">
          Профили
        </Link>
      </div>
      <div className={cn("home__routes", "home__routes--private")}>
        <p className="home__heading">Только для залогиненых</p>
        <Link className="home__route" to="/users">
          Пользователи
        </Link>
        <Link className="home__route" to="/statistic">
          Статистика
        </Link>
      </div>
    </section>
  );
};

export default Users;