import { useEffect } from "react";

function PopupWithForm(props) {
  useEffect(() => {
    if (!props.isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [props.isOpen, props]);

  return (
    <div
      className={
        props.isOpen
          ? `popup popup_open popup_type_${props.name}`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          id="pup-close"
          onClick={props.onClose}
        ></button>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__text">{props.title}</h2>
          <fieldset className="popup__input-container">
            {props.children}
            <button
              type="submit"
              name="button"
              className="popup__submit-button"
            >
              Сохранить
            </button>
          </fieldset>
        </form>
      </div>
      <div className="popup__overlay" onClick={props.onClose}></div>
    </div>
  );
}

export default PopupWithForm;
