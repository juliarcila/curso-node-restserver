import { Router, response } from "express";
import { check } from "express-validator";
import { authPost } from "../controller/auth.mjs";
import { validarCampos } from "../middlewares/validar-campos.mjs";

const routerAuth = Router();


routerAuth.post('/login',[
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,authPost);


export {
    routerAuth
}