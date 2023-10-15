import axios from "axios";

export const getAddressByCoords = (data:object) => axios.get('https://geocode-maps.yandex.ru/1.x',{params: {...data, apikey: '69baf678-987f-4d0c-ac67-89f559e9c253', format: 'json', kind:'house'}});