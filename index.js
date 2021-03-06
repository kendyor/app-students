//Importar todas las librerias necesarias
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require('path')

const articulosRouter = require("./routes/articulos");

//Determinamos el puerto del EndPoint
const PORT = process.env.PORT || 3000;

const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Alumno APIs - Certus ",
            version: "1.0.0",
            description: "Articulos API"
        },
        servers:[
            {
                url: "http://localhost:" + PORT
            }
        ],
    },
    apis: ["./routes/*.js"],
}
const specs = swaggerJsDoc(options);


//Obtenemos la libreria controlador del Archivo
const FileSync = require("lowdb/adapters/FileSync");

//Creamos el archivo db.json
const adapter = new FileSync("db.json");
const db = low(adapter);
// const db = {articulos: [] };

// Inicializamos la BD
db.defaults( {articulos: [] } ).write();
console.log('Inicializamos la BD');

const app = express(); //Creamos el aplicativo

app.db = db; //Definimos la BD

//Definimos las variables necesarias.
app.use( express.json() );
app.use( morgan("dev") );
app.use(cors());


//
app.use("/articulos", articulosRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs)); // se habilita el endpoint de SwaggerUI

app.listen(PORT, 
    () => console.log(`El servidor esta corriendo en el puerto ${PORT}`));