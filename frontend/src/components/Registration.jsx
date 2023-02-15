import AuthForm from "./AuthForm";

export default function Registration(props) {
  return (
    <>
      <AuthForm
        isRegistration={true}
        buttonText="Зарегистрироваться"
        legend="Регистрация"
        onRegister={props.onRegister}
      />
    </>
  );
}
