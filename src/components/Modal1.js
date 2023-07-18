import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "./Button";
import "./Modal1.css";
import "./Button.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

Modal.setAppElement("#root"); // Establece el elemento de la aplicación

const signInWithGoogle = (closeModal) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // Aquí puedes realizar acciones adicionales después del inicio de sesión exitoso
      console.log("Inicio de sesión con Google exitoso", result);
      closeModal(); // Cerrar el modal al iniciar sesión exitosamente
    })
    .catch((error) => {
      // Aquí puedes manejar errores durante el inicio de sesión
      console.log("Error al iniciar sesión con Google", error);
    });
};

const signInWithEmail = (closeModal) => {
  const email = "correo@example.com"; // Reemplaza con el correo electrónico ingresado por el usuario
  const password = "contraseña123"; // Reemplaza con la contraseña ingresada por el usuario
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Aquí puedes realizar acciones adicionales después del inicio de sesión exitoso
      const user = userCredential.user;
      console.log("Inicio de sesión exitoso", user);
      closeModal(); // Cerrar el modal al iniciar sesión exitosamente
    })
    .catch((error) => {
      // Aquí puedes manejar errores durante el inicio de sesión
      console.log("Error al iniciar sesión", error);
    });
};

const signInWithFacebook = (closeModal) => {
  const provider = new FacebookAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // Aquí puedes realizar acciones adicionales después del inicio de sesión exitoso
      console.log("Inicio de sesión con Facebook exitoso", result);
      closeModal(); // Cerrar el modal al iniciar sesión exitosamente
    })
    .catch((error) => {
      // Aquí puedes manejar errores durante el inicio de sesión
      console.log("Error al iniciar sesión con Facebook", error);
    });
};

const signUpWithEmail = (closeModal) => {
  const email = "correo@example.com"; // Reemplaza con el correo electrónico ingresado por el usuario
  const password = "contraseña123"; // Reemplaza con la contraseña ingresada por el usuario
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Aquí puedes realizar acciones adicionales después del registro exitoso
      const user = userCredential.user;
      console.log("Registro exitoso", user);
      closeModal(); // Cerrar el modal al registrarse exitosamente
    })
    .catch((error) => {
      // Aquí puedes manejar errores durante el registro
      console.log("Error al registrarse", error);
    });
};


const Modal1 = ({ isOpen, onRequestClose, closeModal }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Opciones de inicio de sesión"
      className="modal-content"
    >
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" />
        </div>

        {!isSignUp && (
          <div className="form-group">
            <button type="submit" onClick={() => signInWithEmail(closeModal)}>
              Iniciar sesión
            </button>
          </div>
        )}

        {isSignUp && (
          <div className="form-group">
            <button type="submit" onClick={() => signUpWithEmail(closeModal)}>
              Registrarse
            </button>
          </div>
        )}

        <div className="form-group">
          <button type="button" onClick={toggleSignUp}>
            {isSignUp ? "Ya tengo una cuenta" : "Registrarse"}
          </button>
        </div>
      </div>

      <Button buttonStyle="btn--google" onClick={() => signInWithGoogle(closeModal)}>
        Iniciar sesión con Google <FontAwesomeIcon icon={faGoogle} size="xl" />
      </Button>

      <Button buttonStyle="btn--facebook" onClick={() => signInWithFacebook(closeModal)}>
        Iniciar sesión con Facebook <FontAwesomeIcon icon={faFacebook} size="xl" />
      </Button>

      <Button buttonStyle="close--button" onClick={onRequestClose}>
        <FontAwesomeIcon icon={faTimes} />
        Cerrar
      </Button>
    </Modal>
  );
};

export default Modal1;
