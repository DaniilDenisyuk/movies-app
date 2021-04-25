import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getUsers } from "../../redux/selectors";
import UserCard from "../cards/UserCard";
import Loading from "../Loading";

export const Users = ({ match }) => {
  const { pathname } = useLocation();
  const { users, isLoading } = useSelector(getUsers);
  const cards = users.map((user) => (
    <Link key={user.id} to={`${pathname}/${user.id}`}>
      <UserCard className="users__card" user={user} />
    </Link>
  ));
  return (
    <section className="users">
      <div className="users__list">
        {isLoading ? (
          <Loading message="Загрузка пользователей" />
        ) : users && users.length > 0 ? (
          cards
        ) : (
          "нету пользоваетелей"
        )}
      </div>
    </section>
  );
};
