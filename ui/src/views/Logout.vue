<template>
    <div>
        <div>You are logged out</div>
    </div>
</template>


<script setup>

let removeLocalStorage = (arr) =>{
  arr.forEach(element => {
    console.log(element)
    localStorage.removeItem(element);
  });
}

setTimeout(() => {
    removeLocalStorage(["auth_provider","access_token","id_token","user_profile"])
    window.location.href  = "/login"+window.location.hash
}, 1000);
</script>