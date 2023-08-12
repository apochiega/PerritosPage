import React, { useState } from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import ActaUploader from "./ActaUploader";

import { Link } from "react-router-dom";

export default function HeroSection() {
  const [showUploader, setShowUploader] = useState(false);

  const handleCompartirClick = () => {
    setShowUploader((prevShowUploader) => !prevShowUploader);
  };

  return (
    <div className="hero-container">
      
      <h1>¿QUÉ BUSCAS?</h1>
      <p>   </p>
      <div className="hero btns">
      <Link to="/acta-uploader">
  <Button
    className="btns"
    buttonStyle="btn--outline"
    buttonSize="btn--large"
    onClick={handleCompartirClick}
  >
    COMPARTIR <FontAwesomeIcon icon={faUpRightFromSquare} />
  </Button>
</Link>
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          {" "}
          BUSCAR <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </div>

      {showUploader && <ActaUploader />}
    </div>
  );
}
