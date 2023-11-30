import { response} from "express";
import jwt from "jsonwebtoken";

import Usuario from "../models/usuario.mjs";

const validarJWT = async (req = require, res = response, next) => {
    const token = req.header("x-token");

    if( !token ){
        return res.status(401).json({
            mjs: "No tiene un token"
        })
    };

    try {
        const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Leer el usuario que corresponde el uid
        const usuario = await Usuario.findById( uid );

        //validar que el usuario si exista en la base de datos
        if( !usuario ){
            return res.status(401).json({
                msj: "Token no válido - El usuario no esta en la Base de datos"
            });
        }
        
        // Verificar que el usuario no esta inactivo
        if( !usuario.estado ){
            return res.status(401).json({
                msj: "Token no válido - usuario en estado false"
            });
        };
        
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msj: "No es un token válido"
        })
    }
};


export {
    validarJWT
}