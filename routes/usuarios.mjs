
import { Router } from "express";
import { usuariosDELETE, usuariosGET, usuariosPATCH, usuariosPOST, usuariosPUT } from "../controller/usuarios.mjs";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.mjs";
import  {esRoleValido, correoExistente, existeUsuarioPorId} from "../helpers/bd-validaciones.mjs";


const router = Router();


router.get('/', [
    check('limite', 'No es un número').optional().isNumeric(),
    check('desde','No es un número').optional().isNumeric(),
    validarCampos
],usuariosGET);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo').custom( correoExistente ),
    check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
    //check('rol', 'El rol no es el correcto').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    check('correo', 'El correo no es válido').isEmail(),
    validarCampos
] ,usuariosPOST);

router.put('/:id',[
    check('id',`No es un ID válido`).isMongoId(), //Esta validación solo nos dice si es un id de mongo válido
    check('id').custom(existeUsuarioPorId),
    check('rol').optional().custom( esRoleValido ),
    check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
] ,usuariosPUT);

router.patch('/', usuariosPATCH);

router.delete('/:id',[
    check('id',`No es un ID válido`).isMongoId(), //Esta validación solo nos dice si es un id de mongo válido
    check('id').custom(existeUsuarioPorId),
    validarCampos
] ,usuariosDELETE);

export {
    router
};