import headerLogo from "../images/headerLogo.svg";

function Header(props) {

  return (
    <header className="header">
      <img src={headerLogo} className="header__logo" alt="логотип" />
      <nav className="header__info-tooltip">
        {
          props.children
        }  
      </nav>
    </header>
  );
}

export default Header;