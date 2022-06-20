<template>
    <div>
        <div>You are logged out</div>
    </div>
</template>


<script setup>
localStorage.removeItem("auth_provider");
localStorage.removeItem("access_token");
localStorage.removeItem("user_profile");
setTimeout(() => {
    window.location.href  = "/login"+window.location.hash
}, 1000);
</script>