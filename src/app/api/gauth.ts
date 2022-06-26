
import axios, { AxiosResponse } from 'axios';
import { GAuthClient } from "../../infra/api/gauth";

export class GAuthApiService {
    private c: GAuthClient;
    private log: any;

    constructor (c: GAuthClient) {
        this.c = c
    }

    public getTokenFromCode = async (code) => { 
        // this.c.isOk()

        try{
            let res = await axios.post("https://accounts.google.com/o/oauth2/token",
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                response_type: 'token',
                client_id: this.c.config.CLIENT_ID,
                client_secret: this.c.config.CLIENT_KEY,
                redirect_uri: "postmessage"
            }),
            {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                } 
            });
            return (res.status == 200)?res.data:null;
        }
        catch(error: any) { 
            return error.response.data;
        }
    }
}