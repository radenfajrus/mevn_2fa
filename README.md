
## Preparation
nodejs >= 12.2.0
npm    >= 6.x

# start project
npm install -g vite
npm init @vitejs/app ui
 - vue
 - vue-ts

# basic library (@next -> vue v3)
npm i --save vuex@next vue-router@next vue-class-component@next 
npm i --save bootstrap bootstrap-vue-3
npm i --save axios

npm i --save-dev @types/node
npm i -D sass-loader node-sass sass


# Set root folder alias
vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})


# Set Env
Dummy : Run in local, only frontend functionality, use dummy data
Dev   : Run in local, use API
Prod  : Run in production

vite.config.js
export default defineConfig({
  ...
  define: {
    'process.env': {
      BASE_URL: 'http://localhost:3000',
      ENV: 'dummy'
    }
  }
})


# Set Nodemon
npm install -g nodemon
nodemon.json
{
  "watch": ["src", "bin", "test", "scripts"],
  "ext": ".ts,.js,.pug,.css",
  "ignore": [],
  "exec": "ts-node ./src/index.js"
}


# Set script run server 
package.json 
