import express from 'express'
import cors from 'cors'

import { router } from '../routes/usuarios.mjs';
import { dbConection } from '../database/config.mjs';
import { routerAuth } from '../routes/auth.mjs';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.pathAuth = '/api/auth'

        //Midelwares
        this.midelware();

        //Conexión a la base de datos
        this.conectionDB();

        // Rutas de mi aplicación
        this.routes();
    }

    routes(){
        this.app.use( this.pathAuth, routerAuth );
        this.app.use( this.usuariosPath, router );
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Esta escuchando por el puerto ${ this.port }`);
        })
    }

    async conectionDB(){
        await dbConection();
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