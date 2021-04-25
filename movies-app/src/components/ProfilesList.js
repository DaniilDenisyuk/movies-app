import cn from "classnames";
import ProfileCard from "./cards/ProfileCard";
import NewItemCard from "./cards/NewItemCard";

const ProfilesList = ({
  className,
  profiles,
  handleProfileClick,
  handleProfileEdit,
  handleProfileDelete,
  handleProfileCreate,
}) => {
  const profileCards = profiles.map((profile) => (
    <ProfileCard
      key={profile.id}
      className="profiles-list__item"
      profile={profile}
      handleClick={handleProfileClick}
      handleEdit={handleProfileEdit}
      handleDelete={handleProfileDelete}
    />
  ));
  return (
    <div className={cn(className, "profiles-list")}>
      {profileCards}
      <NewItemCard
        className="profiles-list__item"
        text="Создать новый профиль"
        handleClick={handleProfileCreate}
      />
    </div>
  );
};

export default ProfilesList;
