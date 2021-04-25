import cn from "classnames";

const newItemCard = ({ className, text, handleClick }) => {
  return (
    <section className={cn(className, "item-card", "item-card--new")}>
      <div onClick={handleClick} className="item-card__wrapper">
        <span className="item-card__add-sign"></span>
        <p className="item-card__field">{text}</p>
      </div>
    </section>
  );
};

export default newItemCard;
