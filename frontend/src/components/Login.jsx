import AuthForm from "./AuthForm";

export default function Login(props) {
  return (
    <>
      <AuthForm
        isRegistration={false}
        buttonText="Войти"
        legend="Вход"
        onLogin={props.onLogin}
      />
    </>
  );
}
