import { Link } from "react-router-dom";

export default function HeaderMenu(props) {
  switch (props.location.pathname) {
    case "/sign-in":
      return (
        <Link className="header__link header__auth-link" to="/sign-up">
          Регистрация
        </Link>
      );
    case "/sign-up":
      return (
        <Link className="header__link header__auth-link" to="/sign-in">
          Войти
        </Link>
      );
    default:
      return (
        <>
          <p className="header__link header__username">{props.userEmail}</p>
          <Link
            className="header__link header__logout"
            onClick={props.onLogout}
            to="/"
          >
            Выйти
          </Link>
        </>
      );
  }
}
