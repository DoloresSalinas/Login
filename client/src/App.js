import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const App = () => {
  const [sessionData, setSessionData] = useState({username: '', password: ''});
  const navigate = useNavigate();

  const handleSessionDataChange = ({ target }) => {
    const { name, value } = target;
    setSessionData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSaveSessionData = async () => { 
    try { 
      const response = await axios.post("http://localhost:3001/login", sessionData);
      console.log("Respuesta del servidor:", response.data);

      if (response.status === 200) {
        const token = response.data.intDataMessage[0].credentials;
        console.log("Token JWT recibido: ", token);
        Swal.fire({
          icon: "success",
          title: "Iniciar sesión exitosa",
          text: "Redirigiendo...",
          timer: 8000,
          showConfirmButton: false,
        }).then(() => {
          localStorage.setItem("token", token);
          navigate("/Home");  // Esto ahora se ejecuta después de que SweetAlert cierre
        });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      
      // Si la respuesta tiene un mensaje de error
      if (error.response) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message || "Error desconocido",
          confirmButtonText: "Intentar de nuevo"
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor",
          confirmButtonText: "Intentar de nuevo"
        });
      }}
  };

  return (
    <div className='row'>
      <div className="container col-10 mb-3 mt-3">
        <input
          className="form-control-sm"
          type="text"
          name="username"
          onChange={handleSessionDataChange}
          placeholder="Username"
          value={sessionData.username}
          required
        />
      </div>
      <div className="container col-10 mb-3">
        <input
        className="form-control-sm"
          type="password"
          name="password"
          onChange={handleSessionDataChange}
          placeholder="Password"
          value={sessionData.password}
          required
        />
        <div className="container col-12 mb-3">
          <button className="btn btn-warning m-2" onClick={handleSaveSessionData}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
