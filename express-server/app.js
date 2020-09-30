// var express = require("express");
// var app = express();
// app.use(express.json());
// app.listen(3000, () => console.log("server is running on port 3000"));

// app.get("/url", (req, res, next) => res.json(["Paris", "Barcelona", "Barranquilla", "Montevideo", "Santiago de Chile", "Buenos Aires", "New York", "Madrid", "La Plata"]));

// var misDestinos = [];
// app.get("/my", (req, res, next) => res.json(misDestinos));
// app.post("/my", (req, res, next) => {
//     console.log(req.body);
//     misDestinos = req.body;
//     res.json(misDestinos);
// });

var express = require("express"),
    cors = require('cors');
var app = express();
app.use(express.json()); //configurar express para que use json
app.use(cors()); //configurar el uso de servicio crossorigin
app.listen(3000, () => console.log("Server running on port 3000")); //configurar el servidor para que escuche peticiones por el puerto 3000


//listado de sugerencias de nombres para obras de teatros
var obras = [
    "Esperando la carroza",
    "El secreto de sus ojos",
    "Don Juan Tenorio",
    "La Casa de Bernarda Alba",
    "Hamlet",
    "Romeo y Julieta",
    "La Divina Comedia",
    "El Fantasma de la Ópera",
    "La vida es sueño",
    "Sueño de una noche de verano",
    "Fuenteovejuna",
    "La Celestina"
];

//servicio para realizar sugerencias mediante filtrado de lista preestablecida en el .js (la lista obras)
app.get("/obras", (req, res, next) => res.json(obras.filter((c) => c.toLowerCase().indexOf(req.query.q.toString().toLowerCase()) > -1)));

var misDestinos = []; //variable que almacena las obras de teatro

//servicio para consultar contenido 
app.get("/my", (req, res, next) => res.json(misDestinos));

//servicio para almacenar mis obras de teatro
app.post("/my", (req, res, next) => {
    console.log(req.body);
    misDestinos.push(req.body.nuevo);
    res.json(misDestinos);
});


//nuevo servicio para traduccion
app.get("/api/translation", (req, res, next) => res.json([
    { lang: req.query.lang, key: 'HOLA', value: 'HOLA ' + req.query.lang }
]));