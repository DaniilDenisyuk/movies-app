import cn from "classnames";

const UserCard = ({ className, user, handleClick }) => {
  return (
    <section className={cn(className, "item-card", "item-card--user")}>
      <div onClick={handleClick} className="item-card__wrapper">
        {user.username ? (
          <>
            <h3 className="item-card__title">{user.username}</h3>
            <p className="item-card__field">{user.email}</p>
          </>
        ) : (
          <h3 className="item-card__title">{user.email}</h3>
        )}
        <p className="item-card__field">{user.role}</p>
        <p className="item-card__field">
          {user.profilescount
            ? `${user.profilescount} ${
                user.profilescount === 1
                  ? "профиль"
                  : 5 > user.profilescount > 1
                  ? `${user.profilescount} профиля`
                  : `${user.profilescount} профилей`
              }`
            : "нету профилей"}
        </p>
      </div>
    </section>
  );
};

export default UserCard;
