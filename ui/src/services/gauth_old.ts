import { reactive, readonly } from "vue";
import 'https://apis.google.com/js/platform.js';


export interface gAuthInterface{
    client: Auth,
    isInit: Boolean,
    isAuthorized: Boolean,
    access_token: String,
}
var gAuth = reactive({
  client: null,
  isInit: false,
  isAuthorized: false,
  access_token: "",
})

let defaultConfig = {
    clientId: null,
    scope: "profile email",
    prompt: 'select_account',
}


let addHeadScript = () => {
    const url = 'https://accounts.google.com/gsi/client';
    return new Promise<void>((resolve) => {
        let script: any  = document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        script.addEventListener('readystatechange', e => {
            if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                setTimeout(function () {
                    resolve()
                }, 200)
            }
        });
        script.onload = function (e) {
            if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                setTimeout(function () {
                    resolve()
                }, 200)
            }
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

class Auth {
    config: any;
    gapiAuthInstance: any;
    error: any;
    constructor(config) {
        this.config = config
    }

    initClient = () => {
        return new Promise<void>((resolve, reject) => {
        //   if (!this.gapiAuthInstance) {
        //     reject(this)
        //     return
        //   }else{
            resolve()
        //   }
        })
    }
    signIn = () => {
        return new Promise((resolve, reject) => {
          if (!this.gapiAuthInstance) {
            reject(false)
            return
          }
          if (this.error) {
            reject(false)
            return
          }
          this.gapiAuthInstance.signIn()
            .then(googleUser => {
                gAuth.isAuthorized = this.gapiAuthInstance.isSignedIn.get();
                resolve(googleUser);
            })
            .catch(error => {
                reject(error);
            })
        })
    };
  
    getAuthCode = () => {
        return new Promise((resolve, reject) => {
            if (!this.gapiAuthInstance) {
                reject(false)
                return
            }
            if (this.error) {
              reject(false)
              return
            }
            this.gapiAuthInstance.grantOfflineAccess({ prompt: this.config.prompt })
                .then(function (resp) {
                    resolve(resp.code)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    };
  
    signOut = () => {
        return new Promise((resolve, reject) => {
          if (!this.gapiAuthInstance) {
            reject(false)
            return
          }
          if (this.error) {
            reject(false)
            return
          }
          this.gapiAuthInstance.signOut()
            .then(() => {
                gAuth.isAuthorized = false;
                resolve(true)
            })
            .catch(error => {
                reject(error)
            })
        })
    };
}

var authInstance:any = null;
const gauthFactory = (function (config) {
    if(authInstance instanceof Auth) return authInstance

    let initClient = (config) => {
        return new Promise((resolve, reject) => {
            (window as any).gapi.load('auth2', () => {
                (window as any).gapi.auth2.init(config)
                .then(() => {
                    resolve((window as any).gapi);
                }).catch((error) => {
                    reject(error);
                })
            })
        })
    }
    authInstance = new Auth(config)
    
    addHeadMeta(config.scope,config.clientId).then(() => {
        return addHeadScript()
    }).then(()=>{
        return initClient(config)
    }).then((gapi: any) => {
        authInstance.gapiAuthInstance = gapi.auth2.getAuthInstance();
        console.log(authInstance.gapiAuthInstance)

        gAuth.client = gapi.auth2.getAuthInstance();
        gAuth.isInit = true;
        gAuth.isAuthorized = authInstance.isSignedIn.get();
    }).catch((error) => {
        authInstance.error = error.error;
        console.error(error);
    })
    return authInstance
})
  
export default {
    install: (app, options) => {
        if (!(typeof options === 'object')) throw new TypeError('invalid option type. Object type accepted only');
        if (!options.clientId) throw new Error('clientId is required');

        let config = Object.assign(defaultConfig, options);

        //Install Vue plugin
        gauthFactory(config).initClient().then(()=>{
            app.config.globalProperties.$gAuth = gAuth;
            app.provide('gAuth', readonly(gAuth));
        }).catch(e => {
            throw new Error(e);
        })
  
    }
}

