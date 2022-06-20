
import { reactive } from "vue";

export interface AuthInterface{
    client: AuthClientInterface | null,
    isInit: Boolean,
}
export var auth: AuthInterface = reactive({
  client: null,
  isInit: false,
})

export interface AuthClientInterface{
    initClient();
    signIn(redirect_uri);
    signOut();
    refresh();
}