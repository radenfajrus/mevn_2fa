
const isProduction = process.env.production === "true";

import {IAuthGoogleConfig} from "../infra/api/gauth";
const AuthGoogleConfig: IAuthGoogleConfig = {
  CLIENT_ID: process.env.GAUTH_CLIENT_ID || "",
  CLIENT_KEY: process.env.GAUTH_CLIENT_KEY || "",
};


export {
  isProduction,
  AuthGoogleConfig,
}