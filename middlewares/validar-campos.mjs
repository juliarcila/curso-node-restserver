import { validationResult } from "express-validator";

const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    //Esta es una funcion del middleware que se ejecuta para continuar con la siguiente operación.
    next()
};

export {
    validarCampos
}