import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const inputRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUploadAvatar(
      {
        avatar: inputRef.current.value,
      },
      inputRef
    );
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="edit-avatar"
      title="Обновить Аватар"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="avatar-url-input"
        ref={inputRef}
        name="avatar-url-link"
        className="popup__input popup__input_type_avatar-url"
        placeholder="Ссылка на картинку"
        required
      />
      <span
        className="popup__error-avatar popup__avatar-url-input-error"
        id="avatar-url-error"
      ></span>
    </PopupWithForm>
  );
}
