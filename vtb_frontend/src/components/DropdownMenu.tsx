import {defineComponent, PropType, ref, toRefs, watch} from "vue";
import CurrentBank from "@/components/CurrentBank.vue";
import DropdownListApp from "@/components/DropdownListApp.tsx";
import SettingsMenu from "@/components/SettingsMenu.vue";
import {getExtendedInformationAboutDepartment} from "@/api/menuRequests/ExtendedInformation.ts";

type DropdownMenuPropsType = {
    openBottomBar: string,
    bankData: object,
    filters: object,
}

const DropdownMenu = defineComponent({
    name: 'DropdownMenu',
    emits:['buildRoute'],
    props: {
        openBottomBar: {
            type: String as PropType<DropdownMenuPropsType['openBottomBar'] >,
            default: 'map'
        },
        bankData: {
            type: Object as PropType<DropdownMenuPropsType['bankData']>,
            required: false
        },
        filters: {
            type: Object as PropType<DropdownMenuPropsType['filters']>,
            required: false
        },
    },
    setup(props, {emit}){
        const { openBottomBar, bankData, filters } = toRefs(props);

        const currentChapterName = ref<string>('map');
        const dropDownMenuData = ref<object>();

        const dropDownMenus:{[key: string]: any} = {
            favorite: (<DropdownListApp chapterName='favorite'/>),
            history: (<DropdownListApp chapterName='history'/>),
            settings: (<SettingsMenu/>),
            bookmark_added: (<DropdownListApp/>),
        }

        watch(
            () => openBottomBar.value,
            (newValue) => currentChapterName.value = newValue ? newValue : currentChapterName.value
        );

        watch(
            () => bankData.value,
            (newValue) => {
                if (newValue) getExtendedInformationAboutDepartment(newValue)
                    .then((response) => dropDownMenuData.value = response.data)
            }
        );

        const buildRoute = (evt: {startPoint: string, endPoint: string, touteType: string}) => {
            emit('buildRoute', evt);
        }

        return () => (
            <div class={['dropdown-menu', openBottomBar.value ? 'dropdown-menu__open' : '']}>
                {currentChapterName.value === 'map' ? <CurrentBank bankData={dropDownMenuData.value} onBuildRoute={buildRoute} filters={filters.value}/> : dropDownMenus[currentChapterName.value]}
            </div>
        )
    }
})

export default DropdownMenu;