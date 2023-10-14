import {defineComponent, ref} from "vue";
import applicationLogo from '@/assets/images/logos/vtb_logo.svg';
import InputText from "primevue/inputtext";

const TopBar = defineComponent({
    name: 'TopBar',
    setup(){
        const searchValue = ref<string>('');
        const filtersOpened = ref<boolean>(false);

        const openFilters = () => {
            filtersOpened.value = !filtersOpened.value;
        }

        return () => (
            <div class='top-bar'>
            <div class='grid p-1 pt-3'>
                <div class='top-bar-logo col-4 mt-1 pl-0'>
                    <img src={applicationLogo}  alt='Логотип ВТБ'/>
                </div>
                <div class='top-bar-header col-8 text-right text-xs'>
                    <h2 class='mb-0 px-3'>Банкоматы и офисы</h2>
                </div>
            </div>
            <div class='grid px-3 mt-1'>
                <span class="p-input-icon-left col-10">
                    <i class="pi pi-search ml-2" />
                    <InputText modelValue={searchValue.value} placeholder="Введите услугу" class='col-12 px-5'/>
                </span>
                <span class='col-2'>
                    <div class={["chapter-button mx-auto", filtersOpened.value ? 'active-chapter' : '']} onClick={() => openFilters()}>
                        <span class={["material-icons-round", filtersOpened.value ? 'active-icon' : '']}>filter_alt</span>
                    </div>
                </span>
            </div>
            </div>
        )
    }
})

export default TopBar