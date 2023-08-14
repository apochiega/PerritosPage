// ActaUploader.js
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './ActaUploader.css';

function ActaUploader() {
  const [actaFile, setActaFile] = useState(null);
  const [formData, setFormData] = useState({
    ubicacion: '',
    tamaño: '',
    color: '',
    edad: '',
    genero: '',
    collares: '',
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setActaFile(file);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = () => {
    const storageRef = firebase.storage().ref();
    const actaRef = storageRef.child(`actas/${actaFile.name}`);
    const metadata = {
      contentType: actaFile.type,
    };

    actaRef
      .put(actaFile, metadata)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((downloadURL) => {
        const perroRef = firebase.database().ref('perros');
        const nuevoPerro = {
          ...formData,
          actaURL: downloadURL,
        };
        perroRef.push(nuevoPerro);

        setActaFile(null);
        setFormData({
          ubicacion: '',
          tamaño: '',
          color: '',
          edad: '',
          genero: '',
          collares: '',
        });

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
      {Object.keys(formData).map((key) => (
       <FormControl key={key} className="form-control">
          <InputLabel>
            {key === 'ubicacion' ? 'Ubicación' : key}
            {key === 'tamaño' ? 'Tamaño' : key}
            {key === 'color' ? 'Color o marcas distintivas' : key}
            {key === 'edad' ? 'Edad aproximada' : key}
            {key === 'genero' ? 'Género' : key}
            {key === 'collares' ? 'Collares o identificación' : key}
          </InputLabel>
          <Select
            name={key}
            value={formData[key]}
            onChange={handleInputChange}
            style={{ width: '20rem' }} // Establecer ancho deseado
          >
            <MenuItem value="">
              {key === 'ubicacion'
                ? 'Seleccionar ubicación'
                : `Seleccionar ${key.toLowerCase()}`}
            </MenuItem>
            {/* Map through your options here */}
          </Select>
        </FormControl>
      ))}
      <br />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Subir Acta
      </Button>
    </div>
  );
}

export default ActaUploader;
