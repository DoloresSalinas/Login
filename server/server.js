const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jwt-simple'); 

//Es para habiliar los CORS para todas las solicitudes
app.use(cors());
//Middleware para manejar peticiones JSON
app.use(express.json());

//Ruta 
app.get('/', (req, res) => {
    res.send('¡Servidor en funcionamiento!');
});
const secretKey = 'L4t1n$M4f14';
const users = [
    {username:"emili4", password:"L4cr0nt3"},
    {username:"reach3l", password:"M0rg4n&$"}
];

//Ruta de login
app.post('/login', (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({
            statusCode: 400,
            message: "Usuario y conrtraseña son requerdidos"
        });
    }
    //Buscar usuario en la lista de arriba
    const user = users.find(u => u.username === username && u.password === password);

    if(!user){
        return res.status(401).json({
            statusCode: 401,
            message: "Credenciales incorrectas."
        });
    }
    
    const payload = {
        username: user.username,
        exp: Math.floor(Date.now() / 1000) + 300
    } 
    const token = jwt.encode(payload, secretKey);
    
    return res.status(200).json({
        statusCode: 200,
        intDataMessage: [
            {
                credentials: token
            }
        ]
    });
    
});

app.listen(3001, () => {
    console.log('Servidor escuchando en el puerto 3001');
});