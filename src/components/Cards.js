import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
  return (
    <div className="cards">
      <h1>Información</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/perrotelefono.jpg"
              text="Contactanos"
              label="Contacto"
              path="/contacto"
            />
            <CardItem
              src="images/refugio.jpg"
              text="¿Quienes somos?"
              label="Sobre nosotros"
              path="/quienes-somos"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards