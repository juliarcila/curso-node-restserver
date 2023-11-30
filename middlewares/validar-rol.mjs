import { response } from "express";
import Role from '../models/rol.mjs'

const esAdminRole = (req, res = response, next) => {

    if( !req.usuario ){
        return res.status(500).json({
            msj: "Se quiere validar rol sin antes validar el token"
        })
    };

    const { nombre, rol } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            mjs: `El usuario ${ nombre } no tiene un rol administrador`
        });
    }

    next();
};

const tieneRole = (...roles) => {
    return async (req, res=response, next) => {
        if( !req.usuario ){
            return res.status(500).json({
                msj: "Se quiere validar rol sin antes validar el token"
            })
        };

        // Con esta condición reviso que los roles que estoy poniendo en la ruta si esten en mis roles de la base de datos
        for (const rol of roles) {
            const existeRol = await Role.findOne({ rol });

            if (!existeRol) {
                return res.status(401).json({
                    mjs: `El rol ${rol} no existe en la base de datos`
                });
            }
        }

        if( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                mjs: `El usuario no tiene un rol permitido - requiere uno de estos roles ${ roles }`
            })
        };
        
        next();
    };
};

export {
    esAdminRole,
    tieneRole
};