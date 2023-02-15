import { useEffect } from "react";

export default function ImagePopup(props) {
  useEffect(() => {
    if (!props.card.isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [props.card.isOpen, props]);

  return (
    <div
      className={
        props.card.isOpen
          ? `popup popup_open popup_type_image`
          : "popup popup_type_image"
      }
    >
      <div className="popup__container popup__container_type_image">
        <button
          className="popup__close-button"
          type="button"
          id="pi-close"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__image"
          src={props.card.src}
          alt={props.card.alt}
        />
        <p className="popup__cite">{props.card.title}</p>
      </div>
      <div
        className="popup__overlay popup__overlay_type_big-image"
        onClick={props.onClose}
      ></div>
    </div>
  );
}
