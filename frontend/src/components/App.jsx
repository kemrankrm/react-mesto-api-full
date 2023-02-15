import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../utils/utils.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import Login from "./Login.jsx";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Registration from "./Registration.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import auth, { getContent } from "../utils/auth.js";
import HeaderMenu from "./HeaderMenu.jsx";
import InfoTooltip from "./InfoTooltip.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentEmail, setCurrentEmail] = useState(null);
  const history = useHistory();

  //CARDS SETUP
  const [cards, setCards] = useState([]);
  const [cardData, setCardData] = useState({
    name: "",
    link: "",
  });

  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    src: "",
    title: "",
  });

  // Modal States
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvaterPopupOpen, setIsEditAvaterPopupOpen] = useState(false);
  const [isTooltipModalOpen, setIsTooptipModalOpen] = useState(false);

  //Loggedin State
  const [loggedIn, setLoggedIn] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);

  // URL Location
  const location = useLocation();

  // Token Check
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentEmail(res.email);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [currentEmail]);

  //Initial Info Setup
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserData()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));

      api
        .getInitialCards()
        .then((res) => setCards(res))
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  //Card Removing Fucntion
  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then((res) => {
        setCards(
          cards.filter((item) => {
            return item._id !== card._id;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  //Card Liking/Disliking Function
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    (!isLiked ? api.putLike(card._id) : api.removeLike(card._id))
      .then((res) => {
        setCards(
          cards.map((item) => {
            return item._id === card._id ? res : item;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  //Card Addition Function
  const handleAddPlaceSubmit = (cardData) => {
    api
      .postNewCard(cardData)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        setCardData({ name: "", link: "" });
      })
      .catch((err) => console.log(err));
  };

  //Avatar Editing Function
  const handleEditAvatarClick = () => {
    setIsEditAvaterPopupOpen(true);
  };

  //Profile Editing Function
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  //Add Place Click Handler
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  //Card Click Handler
  const handleCardClick = (src, name) => {
    setSelectedCard({ isOpen: true, src: src, title: name });
  };

  //Popups Closing Function
  const closeAllPopups = () => {
    setIsEditAvaterPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooptipModalOpen(false);

    setSelectedCard({ isOpen: false, src: "", alt: "" });
  };

  //Edit Form Submission Function
  const handleEditProfileFormSubmit = (data) => {
    api
      .postUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  //Avatar Submission Handler
  const handleEditAvatarSubmit = (data, inputRef) => {
    api
      .upploadAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        inputRef.current.value = "";
      })
      .catch((err) => console.log(err));
  };

  //Register Function Handler
  const handleRegister = (userData) => {
    auth(userData, "signup")
      .then((res) => {
        if (res) {
          setAuthStatus("success");
          setIsTooptipModalOpen(true);
          history.push("/sign-in");
        } else throw new Error(res)
      })
      .catch((e) => {
        setAuthStatus("fail");
        setIsTooptipModalOpen(true);
        console.log(e)
      });
  };

  //Login Function Handler
  const handleLogin = (userData) => {
    auth(userData, "signin")
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setCurrentEmail(userData.email);
          history.push("/");
        }
      })
      .catch((e) => {
        setAuthStatus("fail");
        setIsTooptipModalOpen(true);
        console.log(e)
      });
  };

  // Logout Handler
  const handleLogoutClick = () => {
    localStorage.removeItem("jwt");
    if (!localStorage.getItem("jwt")) {
      setLoggedIn(false);
      setCurrentEmail(null);
    }
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header>
          <HeaderMenu
            location={location}
            userEmail={currentEmail}
            onLogout={handleLogoutClick}
          />
        </Header>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleEditProfileFormSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvaterPopupOpen}
          onClose={closeAllPopups}
          onUploadAvatar={handleEditAvatarSubmit}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          cardData={cardData}
          onSetCardData={setCardData}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          status={authStatus}
          onClose={closeAllPopups}
          isOpen={isTooltipModalOpen}
        />

        <Switch>
          <Route exact path="/">
            {loggedIn ? (
              <ProtectedRoute
                component={Main}
                exact
                path="/"
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvater={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
              />
            ) : (
              <Redirect to="sign-in" />
            )}
          </Route>

          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Registration onRegister={handleRegister} />
          </Route>
        </Switch>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
