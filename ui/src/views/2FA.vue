<template>
    <div>
        <router-link :to="{ name: 'Home' }">
            <span>Go To Home</span>
        </router-link>
        <div>This is 2FA Page</div>
        <div>
        <TFAForm></TFAForm>
        </div>
        <router-link :to="{ name: 'Logout' }">
            <span>Logout</span>
        </router-link>
    </div>
</template>


<script setup>
import TFAForm from '@/components/login/TFAForm.vue'

</script>