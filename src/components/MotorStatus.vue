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
          <p>Voltage/Current:</p>
          <p class="value">{{ voltage.toString().padStart(3, '0') }} / {{ current.toString().padStart(3, '0') }}</p>
        </div>
        
      </div>
      <div class="graph">
        <canvas :id="`temperatureGraph-${motorId}`"></canvas>
        <h3>Temperature-Time Graph</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, watch, onMounted } from 'vue';

const props = defineProps({
  title: String,
  motorId: Number,
  temperature: Number,
  maxTemperature: Number,
  rpm: Number,
  voltage: Number,
  current: Number,
  temperatureHistory: Array,
});

// Watch for changes in the temperature prop and update the temperature history
watch(() => props.temperature, (newTemp) => {
  const maxLength = 100;
  props.temperatureHistory.push(newTemp); // Directly modify the prop's temperature history
  if (props.temperatureHistory.length > maxLength) {
    props.temperatureHistory.shift();
  }
  drawGraph();
});

const drawGraph = () => {
  const canvas = document.getElementById(`temperatureGraph-${props.motorId}`);
  const ctx = canvas.getContext("2d");
  const maxTemp = 100;  // Max temperature value
  const minTemp = 0;    // Min temperature value
  const padding = 40;   // Padding for spacing

  // Set the canvas size with extra height for labels and reference lines
  canvas.width = 500;
  canvas.height = 300;  // Increased height for better label visibility

  // Clear the previous drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set up the reference lines for the Y-axis (temperature)
  ctx.strokeStyle = "#aaa"; // Light gray for reference lines
  ctx.beginPath();
  for (let i = minTemp; i <= maxTemp; i += 25) {
    const y = canvas.height - padding - ((i / maxTemp) * (canvas.height - 2 * padding)); // Scale to canvas height with padding
    ctx.moveTo(padding, y);
    ctx.lineTo(canvas.width - padding, y);
  }
  ctx.stroke();

  // Set up Y-axis labels for reference temperature values
  ctx.fillStyle = "#003A60"; // Dark blue for labels
  ctx.font = "bold 14px Poppins";
  for (let i = minTemp; i <= maxTemp; i += 25) {
    const y = canvas.height - padding - ((i / maxTemp) * (canvas.height - 2 * padding));
    ctx.fillText(i, padding - 35, y + 5);  // Label the temperature on the left side
  }

  // Draw the graph line for the temperature history
  ctx.beginPath();
  ctx.strokeStyle = "red"; // Temperature line color

  // Loop over the temperature history, starting from the most recent data
  props.temperatureHistory.forEach((temp, index) => {
    // Reverse the x-axis (so 0 is at the right, and it extends to the left)
    const x = canvas.width - padding - ((props.temperatureHistory.length - index - 1) / (props.temperatureHistory.length - 1)) * (canvas.width - 2 * padding);
    const y = canvas.height - padding - ((temp / maxTemp) * (canvas.height - 2 * padding)); // Adjust y scaling for temperature history
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();

  // Add the X-axis labels (negative time domain)
  ctx.fillStyle = "#003A60"; // Dark blue for labels
  ctx.font = "bold 12px Poppins";
  const labelCount = 5;  // How many time-domain points you want to show
  for (let i = 0; i < labelCount; i++) {
    const x = canvas.width - padding - (i / (labelCount - 1)) * (canvas.width - 2 * padding);  // Distribute labels along X-axis
    const timeLabel = -i * 10;  // Time domain labels (-10, -20, -30, etc.)
    ctx.fillText(timeLabel, x - 15, canvas.height - padding + 15);  // Position the label
  }
};

// Set up the canvas when the component is mounted
onMounted(() => {
  const canvas = document.getElementById(`temperatureGraph-${props.motorId}`);
  canvas.width = 400;
  canvas.height = 150;
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
  
  .graph {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    height: 350px;
    font-size: 22px;
  }
  
  .graph {
    background-color: #ffffff;
    height: 100%;
    align-items: center;
    border-radius: 4px;
  }

  </style>