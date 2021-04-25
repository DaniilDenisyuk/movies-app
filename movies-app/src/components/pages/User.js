import Modal from "../HOCs/Modal";
import { UserForm } from "../forms";
import cn from "classnames";
import { useState } from "react";
import { connect } from "react-redux";
import { adminActions } from "../../redux/actionCreators";
import { getWatchedUser } from "../../redux/selectors";
import Loading from "../Loading";
import { Profiles } from "./Profiles";
import Confirm from "../Confirm";

const UserFormModal = Modal(UserForm);

const User = ({
  isLoading,
  user,
  profiles,
  deleteUser,
  updateUser,
  deleteProfile,
  updateProfile,
  createProfile,
}) => {
  const [editOpened, setEditOpened] = useState(false);
  const [confirmOpened, setConfirmOpened] = useState(false);
  return (
    <div className="user">
      {isLoading ? (
        <Loading message="Загрузка данных о пользователе" />
      ) : (
        <>
          <section className="user__info user-info">
            <p className="user-info__main">{user.userName}</p>
            <p className="user-info__main">{user.email}</p>
            <p className="user-info__aux">{user.role}</p>
            <div className="user-info__buttons">
              <button
                onClick={() => {
                  setEditOpened(true);
                }}
                className={cn("user-info__button", "user-info__button--edit")}
              ></button>
              <button
                onClick={() => {
                  setConfirmOpened(true);
                }}
                className={cn("user-info__button", "user-info__button--delete")}
              ></button>
            </div>
          </section>
          {editOpened && (
            <UserFormModal
              onClose={() => setEditOpened(false)}
              handleSubmit={(user) => updateUser(user)}
              handleReject={() => setEditOpened(false)}
              user={user}
            />
          )}
          {confirmOpened && (
            <Confirm
              message="Удалить пользователя навседа?"
              onConfirm={() => deleteUser(user.id)}
              onDecline={() => setConfirmOpened(false)}
            />
          )}
          <Profiles
            className="user__profiles"
            isLoading={isLoading}
            profiles={profiles}
            deleteProfile={deleteProfile}
            updateProfile={updateProfile}
            createProfile={createProfile}
          />
        </>
      )}
    </div>
  );
};

const mapState = (state) => {
  return getWatchedUser(state);
};

const mapDispatch = {
  deleteProfile: adminActions.deleteUserProfile,
  updateProfile: adminActions.updateUserProfile,
  createProfile: adminActions.createUserProfile,
  deleteUser: adminActions.deleteUser,
  updateUser: adminActions.updateUser,
};

export default connect(mapState, mapDispatch)(User);
