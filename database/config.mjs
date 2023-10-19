import mongoose from "mongoose";

const dbConection = async () => {
    
    try {
        await mongoose.connect(process.env.MONGODB);

        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo conectar a la base de datos');
    }
};

export {
    dbConection
}