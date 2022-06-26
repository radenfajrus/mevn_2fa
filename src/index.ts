
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import { isProduction } from './config';


// INIT LOGGER
import pino from "pino"
const levels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60
};
const logger = pino({
  customLevels: levels,
  useOnlyCustomLevels: true,
  level: "info"
});


// INIT CONFIG
require('dotenv').config()
import * as cfg from "./config"
console.log(cfg.AuthGoogleConfig.CLIENT_ID)


// INIT APP
var app = express();


// INIT MIDDLEWARE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(compression())
app.use(morgan('combined'))


// INIT INFRA
import { GAuthClient } from './infra/api/gauth';
const gauth   = new GAuthClient(cfg.AuthGoogleConfig,logger)



// INIT REPO
const repos = {}


// INIT SERVICE
import { GAuthApiService } from './app/api/gauth';
const services = {
    GAuthApiService : new GAuthApiService(gauth),
}


// INIT HANDLER
import { AuthController } from './app/auth/controller';
const controllers = {
    AuthController : new AuthController(services,repos),
}



// // EXCEPTION HANDLER
// import { AppError } from './abstract/AppError';
// async function exceptionHandler (req: express.Request, res: express.Response, next: any): Promise<void> {
//   try {
//     await next(req,res)
//   } catch (err) {
//     console.log(err)
//     if( err instanceof AppError){
//       res.type('application/json').status(200).json({ status: false, code : "AppError" , message : "Something Wrong, but its okay" })
//     }else{
//       res.type('application/json').status(500).json({ status: false, code : "InternalServerError" , message : "Something Wrong, please contact administrator" })
//     }
//   }
// }

// INIT ROUTER
import Router from './api';
const apiRouter = new Router(controllers)
app.use('/api', apiRouter.router)

app.get('/', (req, res) => {
  return res.json({ message: "Yo!" });
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`)
})