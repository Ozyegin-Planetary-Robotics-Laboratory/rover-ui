<template>
  <div id="app">
    <Header />
    <div class="motor-container">
      <MotorStatus 
        title="Left Front"
        :motorId="motorData.leftFront.id"
        :temperature="motorData.leftFront.temperature"
        :maxTemperature="motorData.leftFront.maxTemperature"
        :rpm="motorData.leftFront.rpm"
        :voltage="motorData.leftFront.voltage"
        :current="motorData.leftFront.current"
        :temperatureHistory="motorTempHist.leftFront.value"
      />
      <MotorStatus 
        title="Right Front"
        :motorId="motorData.rightFront.id"
        :temperature="motorData.rightFront.temperature"
        :maxTemperature="motorData.rightFront.maxTemperature"
        :rpm="motorData.rightFront.rpm"
        :voltage="motorData.rightFront.voltage"
        :current="motorData.rightFront.current"
        :temperatureHistory="motorTempHist.rightFront.value"
      />
      <MotorStatus 
        title="Left Rear"
        :motorId="motorData.leftRear.id"
        :temperature="motorData.leftRear.temperature"
        :maxTemperature="motorData.leftRear.maxTemperature"
        :rpm="motorData.leftRear.rpm"
        :voltage="motorData.leftRear.voltage"
        :current="motorData.leftRear.current"
        :temperatureHistory="motorTempHist.leftRear.value"
      />
      <MotorStatus 
        title="Right Rear"
        :motorId="motorData.rightRear.id"
        :temperature="motorData.rightRear.temperature"
        :maxTemperature="motorData.rightRear.maxTemperature"
        :rpm="motorData.rightRear.rpm"
        :voltage="motorData.rightRear.voltage"
        :current="motorData.rightRear.current"
        :temperatureHistory="motorTempHist.rightRear.value"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Header from '../components/Header.vue';
import MotorStatus from '../components/MotorStatus.vue';

const motorData = ref({
  leftFront: { id: 12, temperature: 0, maxTemperature: 0, rpm: 0, voltage: 0, current: 0  },
  rightFront: { id: 13, temperature: 0, maxTemperature: 0, rpm: 0,  voltage: 0, current: 0 },
  leftRear: { id: 14, temperature: 0, maxTemperature: 0, rpm: 0,  voltage: 0, current: 0  },
  rightRear: { id: 15, temperature: 0, maxTemperature: 0, rpm: 0,  voltage: 0, current: 0  },
});



const motorTempHist = {
  leftFront: ref([]),
  rightFront: ref([]),
  leftRear: ref([]),
  rightRear: ref([]),
};


const addTemperatureDataPoint = (motorKey, temperature) => {
  const maxLength = 100;
  if (motorTempHist[motorKey].value.length >= maxLength) {
    motorTempHist[motorKey].value.shift();
  }
  motorTempHist[motorKey].value.push(temperature);
};


const updateMotorData = (data) => {
  if (data.motor_id) {
    const motorKey = {
      12: 'leftFront',
      13: 'rightFront',
      14: 'leftRear',
      15: 'rightRear',
    }[data.motor_id];

    if (motorKey) {
      const currentMotor = motorData.value[motorKey];
      const newTemperature = Number(data.temperature) || 0;
      addTemperatureDataPoint(motorKey, newTemperature);

      const newMaxTemperature = newTemperature > currentMotor.maxTemperature ? newTemperature : currentMotor.maxTemperature;

      motorData.value[motorKey] = {
        id: data.motor_id,
        temperature: newTemperature,
        maxTemperature: newMaxTemperature,  // Update the maxTemperature if necessary
        rpm: Number(data.rpm) || 0,
        voltage: Number(data.voltage) || 0,
        current: Number(data.current) || 0,
      };
    }
  }
};


onMounted(() => {
  const eventSource = new EventSource('http://localhost:9090/events');
  eventSource.onmessage = (event) => {
    try {
        const sanitizedData = event.data.replace(/'/g, '"');
        const data = JSON.parse(sanitizedData);
        updateMotorData(data);
    } catch (error) {
        console.error('JSON parsing error:', error);
    }
  };

  eventSource.onerror = () => {
    console.error('EventSource failed.');
  };


});

onBeforeUnmount(() => {
  // Cleanup code if needed (not necessary for SSE)
});
</script>

<style scoped>
.motor-container {
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
}
</style>
