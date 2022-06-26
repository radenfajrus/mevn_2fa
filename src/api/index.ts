
import express from 'express'
import { AuthController } from '../app/auth/controller';


export default class Routes {
 
    router: any;
    c: any;
    
    // Exception Handler
    execute = async (req: express.Request, res: express.Response, next: any) => {
        try {
            await next(req,res)
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: false,
                code: "InternalServerError",
                message: "Internal Server Error"
            })
        }
    }

    constructor (c: any, execute?: any ) {
        if(execute!==undefined){
            this.execute = execute
        }

        this.c = c;
        this.router = express.Router();

        // Auth
        let authController: AuthController = this.c.AuthController;
        this.router.get('/oauth/callback-gauth', (req,res) => this.execute(req,res,authController.CallbackGauth))
        this.router.get('/oauth/refresh', (req,res) => this.execute(req,res,authController.RefreshToken))
        this.router.post('/auth/validate-otp', (req,res) => this.execute(req,res,authController.ValidateOTP))
        this.router.get('/auth/logout', (req,res) => this.execute(req,res,authController.Logout))

    }
}
