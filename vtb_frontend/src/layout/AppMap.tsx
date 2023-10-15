import {defineComponent, onMounted, PropType, ref, toRefs, watch} from "vue";
import {YandexMap, YandexMarker, yamaps, YandexObjectManager} from "vue-yandex-maps";
import VTBLogo from '@/assets/images/logos/vtb_logo.svg';
import AtmIcon from '@/assets/images/icons/AtmIcon.svg';
import {getDataAboutDepartments} from "@/api/mapRequests/DepartmentsOnMap.ts";
import {FilterService} from "primevue/api";
import filters = FilterService.filters;

type AppMapPropsType = {
    initialPosition: number[],
    routeData: {startPoint: string, endPoint: string, routeType: 'auto' | 'pedestrian'},
    filters: object
}

const AppMap = defineComponent({
    name: 'AppMap',
    props: {
        initialPosition: Array as PropType<AppMapPropsType['initialPosition']>,
        routeData: Object as PropType<AppMapPropsType['routeData']>,
        filters: Object as PropType<AppMapPropsType['filters']>
    },
    emits: ['openDepartmentInfo'],
    components: {
        YandexMap,
    },
    setup(props, { emit }) {
        const {initialPosition, routeData} = toRefs(props);
        const mapInitialPosition = ref<number[]>([45.0195555, 41.9002591]);
        const bankDepartments = ref();
        const date = new Date();
        const settings = {
            apiKey: '69baf678-987f-4d0c-ac67-89f559e9c253',
            lang: 'ru_RU',
            coordorder: 'latlong',
            debug: false,
            version: '2.1'
        }
        const route = ref();
        let map: any;
        let multiRoute: any;

        const buildMultiRoute = (startPoint: string | number[], endPoint: string | number[], routeMode: 'auto' | 'pedestrian' = 'pedestrian') => {
            /*Данная функция принимает на вход начальную точку и конечную точки и строит между ними все возможные маршруты (пешие или автомобильные)*/
            multiRoute = new ymaps.multiRouter.MultiRoute({
                referencePoints: [
                    startPoint,
                    endPoint
                ],
                params: {
                    // Тип маршрута: на общественном транспорте.
                    routingMode: routeMode,
                    routeStrokeColor: "000088",
                    routeActiveStrokeColor: "ff0000",
                    pinIconFillColor: "ff0000",
                    boundsAutoApply: true,
                }
            }, {
                // Автоматически устанавливать границы карты так,
                // чтобы маршрут был виден целиком.
                boundsAutoApply: true
            });
            map.geoObjects.add(multiRoute);
        }

        watch(
            () => routeData.value,
            (newValue) => {
                if (newValue) {
                    multiRoute.model.setReferencePoints([
                        newValue.startPoint,
                        newValue.endPoint
                    ]);
                    multiRoute.model.setParams({
                        routingMode: newValue.routeType
                    });
                }
            }
        );

        watch(
            () => initialPosition.value,
            (newValue) => {
                if (newValue) getDataAboutDepartments({currentPosition: `${newValue[0]} ${newValue[1]}`, distance: 300})
                    .then((result: {[key: string]: any}) => {
                        bankDepartments.value = result.data;
                        const department = bankDepartments.value.banks.filter((department: {[key: string]: number | string}) => department.bankId === bankDepartments.value.optimal_branch)[0];
                        buildMultiRoute([initialPosition.value ? initialPosition.value : mapInitialPosition.value],
                            [department.latitude, department.longitude])
                        openInfoAboutDepartment({id: bankDepartments.value.optimal_branch, type: 'bank'})
                    })
                    .catch((error: Error) => console.error('Ошибка получения данных об отделениях и банкоматах', error));
            }
        )

        const occupancyLevel= '#b32317';

        const openInfoAboutDepartment = (bank: object) => {
            /* Данная функция открывает информацию о текущем отделении */
            emit('openDepartmentInfo', bank);
        }

        const loadMap = (ymap) => {
            map = ymap;
        }

        return () => (
            <div id='map' class='w-full' style='height: 100vh'>
                {/*Для реализации функционала за основу взяты яндекс карты. Чтобы внешне выглядело красиво были убраны метки
                 и функциональные кнопки яндекса. Это используется исключительно в целях дизайна. Яндекс самостоятельно говорят о том,
                 что любой продукт похожий на их, дает им рекламу, соответственно мы не переманиваем их клиентов и не воруем функционал.
                 Мы используем исключительно оффициальную лицензию, с частичными ограничениями, распространяющаяся бесплатно в общем доступе*/}
                <YandexMap settings={{...settings}} coordinates={initialPosition.value ? initialPosition.value : mapInitialPosition.value}  zoom={15} class='map' onCreated={(ymap) => loadMap(ymap)}>
                    <YandexObjectManager options={{type: 'FeatureCollection', features: [route.value]}}></YandexObjectManager>
                    { bankDepartments.value ? Object.keys(bankDepartments.value).map((key:string) => Array.isArray(bankDepartments.value[key]) ? bankDepartments.value[key].filter((department: {[key: string]: any}) => department.status.toLowerCase() != 'закрыто').map((data: {[key: string]: any}) =>
                        <YandexMarker coordinates={[data.latitude, data.longitude]} markerId={`data_${data[key.toLowerCase() === 'atms' ? 'atmId' : 'bankId']}`} type='Point'
                                      onClick={()=>emit('openDepartmentInfo', {id: data[key.toLowerCase() === 'atms' ? 'atmId' : 'bankId'], type: key.toLowerCase() === 'atms' ? 'atm' : 'bank'})}
                                      options={{
                                          iconLayout: "default#imageWithContent",
                                          iconImageHref: key.toLowerCase() === 'atms' ? AtmIcon : VTBLogo,
                                          iconImageSize: [40, 40],
                                          iconImageOffset: [0, 0],
                                          iconContentOffset: [0, 0],
                                      }}
                                      properties={ {
                                          iconContent: '<div class="circle-marker" style="width: fit-content; height: 50px; justify-content: center; align-items: center;" >' +
                                              `<div class="circle-marker__point" style="border: 2px solid ${key.toLowerCase() === 'atms' ? '#009FDF' : data?.currentLoad / (60 / 100) < 33 ? '#78B497'
                                                  : data?.currentLoad / (60 / 100) < 66 ? '#F1CC56' : '#EA6B50'}; background: #FFFFFF; color: #ffffff; font-weight: bold; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; position: relative; z-index: 1; border-radius: 100%; box-shadow: 0 5px 10px 0 #00000030;">` +
                                              `${key.toLowerCase() === 'atms' ?'<span class="material-icons-outlined" style="color:#002882">local_atm</span>' : `<img width="30px" src="${VTBLogo}" alt="">`}` +
                                              "</div>" +
                                              `<div class="circle-marker__content" style="white-space: nowrap; display: flex; height: 32px; align-items: center; background: #ffffff9c; padding: 0 20px 0 34px; position: absolute; top: 3px; left: 10px; z-index: 0; border-radius: 20px;">${data.openHours[date.getDay()]?.hours === '00:00-00:00' ? '24 часа' : data.openHours[date.getDay()]?.hours}</div>` +
                                              "</div>"
                                      }}
                        >
                        </YandexMarker>) : undefined) : undefined}
                    <YandexMarker coordinates={[initialPosition.value ? initialPosition.value[0] : mapInitialPosition.value[0], initialPosition.value ? initialPosition.value[1] :  mapInitialPosition.value[1]]} markerId={0} type='Point'
                          options={{
                              iconLayout: "default#imageWithContent",
                              iconImageHref: VTBLogo,
                              iconImageSize: [1, 1],
                              iconImageOffset: [-20, -20],
                              iconContentOffset: [0, 0]
                          }}
                          properties={
                            {
                                iconContent: '<div class="circle-marker" style="width: fit-content; height: 50px; justify-content: center; align-items: center;">' +
                                    `<div class="circle-marker__point" style="border: 2px solid #009FDF; background: #FFFFFF; font-weight: bold; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; position: relative; z-index: 1; border-radius: 100%; box-shadow: 0 5px 10px 0 #00000030;">` +
                                    `<span style="width:30px"> Я </span>` +
                                    "</div>"
                            }
                          }>
                    </YandexMarker>
                </YandexMap>
            </div>
        )
    }
})

export default AppMap