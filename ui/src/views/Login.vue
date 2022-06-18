<template>
    <div>
        <router-link :to="{ name: 'Home' }">
            <span>Go To Home</span>
        </router-link>
        <div>This is Login Page</div>
        <div>
        <LoginForm></LoginForm>
        </div>
    </div>
</template>


<script setup>

import LoginForm from '@/components/login/LoginForm.vue'

</script>