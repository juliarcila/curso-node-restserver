import Role from '../models/rol.mjs';
import Usuario from "../models/usuario.mjs";


const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${ rol } no existe en la base de datos`);
    }
}


//Verificar si el correo existe
const correoExistente = async( correo ) => {
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo ){
        throw new Error(`El correo ${correo} ya esta asociado a un usuario`);
    };
}

//Verificar si el id existe
const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id ${id} no existe en la BD`);
    };
}


export  {
    esRoleValido,
    correoExistente,
    existeUsuarioPorId
}