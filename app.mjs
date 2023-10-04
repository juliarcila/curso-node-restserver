import dotenv from 'dotenv'
import { Server } from "./models/server.mjs"

dotenv.config({path:'./.env'});

const server = new Server();

server.listen();




  
