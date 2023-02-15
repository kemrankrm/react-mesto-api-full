import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card.link, props.card.name);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="elements__element">
      {isOwn && (
        <button
          className="elements__remove-button"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="elements__image-container">
        <img
          className="elements__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
      </div>
      <div className="elements__group">
        <h2 className="elements__name">{`${props.card.name}`}</h2>
        <div className="elements__like-container">
          <button
            className={
              isLiked
                ? "elements__like-button elements__like-button_active"
                : "elements__like-button"
            }
            type="button"
            id="like-button"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
