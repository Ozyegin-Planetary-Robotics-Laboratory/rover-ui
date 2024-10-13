<template>
    <div class="view-container">
      <h1>{{ title }}</h1>
      <p>This is the ROS2 view.</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const title = ref('ROS2');
  </script>
  
  <style scoped>
  .view-container {
    padding: 20px;
    text-align: center;
  }
  </style>
  