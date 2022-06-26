
import express from 'express';

import { GAuthApiService } from './../api/gauth';
import { BaseController } from "../../abstract/BaseController";




export class AuthController extends BaseController {
    private GAuthApi: GAuthApiService;

    constructor (s: any, r: any) {
      super(AuthController);
      this.GAuthApi = s.GAuthApiService
    }

    async CallbackGauth(req: express.Request, res: express.Response, next: any): Promise<any> {
      let code = decodeURIComponent(req.query.code)
      if(!code) return this.failInput(res, "Please input param code")

      let token = await this.GAuthApi.getTokenFromCode(code)
      if(token && token.hasOwnProperty("access_token")){
        return this.ok(res,{
            access_token : token.access_token,
            scope : token.scope,
            expires_in : token.expires_in,
        })
      }
      return this.fail(res,token.error)
    }

    async RefreshToken(req: express.Request, res: express.Response, next: any): Promise<any> {

        let response = {
            "position" : "result"
        }
  
        return this.ok(res,response)
    }
    async ValidateOTP(req: express.Request, res: express.Response, next: any): Promise<any> {

        let response = {
            "position" : "result"
        }
  
        return this.ok(res,response)
    }
    async Logout(req: express.Request, res: express.Response, next: any): Promise<any> {

        let response = {
            "position" : "result"
        }
  
        return this.ok(res,response)
    }
        
}

