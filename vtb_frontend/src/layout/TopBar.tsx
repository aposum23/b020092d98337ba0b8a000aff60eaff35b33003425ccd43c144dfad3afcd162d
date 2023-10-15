import {defineComponent, PropType, ref, toRefs, watch} from "vue";
import applicationLogo from '@/assets/images/logos/vtb_logo.svg';
import InputText from "primevue/inputtext";
import AdditionalFilters from "@/components/AdditionalFilters.tsx";

type TopBarType = {
    menuOpened: boolean
}

const TopBar = defineComponent({
    name: 'TopBar',
    emits: ['filtersChange'],
    props: {
        menuOpened: {
            type: Boolean as PropType<TopBarType['menuOpened']>,
            default: false
        }
    },
    setup(props, {emit}){
        const { menuOpened } = toRefs(props);
        const searchValue = ref<string>('');
        const filtersOpened = ref<boolean>(false);
        const windowWidth = window.innerWidth;
        const additionalFilters = ref();

        const openFilters = () => {
            filtersOpened.value = !filtersOpened.value;
        }

        return () => (
            <div class={[windowWidth >= 992 && menuOpened.value ? 'closed-top-bar' : '',  'top-bar lg:pr-2']}>
                <div class='grid p-1 pt-3'>
                    <div class='top-bar-logo col-4 mt-1 pl-4'>
                        <img src={applicationLogo} class='w-6rem' alt='Логотип ВТБ'/>
                    </div>
                    <div class='top-bar-header col-8 text-right text-xs'>
                        <h2 class='mb-0 px-3'>Банкоматы и офисы</h2>
                    </div>
                </div>
                <div class='grid px-3 mt-1'>
                    <span class="p-input-icon-left col-10 pt-0">
                        <i class="pi pi-search" />
                        <InputText id='serviceFilter' modelValue={searchValue.value} placeholder="Введите услугу" class='w-full border-round-3xl' onUpdateModelValue={() => emit('filtersChange', {...additionalFilters.value, service: searchValue.value})}/>
                    </span>
                    <span class='col-2 pt-0'>
                        <div class={["chapter-button mx-auto", filtersOpened.value ? 'active-chapter' : '']} onClick={() => openFilters()}>
                            <span class={["material-icons-round", filtersOpened.value ? 'active-icon' : '']}>filter_alt</span>
                        </div>
                    </span>
                </div>
                <AdditionalFilters class='absolute additionals' style={[!filtersOpened.value ? 'display: none' : 'display: block']} onFiltersChange={(evt) => {
                    additionalFilters.value = evt;
                    emit('filtersChange', {...evt, service: searchValue.value})
                }}/>
            </div>
        )
    }
})

export default TopBar