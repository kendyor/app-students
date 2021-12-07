const express = require("express");
const router = express.Router();
const { nanoid } = require ("nanoid");
const idLength = 8;

/**
 * @swagger
 * components:
 *  schemas:
 *      Articulos:
 *          type: object
 *          required:
 *            - nombre
 *            - precio
 *            - marca
 *            - stock
 *          properties:
 *             id:
 *               type: string
 *               description: ID autogenerado para el articulo
 *             nombre:
 *               type: string
 *               description: El nombre del articulo
 *             precio:
 *               type: decimal
 *               description: El precio del articulo
 *             marca:
 *               type: string
 *               description: La marca del articulo
 *             stock:
 *               type: decimal
 *               description: El stock existente del articulo
 *          example:
 *              id: cf4qaB9IKEN
 *              nombre: Camioneta SUV
 *              precio: 15000.00
 *              marca: Nissan
 *              stock: 1
 */

/**
 * @swagger
 * tags:
 *  name: Articulos
 *  descripcion: API Lista de articulos
 */

/**
 * @swagger
 * tags:
 *  name: Articulo
 *  descripcion: API para crear Articulo
 */

/**
 * @swagger
 * /articulos:
 *   get:
 *     summary: Devuelve la lista de articulos
 *     tags: [Articulos]
 *     responses:
 *       200:
 *         description: Lista de los artículos
 *         content:
 *           application/json:
 *               schema: 
 *                   type: array
 *                   items:
 *                       $ref: '#/components/schemas/Articulos'
 */

/**
 * @swagger
 * /articulos:
 *   post:
 *     summary: Crea el articulo
 *     tags: [Articulo]
 *     responses:
 *       200:
 *         description: Crear articulo
 *         content:
 *           application/json:
 *               schema: 
 *                   type: object
 */

//Obtener la lista de articulos
const articulos = [];
router.get("/", (request, response) =>{
    // const articulos = request.app.db.get("articulos");


    response.send(articulos);
});

//obtener un articulo desde la ID
router.get("/:id", (req, resp) => {
    // const articulo = req.app.db.get("articulos")
                    // .find({id: req.params.id }).value();
    const articulo = articulos.find({id: req.params.id }).value();

    if(!articulo){
        resp.sendStatus(404);
    }
    resp.send(articulo);
});

//Crear un nuevo articulo
router.post("/", (peticion, responde) => {
    try{
        const articulo = {
            id: nanoid(idLength),
            ...peticion.body,
        };

        // peticion.app.db.get("articulos").push(articulo).write();
        responde.send(articulo);

    }catch( error ){
        return responde.status(500).send(error);
    }
});

module.exports = router;
