import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldDog,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "./Navbar.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import Modal1 from "./Modal1";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario ha iniciado sesión
        setLoggedIn(true);
        setUserName(user.displayName);
      } else {
        // El usuario no ha iniciado sesión
        setLoggedIn(false);
        setUserName('');
      }
    });
  }, []);

  window.addEventListener("resize", showButton);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // El usuario ha cerrado sesión
        setLoggedIn(false);
        setUserName('');
      })
      .catch((error) => {
        console.log("Error al cerrar sesión", error);
      });
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <FontAwesomeIcon icon={faShieldDog} className="navbar-logo" />
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            RESCATE CANINO
            <i className="fab fa-typo3" />
          </Link>
          <div className="nav-item nav-user">
            {loggedIn ? (
              <>
                <span className="nav-links2">¡Hola, {userName}!</span>
                <Button buttonStyle="btn--outline" onClick={handleSignOut}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Link className="nav-links-mobile" onClick={openModal}>
                <Button buttonStyle="btn--outline">
                  Iniciar Sesión/Registrarse
                </Button>
              </Link>
            )}
          </div>
          <div className="menu-icon" onClick={handleClick}>
            <FontAwesomeIcon icon={click ? faTimes : faBars} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/busqueda-huellas"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Búsqueda de perritos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/preguntas-frecuentes"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Preguntas frecuentes
              </Link>
            </li>
          </ul>
          {button && !loggedIn && (
            <Link>
              <Button buttonStyle="btn--outline" onClick={openModal}>
                Iniciar Sesión/Registrarse
              </Button>
            </Link>
          )}
        </div>
      </nav>
      <Modal1 isOpen={modalOpen} onRequestClose={closeModal} closeModal={closeModal} />
    </>
  );
}

export default Navbar;
