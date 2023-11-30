import { response } from "express";
import Usuario from "../models/usuario.mjs"

import bcryptjs from 'bcryptjs';
import { generarJWT } from "../helpers/generar-jwt.mjs";


const authPost = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        // Validar que el correo exista
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ){
            return res.status(400).json({
                mjs: "El correo no esta asociado a ningun usuario",
            })
        }

        //Validar que este activo
        if( !usuario.estado ){
            return res.status(400).json({
                msj: "El usuario relacionado al correo no esta activo en la base de datos"
            })
        }

        //Valdiar que la contraseña sea igual a la que tiene

        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validarPassword ){
            return res.status(400).json({
                mjs: "La contraseña no es la correcta amiguito"
            })
        }

        //Generar el token
        const token = await generarJWT( usuario.id );



        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }


   
}


export {
    authPost
}