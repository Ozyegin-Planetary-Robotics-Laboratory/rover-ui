import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AK70 from '../views/AK70.vue';
import ZED from '../views/ZED.vue';
import Map from '../views/Map.vue';
import ROS2 from '../views/ROS2.vue';
import Arm from '../views/Arm.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/ak70',
        name: 'AK70',
        component: AK70,
    },
    {
        path: '/zed',
        name: 'ZED',
        component: ZED,
    },
    {
        path: '/map',
        name: 'Map',
        component: Map,
    },
    {
        path: '/ros2',
        name: 'ROS2',
        component: ROS2,
    },
    {
        path: '/arm',
        name: 'Arm',
        component: Arm,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
