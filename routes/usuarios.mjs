
import { Router } from "express";
import { usuariosDELETE, usuariosGET, usuariosPATCH, usuariosPOST, usuariosPUT } from "../controller/usuarios.mjs";

const router = Router();


router.get('/', usuariosGET);

router.post('/', usuariosPOST);

router.put('/:id', usuariosPUT);

router.patch('/', usuariosPATCH);

router.delete('/', usuariosDELETE);

export {
    router
};