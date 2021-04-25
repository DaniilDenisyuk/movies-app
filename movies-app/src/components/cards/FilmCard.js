import cn from "classnames";

const ProfileCard = ({ className, film, handleDelete, handleEdit }) => {
  return (
    <section className={cn(className, "item-card", "item-card--profile")}>
      <h3 className="item-card__title">{film.title}</h3>
      <p className="item-card__field">{film.releaseyear}</p>
      <p className="item-card__field">{film.format}</p>
      <p className="item-card__field">{film.actors}</p>
      <div className="item-card__buttons">
        <button
          onClick={() => handleEdit(film)}
          className="item-card__button item-card__button--edit"
        >
          Изменить
        </button>
        <button
          onClick={() => handleDelete(film.id)}
          className="item-card__button item-card__button--delete"
        >
          Удалить
        </button>
      </div>
    </section>
  );
};

export default ProfileCard;
