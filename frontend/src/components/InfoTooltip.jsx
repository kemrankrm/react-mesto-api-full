import iconSuccess from "../images/UnionSuccess.svg";
import iconFatal from "../images/UnionFatal.svg";
import closeIcon from "../images/CloseIcon.png";

export default function InfoTooltip(props) {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div
      className={
        props.isOpen ? "info-tooltip info-tooltip_visible" : "info-tooltip"
      }
    >
      <div className="info-tooltip__modal">
        <img
          className="info-tooltip__close-icon"
          src={closeIcon}
          alt="close button"
          onClick={handleClose}
        />
        <img
          className="info-tooltip__icon"
          src={props.status === "success" ? iconSuccess : iconFatal}
          alt="icon"
        />
        <p className="info-tooltip__message">
          {props.status === 'success'
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
      <div className="info-tooltip__overlay"></div>
    </div>
  );
}
