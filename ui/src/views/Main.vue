<template>
    <div>
        <router-link :to="{ name: 'Home' }">
            <span>Go To Home</span>
        </router-link>
        <div>This is Main Page</div>
        <router-link :to="{ name: 'Logout' }">
            <span>Logout</span>
        </router-link>
    </div>
</template>


<script setup>
</script>