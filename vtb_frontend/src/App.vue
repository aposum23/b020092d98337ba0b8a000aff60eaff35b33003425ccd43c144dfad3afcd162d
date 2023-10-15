<script setup lang="ts">
import AppMap from "@/layout/AppMap.tsx";
import {onMounted, ref} from "vue";
import TopBar from "@/layout/TopBar.tsx";
import BottomBar from "@/layout/BottomBar.vue";
import DropdownMenu from "@/components/DropdownMenu.tsx";

const Geolocation = navigator.geolocation;
const initialPosition = ref<number[]>([55.7522200, 37.6155600])
const openBottomBar = ref<string>('');
const choosenBank = ref<object>();
const routeData = ref<{startPoint: string, endPoint: string, routeType: 'auto' | 'pedestrian'}>();
const filters = ref();

const setInitialPosition = (position: any) => {
  initialPosition.value = [position.coords.latitude, position.coords.longitude]
}

const getPositionErrorHandler = (error: any) => {
  console.error(error)
}

const changeDropDownVisible = (evt: string) => {
  /* Данная функция отвечает за открытие выбраного пользователем меню */
  openBottomBar.value = evt;
}

const openDepartmentInfo = (bank: {id: number, type: string}) => {
  /* Данная функция открывает меню и сохраняет идентификатор выбраного пользователем банка */
  choosenBank.value = bank;
  changeDropDownVisible('map');
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
  <TopBar :menuOpened="!openBottomBar" @filtersChange="(evt) => filters = evt"/>
  <AppMap :initial-position="initialPosition" @open-department-info="openDepartmentInfo" :routeData="routeData" :filters="filters"/>
  <BottomBar @open:bar="changeDropDownVisible" :openedMenu="openBottomBar"/>
  <DropdownMenu :openBottomBar="openBottomBar" :bankData="choosenBank" @buildRoute="(evt) => routeData = evt"/>
</template>

<style scoped>
</style>
