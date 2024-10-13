<template>
  <header class="header">
    <nav>
      <ul class="nav-list">
        <router-link to="/" tag="li" class="nav-item" active-class="active">Home</router-link>
        <router-link to="/ak70" tag="li" class="nav-item" active-class="active">AK70 Motors</router-link>
        <router-link to="/zed" tag="li" class="nav-item" active-class="active">ZED Camera</router-link>
        <router-link to="/map" tag="li" class="nav-item" active-class="active">Map</router-link>
        <router-link to="/ros2" tag="li" class="nav-item" active-class="active">ROS2</router-link>
        <router-link to="/arm" tag="li" class="nav-item" active-class="active">Arm</router-link>
      </ul>
    </nav>
  </header>
</template>

<script setup>
// No need for selectTab or activeTab
</script>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  background-color: #33475b;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  justify-content: space-evenly;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.nav-item {
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0 5px;
  text-decoration: none; /* Remove underline */
  font-family: 'Poppins', sans-serif; /* Use the new font */

}

.nav-item.active {
  background-color: white;
  color: #33475b;
  border-radius: 5px;
}

.nav-item:hover {
  background-color: #56789a;
  border-radius: 5px;
}
</style>
