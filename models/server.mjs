import express from 'express'
import cors from 'cors'

import { router } from '../routes/usuarios.mjs';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usuariosPath = '/api/usuarios';

        //Midelwares
        this.midelware();

        // Rutas de mi aplicación
        this.routes();
    }

    routes(){
        this.app.use( this.usuariosPath, router );
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Esta escuchando por el puerto ${ this.port }`);
        })
    }

    midelware(){

        //CORS
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use( express.json() );

        //Directorio público
        this.app.use( express.static('public') );
    }
}

export { Server }
