
## Preparation
nodejs >= 12.2.0  
npm    >= 6.x  

## start project
npm install -g vite  
npm init @vitejs/app ui  
 - vue  
 - vue-ts  

## basic library (@next -> vue v3)
<code>
<pre>
npm i --save vuex@next vue-router@next vue-class-component@next   
npm i --save bootstrap bootstrap-vue-3  
npm i --save axios  
  
npm i --save-dev @types/node  
npm i -D sass-loader node-sass sass
</pre>
</code>


## Set root folder alias
vite.config.js  
  
<code>
<pre>
import { defineConfig } from 'vite'  
import vue from '@vitejs/plugin-vue'  
import * as path from 'path'   
//  
// https://vitejs.dev/config/
export default defineConfig({  
  plugins: [vue()],  
  resolve: {  
    alias: {  
      '@': path.resolve(__dirname, './src'),  
    },  
  }  
})
</pre>
</code>
  

## Set Env
Dummy : Run in local, only frontend functionality, use dummy data  
Dev   : Run in local, use API  
Prod  : Run in production  
  
vite.config.js  
<code>
<pre>
export default defineConfig({  
  ...  
  define: {  
    'process.env': {  
      BASE_URL: 'http://localhost:3000',  
      ENV: 'dummy'  
    }  
  }  
})
</pre>
</code>

## Set Nodemon
npm install -g nodemon  
nodemon.json  
<code>
<pre>
{  
  "watch": ["src", "bin",  "test", "scripts"],  
  "ext": ".ts,.js,.pug,.css",  
  "ignore": [],  
  "exec": "ts-node ./src/index.js"  
}  
</pre>
</code>


## Set script run server 
package.json  

<code>
<pre>
{  

}  
</pre>
</code>


# frontend
## Folder Structure  

/assets  
-- /css  
-- /js   
-- /images   
/components    : list component  
-- /pages     : component per pages  
/composables  : shared state  
/layouts  : layout of pages  
/services  : api or external dependency  
/toast  : global component (toast)  
/views  : pages 
App.vue  
env.d.ts : env model  
main.ts   
router.ts  : router function (vue-router)  
routes.ts  : list route in json   
  

## RUN Vite 
cd ui 
vite