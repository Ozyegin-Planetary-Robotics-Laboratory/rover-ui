<script setup>
import Header from './components/Header.vue';
</script>

<template>
  <div id="app">

    <Header />
    <router-view />

  </div>
</template>

<style scoped>
  body{
    background-color: #cbd9e1 !important;
  }
</style>
