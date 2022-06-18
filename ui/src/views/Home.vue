<template>
    <div>
        <div>
            <router-link :to="{ name: 'Login' }">
                <span>Go To Login</span>
            </router-link>
        </div>
        <div>
            <router-link :to="{ name: '2fa' }">
                <span>Go To 2FA</span>
            </router-link>
        </div>
        <div>
            <router-link :to="{ name: 'Main' }">
                <span>Go To Main</span>
            </router-link>
        </div>
        <div>This is Home Page</div>
    </div>
</template>


<script setup>
</script>