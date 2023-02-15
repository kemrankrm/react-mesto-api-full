import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({ name: name, about: description });
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="profile-edit"
      title="Редактировать Профиль"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name-input"
        name="user-name"
        value={name}
        onChange={handleNameChange}
        className="popup__input popup__input_type_name"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__job-input-error"></span>
      <input
        type="text"
        id="job-input"
        name="user-job"
        value={description}
        onChange={handleDescriptionChange}
        className="popup__input popup__input_type_job"
        placeholder="Введите профессию"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__name-input-error"></span>
    </PopupWithForm>
  );
}
