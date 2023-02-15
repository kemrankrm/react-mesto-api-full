import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthForm(props) {
  const [userData, setUserData] = useState({ email: "", password: "" });

  //Controlled Input Setup
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setUserData({
        [e.target.name]: e.target.value,
        password: userData.password,
      });
    } else {
      setUserData({
        email: userData.email,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(props.isRegistration){
      props.onRegister(userData)
    } else{
      props.onLogin(userData);
    }
  }
  return (
    <div className="authentification">
      <form className="authentification__form" onSubmit={handleSubmit}>
        <fieldset className="authentification__input-container">
          <legend className="authentification__legend">{props.legend}</legend>
          <input
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="authentification__email"
            type="email"
            placeholder="Email"
          />
          <input
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="authentification__password"
            type="password"
            placeholder="Пароль"
          />
          <button className="authentification__button" type="submit">
            {props.buttonText}
          </button>
        </fieldset>
        {props.isRegistration && (
          <Link to="/sign-in" className="authentification__text">
            Уже зарегистрированы? Войти
          </Link>
        )}
      </form>
    </div>
  );
}
