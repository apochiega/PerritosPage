
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "./ActaUploader.css";


function ActaUploader() {
  const [actaFile, setActaFile] = useState(null);
  const [ubicacion, setUbicacion] = useState('');
  const [tamaño, setTamaño] = useState('');
  const [color, setColor] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [collares, setCollares] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setActaFile(file);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'ubicacion':
        setUbicacion(value);
        break;
      case 'tamaño':
        setTamaño(value);
        break;
      case 'color':
        setColor(value);
        break;
      case 'edad':
        setEdad(value);
        break;
      case 'genero':
        setGenero(value);
        break;
      case 'collares':
        setCollares(value);
        break;
      default:
        break;
    }
  };

  const handleUpload = () => {
    const storageRef = firebase.storage().ref();
    const actaRef = storageRef.child(`actas/${actaFile.name}`);
    const metadata = {
      contentType: actaFile.type
    };

    actaRef
      .put(actaFile, metadata)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((downloadURL) => {
        const perroRef = firebase.database().ref('perros');
        const nuevoPerro = {
          ubicacion: ubicacion,
          tamaño: tamaño,
          color: color,
          edad: edad,
          genero: genero,
          collares: collares,
          actaURL: downloadURL
        };
        perroRef.push(nuevoPerro);

        setActaFile(null);
        setUbicacion('');
        setTamaño('');
        setColor('');
        setEdad('');
        setGenero('');
        setCollares('');

        console.log('¡Acta subida correctamente!');
      })
      .catch((error) => {
        console.error('Error al subir el acta:', error);
      });
  };

  return (
    <div className="acta-uploader-container">
      <h2>Subir Acta</h2>
      <label className="custom-file-input">
  <span>Elegir archivo</span>
  <input type="file" className="file-input" onChange={handleFileChange} />
</label>
      <br />
      <label>Ubicación:</label>
      <select  name="ubicacion" value={ubicacion} onChange={handleInputChange}>
        <option value="">Seleccionar ubicación</option>
        <option value="Ubicación 1">Ubicación 1</option>
        <option value="Ubicación 2">Ubicación 2</option>
        {/* Agregar más opciones según sea necesario */}
      </select>
      <br />
      <label>Tamaño:</label>
      <select  name="tamaño" value={tamaño} onChange={handleInputChange}>
        <option value="" disabled>Seleccionar tamaño</option>
        <option value="Pequeño">Pequeño</option>
        <option value="Mediano">Mediano</option>
        <option value="Grande">Grande</option>
        {/* Agregar más opciones según sea necesario */}
      </select>
      <br />
      <label>Color o marcas distintivas:</label>
      <select  name="color" value={color} onChange={handleInputChange}>
        <option value="" disabled>Seleccionar color</option>
        <option value="Color 1">Color 1</option>
        <option value="Color 2">Color 2</option>
        {/* Agregar más opciones según sea necesario */}
      </select>
      <br />
      <label>Edad aproximada:</label>
      <select  name="edad" value={edad} onChange={handleInputChange}>
        <option value="" disabled>Seleccionar edad</option>
        <option value="Joven">Joven</option>
        <option value="Adulto">Adulto</option>
        <option value="Senior">Senior</option>
        {/* Agregar más opciones según sea necesario */}
      </select>
      <br />
      <label>Género:</label>
      <select  name="genero" value={genero} onChange={handleInputChange}>
        <option value="" disabled>Seleccionar género</option>
        <option value="Macho">Macho</option>
        <option value="Hembra">Hembra</option>
        {/* Agregar más opciones según sea necesario */}
      </select>
      <br />
      <label>Collares o identificación:</label>
      <select  name="collares" value={collares} onChange={handleInputChange}>
        <option value="" disabled>Seleccionar collares</option>
        <option value="Collar 1">Collar 1</option>
        <option value="Collar 2">Collar 2</option>
        {/* Agregar más opciones según sea necesario */}
      </select>
      <br />
      <button onClick={handleUpload}>Subir Acta</button>
    </div>
  );
}

export default ActaUploader;
