import { callbackify } from "util";
import { reactive, readonly } from "vue";

export interface AuthInterface{
    client: AuthClientInterface,
    isInit: Boolean,
}
export var gAuth: AuthInterface = reactive({
  client: null!,
  isInit: false,
})

export interface AuthClientInterface{
    initClient();
    signIn(redirect_uri,callback);
    signOut();
    refresh();
    getAccessToken(code);
    getUserProfile(access_token, userModel);
}

let defaultConfig = {
    client_id: null,
    scope: 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/contacts.readonly',
    prompt: 'select_account',
    ux_mode: 'popup',
}

let addHeadScript = () => {
    const url = 'https://accounts.google.com/gsi/client';
    return new Promise<void>((resolve) => {
        let script: any  = document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        script.onload = function (e) {
            setTimeout(function () {
                resolve()
            }, 200)
        }
        document.getElementsByTagName('head')[0].appendChild(script);
    })
}
let addHeadMeta = (scope,client_id) => {
    return new Promise<void>((resolve) => {
        let meta1  = document.createElement('meta')
        let meta2  = document.createElement('meta')
        meta1.name = "google-signin-scope"
        meta2.name = "google-signin-client_id"
        meta1.content = scope
        meta2.content = client_id
        document.getElementsByTagName('head')[0].appendChild(meta1);
        document.getElementsByTagName('head')[0].appendChild(meta2);
        resolve();
    })
}

class Auth implements AuthClientInterface{
    config: any;
    error: any;
    access_token: string;
    refresh_token: string;
    id_token: string;
    oauth2Endpoint: string;
    client: any;
    constructor(config) {
        this.config = config
        this.access_token = "";
        this.refresh_token = "";
        this.id_token = "";
        this.oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    }

    initClient = () => {       
        return addHeadMeta(this.config.scope,this.config.clientId).then(()=>{
            return addHeadScript()
        })
    }
    signIn = (redirect_uri,callback) =>{
        if(this.config.ux_mode=="popup"){
            this.client = this.signInPopUp(redirect_uri,callback)
        }else{
            this.client = this.signInRedirect(redirect_uri)
        }
        this.client.requestCode()
    };
    signInPopUp = (redirect_uri,callback) => {
        return (window as any).google.accounts.oauth2.initCodeClient({
            client_id: this.config.client_id,
            scope: this.config.scope,
            ux_mode: 'popup',
            callback: callback,
            // callback: (response) => {
            //     let self = this
            //     // response :
            //     // authuser: "0"
            //     // code: "4/0AX4XfWjpBceqH9N6tN-K65AYQmvMZnqWwAD3oNP95-pbwIOXdi47s1E9t-2YhLfHTT0I6A"
            //     // prompt: "consent"
            //     // scope: "email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid"

            //     const xhr = new XMLHttpRequest();
            //     xhr.open('POST', "https://accounts.google.com/o/oauth2/token", true);
            //     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            //     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            //     xhr.onload = function() {
            //         let response = xhr.response;
            //         response = JSON.parse(response);
            //         console.log(response)
            //         global_auth.access_token = response.access_token
            //         global_auth.isAuthorized = true
            //     };
            //     xhr.send(
            //         'grant_type=authorization_code'
            //         +'&code=' + response.code
            //         +'&response_type=token'
            //         +'&client_id='+this.config.client_id
            //         +'&client_secret='+import.meta.env.VITE_GAUTH_CLIENT_SECRET
            //         +'&redirect_uri=postmessage'
            //     );
            // },
        });
    }
    signInRedirect = (redirect_uri) => {
        return (window as any).google.accounts.oauth2.initCodeClient({
            client_id: this.config.client_id,
            scope: this.config.scope,
            ux_mode: 'redirect',
            redirect_uri: redirect_uri,
        });
    }
    isAuthorized = () => { 
        return false
    }
    signOut = () => {    }
    refresh = () => {    }
    getAccessToken = async (code) => {   
        if(!import.meta.env.VITE_GAUTH_CLIENT_SECRET){
            console.error("No Env Client Secret Provided : GAUTH_CLIENT_SECRET")
            return null
        }
        let res =  await fetch("https://accounts.google.com/o/oauth2/token",
        {
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                response_type: 'token',
                client_id: this.config.client_id,
                client_secret: import.meta.env.VITE_GAUTH_CLIENT_SECRET,
                redirect_uri: 'postmessage'
            })
        });

        return (res.status == 200)?await res.json():null;
    }
    getUserProfile = async (access_token, userModel) => {   
        let fields = "personFields="+Object.keys(userModel).join(",")
        let res = await fetch("https://people.googleapis.com/v1/people/me?"+fields,
        {
            method: "GET",
            headers: {
              Authorization: "Bearer "+access_token
            }
         });

        let res_data = (res.status == 200)?await res.json():{};
        let userData = userModel;
        Object.keys(userModel).forEach(key => {
            userData[key] = res_data[key]
        });
        return userData
    }
}

  
export default {
    install: (app, options) => {
        if (!(typeof options === 'object')) throw new TypeError('invalid option type. Object type accepted only');
        if (!options.client_id) throw new Error('clientId is required');

        let config = Object.assign(defaultConfig, options);

        //Install Vue plugin
        let client: Auth = new Auth(config)

        client.initClient().then(()=>{
            gAuth.client = client;
        })

        app.config.globalProperties.$gAuth = gAuth;
        app.provide('gAuth', readonly(gAuth));
  
    }
}

