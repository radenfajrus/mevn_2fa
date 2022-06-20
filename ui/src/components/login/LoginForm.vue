
<template>

<div class="min-h-screen flex flex-col items-center justify-center">
  <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
    <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login To Your Account</div>
    <button @click='handleSignIn' class="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
      <span class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-red-500"><i class="fab fa-google"></i></span>
      <span>Login with Google</span>
    </button>
    <div class="relative mt-10 h-px bg-gray-300">
      <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
        <span class="bg-white px-4 text-xs text-gray-500 uppercase">Or Login With Email</span>
      </div>
    </div>
    <div class="mt-10">
      <form action="#">
        <div class="flex flex-col mb-6">
          <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
          <div class="relative">
            <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>

            <input id="email" type="email" name="email" class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="E-Mail Address" />
          </div>
        </div>
        <div class="flex flex-col mb-6">
          <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
          <div class="relative">
            <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <span>
                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </div>

            <input id="password" type="password" name="password" class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" />
          </div>
        </div>

        <div class="flex items-center mb-6 -mt-4">
          <div class="flex ml-auto">
            <a href="#" class="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</a>
          </div>
        </div>

        <div class="flex w-full">
          <button type="submit" class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
            <span class="mr-2 uppercase">Login</span>
            <span>
              <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
    <div class="flex justify-center items-center mt-6">
      <a href="#" target="_blank" class="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
        <span>
          <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </span>
        <span class="ml-2">You don't have an account?</span>
        <span>{{gAuth.client}}</span>
      </a>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getCurrentInstance } from 'vue'
import { inject } from 'vue'
import { gAuthInterface } from '@/services/gauth';
import axios from 'axios';

let gAuth: any = inject('gAuth')


let afterSignIn = async (response) => {
  // response :
  // authuser: "0"
  // code: "4/0AX4XfWjpBceqH9N6tN-K65AYQmvMZnqWwAD3oNP95-pbwIOXdi47s1E9t-2YhLfHTT0I6A"
  // prompt: "consent"
  // scope: "email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid"
  try {
    let res: any = await axios.post("https://accounts.google.com/o/oauth2/token",new URLSearchParams({
      grant_type: 'authorization_code',
      code: response.code,
      response_type: 'token',
      client_id: gAuth.client.config.client_id,
      client_secret: import.meta.env.VITE_GAUTH_CLIENT_SECRET,
      redirect_uri: 'postmessage'
    }));
    console.log(res.data)

    // https://developers.google.com/people/api/rest/v1/people/get  
    let userInfo = {
      "names": "",
      "nicknames": "",
      "phoneNumbers": "",
      "photos": "",
      "urls": "",
      "clientData": "",
      "birthdays": "",
      "genders": "",
      "addresses": "",
      "emailAddresses": "",
    }
    let fields = "personFields="+Object.keys(userInfo).join(",")
    
    let res_user = await axios.get("https://people.googleapis.com/v1/people/me?"+fields,{
      headers: {
        Authorization: "Bearer "+res.data.access_token
      }
    });
    console.log(res_user.data)

    localStorage.setItem("auth_provider","gAuth");
    localStorage.setItem("access_token",res.data.access_token);
    localStorage.setItem("user_profile",res_user.data);

    let hashes = {}
    window.location.hash.substr(1).split("&").forEach( (x) => hashes[x.split("=")[0]] = x.split("=")[1] )
    
    if(hashes && hashes.redirect_uri){
      window.location = decodeURIComponent(hashes.redirect_uri);
    }else{
      window.location.href = `/main` ;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
let handleSignIn = async () => {
  try {
    await gAuth.client.signIn("http://localhost:3000/2fa",afterSignIn);
  } catch (error) {
    console.error(error);
    return null;
  }
}
let handleSignOut = async () => {
  try {
    await gAuth.signOut();
    user.value = '';
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped>
</style>
