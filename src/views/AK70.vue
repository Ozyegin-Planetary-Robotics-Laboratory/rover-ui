<template>
    <div class="motor-container">
      <MotorStatus 
        title="Sol Ön"
        :motorId="motorData.leftFront.id"
        :temperature="motorData.leftFront.temperature"
        :maxTemperature="motorData.leftFront.maxTemperature"
        :rpm="motorData.leftFront.rpm"
        :voltageCurrent="motorData.leftFront.voltageCurrent"
      />
      <MotorStatus 
        title="Sağ Ön"
        :motorId="motorData.rightFront.id"
        :temperature="motorData.rightFront.temperature"
        :maxTemperature="motorData.rightFront.maxTemperature"
        :rpm="motorData.rightFront.rpm"
        :voltageCurrent="motorData.rightFront.voltageCurrent"
      />
      <MotorStatus 
        title="Sol Arka"
        :motorId="motorData.leftRear.id"
        :temperature="motorData.leftRear.temperature"
        :maxTemperature="motorData.leftRear.maxTemperature"
        :rpm="motorData.leftRear.rpm"
        :voltageCurrent="motorData.leftRear.voltageCurrent"
      />
      <MotorStatus 
        title="Sağ Arka"
        :motorId="motorData.rightRear.id"
        :temperature="motorData.rightRear.temperature"
        :maxTemperature="motorData.rightRear.maxTemperature"
        :rpm="motorData.rightRear.rpm"
        :voltageCurrent="motorData.rightRear.voltageCurrent"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import MotorStatus from '../components/MotorStatus.vue';
  import { connectWebSocket, disconnectWebSocket } from '../WebSocketService.js';
  
  // Initialize motorData with appropriate initial values
  const motorData = ref({
    leftFront: { id: 12, temperature: 0, maxTemperature: 100, rpm: 0, voltageCurrent: 0 },
    rightFront: { id: 13, temperature: 0, maxTemperature: 100, rpm: 0, voltageCurrent: 0 },
    leftRear: { id: 14, temperature: 0, maxTemperature: 100, rpm: 0, voltageCurrent: 0 },
    rightRear: { id: 15, temperature: 0, maxTemperature: 100, rpm: 0, voltageCurrent: 0 },
  });
  
  // Function to map incoming data to the motorData structure
  const updateMotorData = (data) => {
    if (data.motorId) {
      const motorKey = {
        12: 'leftFront',
        13: 'rightFront',
        14: 'leftRear',
        15: 'rightRear',
      }[data.motorId];
  
      if (motorKey) {
        motorData.value[motorKey] = {
          id: data.motorId,
          temperature: Number(data.temperature) || 0,
          maxTemperature: Number(data.maxTemperature) || 100,
          rpm: Number(data.rpm) || 0,
          voltageCurrent: Number(data.voltageCurrent) || 0,
        };
      }
    }
  };
  
  const handleWebSocketMessage = (data) => {
    updateMotorData(data);
  };
  
  onMounted(() => {
    connectWebSocket('ws://127.0.0.1:8080', handleWebSocketMessage);
  });
  
  onBeforeUnmount(() => {
    disconnectWebSocket();
  });
  </script>
  
  <style scoped>
  .motor-container {
    margin-top: 100px;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
    gap: 20px; /* Space between grid items */
    padding: 20px;
  }
  
  /* Ensure MotorStatus takes full width */
  .motor-container > MotorStatus {
    width: 100%; /* Full width for each card */
  }
  </style>
  