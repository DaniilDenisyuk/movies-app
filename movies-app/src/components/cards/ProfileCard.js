import cn from "classnames";

const ProfileCard = ({
  className,
  profile,
  handleClick,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className={cn(className, "item-card", "item-card--profile")}>
      <div onClick={handleClick} className="item-card__wrapper">
        <h3 className="item-card__title">{profile.name}</h3>
        <p className="item-card__field">{profile.gender}</p>
        <p className="item-card__field">{profile.birthday}</p>
        <p className="item-card__field">{profile.city}</p>
      </div>
      <div className="item-card__buttons">
        <button
          onClick={() => handleEdit(profile)}
          className="item-card__button item-card__button--edit"
        >
          Изменить
        </button>
        <button
          onClick={() => handleDelete(profile.id)}
          className="item-card__button item-card__button--delete"
        >
          Удалить
        </button>
      </div>
    </section>
  );
};

export default ProfileCard;
