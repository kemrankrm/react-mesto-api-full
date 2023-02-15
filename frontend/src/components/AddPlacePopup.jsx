import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  function handleNameChange(e) {
    props.onSetCardData({
      name: e.target.value,
      link: props.cardData.link,
    });
  }

  function handleLinkChange(e) {
    props.onSetCardData({
      name: props.cardData.name,
      link: e.target.value,
    });
  }

  function handleAddPlace(e) {
    e.preventDefault();
    props.onAddPlace(props.cardData);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name="new-place"
      title="Новое Место"
      onClose={props.onClose}
      onSubmit={handleAddPlace}
    >
      <input
        type="text"
        id="place-name"
        name="place-name"
        className="popup__input popup__input_type_place-name"
        placeholder="Название"
        value={props.cardData.name}
        onChange={handleNameChange}
        minLength={2}
        maxLength={30}
        required
      />
      <span className="popup__url-input-error"></span>
      <input
        type="url"
        value={props.cardData.link}
        onChange={handleLinkChange}
        id="url-input"
        name="place-link"
        className="popup__input popup__input_type_image-url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__place-name-error"></span>
    </PopupWithForm>
  );
}
