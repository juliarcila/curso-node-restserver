import pkg from "express";
import bcryptjs from 'bcryptjs';

import Usuario from "../models/usuario.mjs";
import { esRoleValido } from "../helpers/bd-validaciones.mjs";

const { Response } = pkg;

const usuariosGET = async (req, res = Response) => {
    // const { q, nombre, apellido, edad, limite = 1 } = req.query;
    const { limite = 3, desde = 0 } = req.query;

    // const usuarios = await Usuario.find({ estado: true })
    //     .limit( Number(limite) )
    //     .skip( Number(desde) );
    
    // const total = await Usuario.count({ estado: true });

    //Con este Promise.all se interactuan con muchas promesas y todas se pueden ejecutar el tiempo. Lo que hace que disminuya el tiempo de ejecución.
    const [total, usuarios] = await Promise.all([
        Usuario.count({ estado: true }),
        Usuario.find({ estado: true })
        .limit( Number(limite) )
        .skip( Number(desde) )
    ])

    

    res.json({
        total,
        usuarios
    })
};

const usuariosPOST = async(req, res = Response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña con el paquete bcryptjs
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    usuario.save();
    res.json({
        usuario
    })
};

const usuariosPUT = async (req, res = Response) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    // console.log(resto);

    //TODO validar contra base de datos
    if( password ){
        //Encriptar la contraseña con el paquete bcryptjs
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto, {new: true} );


    res.json({
        "ok": true,
        "contenido": 'Petición PUT - desde el controlador',
        usuario
    })
};

const usuariosPATCH = (req, res = Response) => {
    res.json({
        "ok": true,
        "contenido": 'Petición PATCH - desde el controlador'
    })
};


const usuariosDELETE = async (req, res = Response) => {

    const { id } = req.params;

    //Esto borra fisicamente de la base de datos el usuario
    // const usuario = await Usuario.findByIdAndDelete( id );

    //Esto inactiva el usuario
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario
    })
};





export {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}