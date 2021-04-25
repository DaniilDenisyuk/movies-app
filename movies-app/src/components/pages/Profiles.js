import cn from "classnames";
import Modal from "../HOCs/Modal";
import { ProfileForm } from "../forms";
import { useState } from "react";
import { connect } from "react-redux";
import { userActions } from "../../redux/actionCreators";
import Loading from "../Loading";
import ProfilesList from "../ProfilesList";
import Confirm from "../Confirm";

const ProfileFormModal = Modal(ProfileForm);

export const Profiles = ({
  className,
  isLoading,
  profiles,
  deleteProfile,
  updateProfile,
  createProfile,
}) => {
  const [watchedProfileId, setWatchedProfileId] = useState(null);
  const [editOpened, setEditOpened] = useState(false);
  const [formOpened, setFormOpened] = useState(false);
  const [confirmOpened, setConfirmOpened] = useState(false);

  return (
    <div className={cn(className, "profiles")}>
      {isLoading ? (
        <Loading message="Профили загружаются" />
      ) : (
        <>
          <ProfilesList
            className="profiles__list"
            handleProfileClick={() => {}}
            handleProfileDelete={(profileId) => {
              setEditOpened(true);
              setWatchedProfileId(profileId);
            }}
            handleProfileEdit={(profileId) => {
              setConfirmOpened(true);
              setWatchedProfileId(profileId);
            }}
            handleProfileCreate={() => setEditOpened(true)}
            profiles={profiles}
          />
          {editOpened && (
            <ProfileFormModal
              onClose={() => setEditOpened(false)}
              handleSubmit={(profile) => updateProfile(profile)}
              handleReject={() => setEditOpened(false)}
              profile={profiles.find(
                (profile) => profile.id === watchedProfileId
              )}
            />
          )}
          {formOpened && (
            <ProfileFormModal
              onClose={() => setFormOpened(false)}
              handleSubmit={(profile) => createProfile(profile)}
              handleReject={() => setFormOpened(false)}
            />
          )}
          {confirmOpened && (
            <Confirm
              message="Удалить профиль навседа?"
              onConfirm={() => deleteProfile(watchedProfileId)}
              onDecline={() => setConfirmOpened(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

const mapState = (state) => {
  const { list, isLoading } = state.profiles;
  return { profiles: list, isLoading };
};

const mapDispatch = {
  deleteProfile: userActions.deleteProfile,
  updateProfile: userActions.updateProfile,
  createProfile: userActions.createProfile,
};

export const ProfilesConnected = connect(mapState, mapDispatch)(Profiles);
