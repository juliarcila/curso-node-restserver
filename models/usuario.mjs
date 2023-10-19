import { Schema, model } from "mongoose";

const usuarioSchema =  Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'la contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})


//Esto lo hacemos para obtener los datos de nuestra base de datos y retornar solo lo que necesitamos
usuarioSchema.methods.toJSON = function(){
    const {password, ...usuario} = this.toObject();

    return usuario;
}

export default model('Usuario', usuarioSchema);