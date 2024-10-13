<template>
    <div class="motor-status">
      <div class="motor-content">
        <div class="motor-data">
            <div class="data-row">
                <h3>{{ title }}</h3>
            </div>

          <div class="data-row">
            <p>Motor Id:</p>
            <p class="value">{{ motorId.toString().padStart(2, '0') }}</p>
          </div>
          <div class="data-row">
            <p>Temperature:</p>
            <p class="value">{{ temperature.toString().padStart(3, '0') }}</p>
          </div>
          <div class="data-row">
            <p>Max Temperature:</p>
            <p class="value">{{ maxTemperature.toString().padStart(3, '0') }}</p>
          </div>
          <div class="data-row">
            <p>RPM:</p>
            <p class="value">{{ rpm.toString().padStart(3, '0') }}</p>
          </div>
          <div class="data-row">
            <p>Voltage/Current</p>
            <p class="value">{{ voltageCurrent.toString().padStart(3, '0') }}</p>
          </div>
        </div>
        <div class="graph-placeholders">
            <p>Grapsh will be implemented</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    title: String,
    motorId: Number,
    temperature: Number,
    maxTemperature: Number,
    rpm: Number,
    voltageCurrent: Number,
  });
  </script>
  
  <style scoped>
  .motor-status {
    background-color: #ffffff;
    border-radius: 22px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin: 5px;
    padding: 10px;
    font-family: 'Poppins', sans-serif; /* Use the new font */
  }
  
  .motor-title {
    background-color: #e6f3ff;
    padding: 10px;
    margin: -10px -10px 10px -10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    font-weight: bold;
  }
  
  .motor-content {
    display: flex;
  }
  
  .motor-data {
    flex: 1;
    margin-right: 10px;

  }
  .motor-data .data-row:first-child {
    background-color: #e6f3ff;
    margin-bottom: 10px;
    padding: 12px;
    font-size: 25px;
    border-radius: 18px;
    display: block;
    margin-bottom: 30px;
  }
  .motor-data .data-row:first-child h3 {
    text-align: center;
}
  .data-row {
    background-color: #ecf5fc;
    margin-bottom: 5px;
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    border-radius: 18px;
  }
  
  .data-row p {
    margin: 0;
    font-size: 20px;  
  }
  .data-row p:first-child {
    color: #003A60;
  }
  .data-row h3 {
    margin: 0;
  }


  .value {
    font-weight: bold;
  }
  
  .graph-placeholders {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    height: 350px;
    font-size: 22px;
  }
  
  .graph-placeholder {
    background-color: #f0f0f0;
    height: 80px;
    border-radius: 4px;
  }
  </style>