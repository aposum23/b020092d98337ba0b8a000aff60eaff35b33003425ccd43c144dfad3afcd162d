<script setup lang="ts">
import AppMap from "@/layout/AppMap.tsx";
import {onMounted, ref} from "vue";
import UserUI from "@/layout/UserUI.tsx";

const Geolocation = navigator.geolocation;
const initialPosition = ref<number[]>()

const setInitialPosition = (position: any) => {
  initialPosition.value = [position.coords.latitude, position.coords.longitude]
}

const getPositionErrorHandler = (error: any) => {
  console.error(error)
}


onMounted(() => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  Geolocation.getCurrentPosition(setInitialPosition, getPositionErrorHandler, options);
})
</script>

<template>
<!--  TODO: Надо изменить position у UserUI чтобы работали карты, а то этот компонент перекрывает карты и их нельзя перемещать-->
  <AppMap :initial-position="initialPosition"/>
  <UserUI />
</template>

<style scoped>
</style>
