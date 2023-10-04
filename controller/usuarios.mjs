import pkg from "express";
const { Response } = pkg;

const usuariosGET = (req, res = Response) => {
    const { q, nombre, apellido, edad, limite = 1 } = req.query;
    res.json({
        "ok": true,
        "contenido": 'Petición GET - desde el controlador',
        q,
        nombre,
        apellido,
        edad,
        limite
    })
};

const usuariosPOST = (req, res = Response) => {
    const {nombre, apellido, edad} = req.body;
    res.json({
        "ok": true,
        "contenido": 'Petición POST - desde el controlador',
        nombre,
        apellido,
        edad
    })
};

const usuariosPUT = (req, res = Response) => {

    const id = req.params.id;

    res.status(404).json({
        "ok": true,
        "contenido": 'Petición PUT - desde el controlador',
        id
    })
};

const usuariosPATCH = (req, res = Response) => {
    res.json({
        "ok": true,
        "contenido": 'Petición PATCH - desde el controlador'
    })
};


const usuariosDELETE = (req, res = Response) => {
    res.json({
        "ok": true,
        "contenido": 'Petición DELETE - desde el controlador'
    })
};





export {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}