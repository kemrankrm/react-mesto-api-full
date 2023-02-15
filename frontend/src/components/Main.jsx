import avatarEditIcon from "../images/avatar-edit-button.svg";
import Card from "./Card.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      {currentUser && (
        <section className="profile">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар"
            />
            <img
              className="profile__avatar-edit-button"
              src={avatarEditIcon}
              onClick={props.onEditAvater}
              alt="Иконка редактирования аватарки"
              id="edit-avatar"
            />
            <div className="profile__overlay"></div>
          </div>
          <div className="profile__info">
            <div className="profile__name-button-container">
              <h2 className="profile__name">{currentUser.name}</h2>
              <button
                className="profile__edit-button"
                type="button"
                onClick={props.onEditProfile}
                id="profile-edit"
              ></button>
            </div>
            <h3 className="profile__description">{currentUser.about}</h3>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={props.onAddPlace}
            id="new-place"
          ></button>
        </section>
      )}

      <section className="elements">
        {props.cards.map((item) => {
          return (
            <Card
              card={item}
              onCardClick={props.onCardClick}
              key={item._id}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
