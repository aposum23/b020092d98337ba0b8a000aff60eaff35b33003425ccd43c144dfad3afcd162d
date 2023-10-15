<script setup lang="ts">
import {ref, watch} from 'vue';
import InputText, {InputTextEmits} from "primevue/inputtext";
import {getAddressByCoords} from "@/api/GeoPositionRequests/getAddressByCoords.ts";

const emit = defineEmits<{
  buildRoute: [{startPoint: string, endPoint: string, routeType: 'auto' | 'pedestrian'}]
}>()

const props = defineProps<{
  bankData: {[key:string]: any } | undefined,
  filters: {[key:string]: any } | undefined,
}>()

const openRouteChoose = ref<boolean>(false);
const currentAddress = ref<string>('г. Ставрополь, ул. Ленина 25');
const pointAddress = ref<string>('г. Ставрополь, ул. Тухаческого 17 / 4');
const routeType = ref<string>('pedestrian');
const routeData = ref<string>('20 мин (5 км)');
const date = new Date();
const Geolocation = navigator.geolocation;
const startPoint = ref<string>('');
const endPoint = ref<string>('');

watch(
    () => props.bankData,
    (newValue) => {
      if (newValue) {
        currentBankData.value = newValue
        endPoint.value = newValue.address;
        pointAddress.value = newValue.address;
      }
    }
);

watch(
    () => props.filters,
    (newValue) => {
      console.log(newValue);
    }
)

const currentBankData = ref<{[key:string]: any}>({
  bank_name: 'Банк ВТБ',
  mark: 4.4,
  countOfMarks: 456,
  workEnd: '19:00',
  address: 'г. Ставрополь, ул. Тухачевского, д. 34/8',
  load_type: 'малая',
  predicted_time: {
    '9': 35,
    '12': 50,
    '16': 20
  },
  services: [
      'Открытие счета',
      'Получение ипотеки',
      'Получение кредита',
      'Кредит для бизнеса',
      'Обмен валюты',
      'Кредитная карта'
  ],
  contacts: ['+7 (915) 123 45 67'],
  ext_work_hours: [
    {days: 'Понедельник', hours: '9:00-19:00'},
    {days: 'Вторник', hours: '9:00-19:00'},
    {days: 'Среда', hours: '9:00-19:00'},
  ],
  stock: [
    {
      description: 'Скидка 50% на оформление кредитной карты',
      lastDate: '15.03.23'
    },
    {
      description: 'Получи подарок при оформлении счета!',
      lastDate: '20.03.23'
    }
  ]
});

const changeStartPoint = (value: string | undefined) => {
  /*Хэндлер события изменения начальной точки маршрута*/
  startPoint.value = value ? value : '';
}

const changeEndPoint = (value: string | undefined) => {
  /*Хэндлер события изменения конечной точки маршрута*/
  endPoint.value = value ? value : '';
}

const setPosition = (position: any) => {
  getAddressByCoords({geocode: `${position.coords.latitude} ${position.coords.longitude}`, sco: 'latlong'}).then(
      (response) => {
        const address = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
        startPoint.value = address;
        currentAddress.value = address;
      }
  )
}

const getPositionErrorHandler = (error: any) => {
  console.error(error)
}

const getCurrentPosition = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  Geolocation.getCurrentPosition(setPosition, getPositionErrorHandler, options);
}

const buildRoute = () => {
  /*Данная функция отвечает за построение маршрута на карте*/
  emit('buildRoute', {startPoint: startPoint.value, endPoint: endPoint.value, routeType: routeType.value})
}

const addToFavourite = () => {
  /*Данная функция отвечает за добавление данных об избранных отделениях*/
  console.log('заглушка');
}
</script>

<template>
  <div class="current-bank w-full p-2 px-5" v-if="!openRouteChoose">
    <div class="grid pt-3">
      <div class="col-4 text-left line-height-2 pb-0">
        <h3 class="m-0">{{currentBankData?.bank_name}}</h3>
      </div>
      <div class="col-8 text-right line-height-3  pr-3">
        <span class="material-icons-round text-2xl" style="color: #FFB800">star</span>
        <span class="m-2 vertical-align-top">{{currentBankData?.mark}} ({{currentBankData?.countOfMarks}} отзывов)</span>
      </div>
      <div class="col-12 text-left py-0 text-sm">
        <span class="m-0">Работает до {{currentBankData?.ext_work_hours[date.getDay()].to}}</span>
      </div>
      <div class="col-12 text-left py-0 text-sm">
        <span class="m-0">{{currentBankData?.address}}</span>
      </div>
      <div class="col-12 text-left py-0 text-sm" :style="`color: ${currentBankData?.load_type.toLowerCase() === 'малая' ? '#78B497'
      : currentBankData?.load_type.toLowerCase() === 'средняя' ? '#F1CC56' : '#EA6B50'} !important;`">
        <span class="m-0">Загруженность: {{currentBankData?.load_type.toLowerCase()}}</span>
      </div>
      <div class="col-12 text-left py-0 text-sm" :style="`color: ${currentBankData?.load_type.toLowerCase() === 'малая' ? '#78B497'
      : currentBankData?.load_type.toLowerCase() === 'средняя' ? '#F1CC56' : '#EA6B50'} !important;`">
        <span class="m-0">Очередь: {{Math.floor(currentBankData?.currentLoad)}} человек</span>
      </div>
      <div class="col-12 text-left pt-2">
        <div class="grid">
          <Button label="Маршрут" class="col-6 h-3rem my-auto border-round-3xl text-left" @click="openRouteChoose = true">
            <template #icon>
              <span class="material-icons-round pr-2" style="padding-left: 2rem;">route</span>
            </template>
          </Button>
          <div class="col-2 text-center">
            <Button class="col-6 round-button h-4rem w-4rem">
              <template #icon>
                <span class="material-icons-round">language</span>
              </template>
            </Button>
          </div>
          <div class="col-2 text-center px-4">
            <Button class="col-6 round-button h-4rem w-4rem"  @click="addToFavourite">
              <template #icon>
                <span class="material-icons-round">favorite_border</span>
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div class="grid pt-3">
      <div class="col-6 text-left">
        <h3 class="m-0">Адрес</h3>
      </div>
      <div class="col-12 text-left py-0 text-sm">
        <span class="m-0">{{currentBankData?.address}}</span>
      </div>
    </div>
    <div class="grid pt-3">
      <div class="col-6 text-left">
        <h3 class="m-0">Контакты</h3>
      </div>
      <div class="col-12 text-left py-0 text-sm">
        <template v-for="contact in currentBankData?.contacts" :key="contact">
          <span class="m-0">{{contact}}</span>
        </template>
      </div>
    </div>
    <div class="grid pt-3">
      <div class="col-6 text-left">
        <h3 class="m-0">Время работы</h3>
      </div>
      <div class="col-12 text-left py-0 text-sm">
        <template v-for="time in currentBankData?.ext_work_hours" :key="time">
          <div class="grid">
            <div class="m-0 col-6  text-left">
              <span class="">{{time?.days}}:</span>
            </div>
            <div class="col-6  text-right pr-4">
              <span class="">{{time?.hours}}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="grid pt-3 pb-3">
      <div class="col-6 text-left">
        <h3 class="m-0">Загруженность</h3>
      </div>
      <div class="col-12 text-left py-0 text-sm">
        <template v-for="loadTime in Object.keys(currentBankData?.predicted_time)" :key="loadTime">
          <div class="grid">
            <div class="m-0 col-3  text-left">
              <span>{{loadTime}}:00 :</span>
            </div>
            <div class="col-9  text-right pr-4 ">
              <div class="width-full progress-bar">
                <span class="h-full progress-bar__aggregate text-center" :style="`width: ${currentBankData?.predicted_time[loadTime] / (60 / 100)}%; color: white;`">{{ Math.round(currentBankData?.predicted_time[loadTime] / (60 / 100))}}%</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
<!--  Выбор начальной и конечной точки маршрута -->
  <div class="current-bank w-full p-2 px-5" v-else>
    <div class="grid pt-3">
      <div class="col-12 text-left">
        <h3 class="m-0">Построение маршрута</h3>
      </div>
      <div class="w-full">
        <InputText :model-value="currentAddress" class="col-12 my-1 p-2 border-round-3xl" style="height: 2.5rem;" @update:modelValue="changeStartPoint"></InputText>
        <Button class="absolute border-round-3xl current-position-button" @click="getCurrentPosition">
          <template #icon>
            <span class="material-icons-round mt-1">navigation</span>
          </template>
        </Button>
      </div>
      <InputText :model-value="pointAddress" class="w-full my-1 p-2 border-round-3xl" style="height: 2.5rem;" @update:modelValue="changeEndPoint"></InputText>
      <div class="col-12 text-left pt-3">
        <div class="grid">
          <Button label="Пешком" :class="['col-5 h-3rem my-auto mr-1 border-round-3xl', routeType === 'pedestrian' ? 'active-button' : '']" @click="routeType = 'pedestrian'"></Button>
          <Button label="На машине" :class="['col-5 h-3rem my-auto ml-1 border-round-3xl', routeType === 'auto' ? 'active-button' : '']" @click="routeType = 'auto'"></Button>
        </div>
      </div>
<!--      <div class="col-12 text-left">-->
<!--        <h3 class="m-0">{{routeData}}</h3>-->
<!--      </div>-->
      <div class="col-12 text-left pt-2">
        <div class="grid">
          <Button label="Построить" class="col-6 h-3rem my-auto border-round-3xl text-left" @click="buildRoute">
            <template #icon>
              <span class="material-icons-round pr-2" style="padding-left: 2rem;">route</span>
            </template>
          </Button>
          <div class="col-1 text-center px-4">
            <Button class="col-6 round-button h-4rem w-4rem" @click="addToFavourite">
              <template #icon>
                <span class="material-icons-round">favorite_border</span>
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>