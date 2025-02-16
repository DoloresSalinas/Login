import React, {useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
function Home(){
  const navigate = useNavigate();
  const checkTokenExpiration = (token) => {
    try{
      const decode = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if(decode.exp < currentTime){
        return true;
      }else{
        return false;
      }
    }catch(error){
      console.log("Error al decodificar el token: ", error);
      return true;
      // Si no se puede decodificar el token, tratamos como expirado
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && checkTokenExpiration(token)) { 
      Swal.fire({
        icon: "error",
        title: "El token ha expirado.",
        text: "Redirigiendo...",
        timer: 8000,
        showConfirmButton: false,
      }).then(() => { 
        navigate("/");  // Esto ahora se ejecuta después de que SweetAlert cierre
      });
    }
  }, [navigate]);

  return (
    <div className="container">
      <h1>Bienvenido a Home</h1> 
    </div>
  );
}

export default Home;