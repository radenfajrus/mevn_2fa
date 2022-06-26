
// import axios from "axios";
import path from "path";
// import { BaseCircuitBreaker } from "../../abstract/BaseCircuitBreaker";

export interface IAuthGoogleConfig {
    CLIENT_ID: string;
    CLIENT_KEY: string;
}

// export class EnvisionsApiClient extends BaseCircuitBreaker{
export class GAuthClient {
    public config: IAuthGoogleConfig;
    private log: any;
    public url: any;
    public authHeader: any;

    constructor (config: IAuthGoogleConfig,logger: any) {
        // super()

        this.config = config;
        this.log = logger.child({ class: path.basename(this.constructor.name)  });
    }

    public reconnect = async () : Promise<boolean> => { 
        return true
    }
    public isConnected = async () : Promise<boolean> => { 
        return this.connect()
    }
    public connect = async () : Promise<boolean> => { 
        // let isConnected = false; 
        // try{
        //     let res = await axios.get(`${this.url}/health`)
        //     isConnected = (res.status===200)
        // }
        // catch(error){
        //     this.log.error(error);
        // }
        // return isConnected
        return true
    }

}

