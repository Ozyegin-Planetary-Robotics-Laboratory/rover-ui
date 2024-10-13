<template>
    <div class="view-container">
      <h1>{{ title }}</h1>
      <p>Welcome to the Home view!</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const title = ref('Home');
  </script>
  
  <style scoped>
  .view-container {
    padding: 20px;
    text-align: center;
  }
  </style>
  