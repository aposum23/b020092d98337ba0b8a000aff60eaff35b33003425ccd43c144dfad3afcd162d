import {defineComponent, ref} from "vue";
import Dropdown, {DropdownChangeEvent} from 'primevue/dropdown';

const AdditionalFilters = defineComponent({
    name: 'AdditionalFilters',
    emits: ['filtersChange'],
    props: {},
    setup(props, {emit}) {
        const prs = props;
        const loadingLevel = ref('');
        const radius = ref(30);

        const loadingLevelOptions = [
            {name: 'Низкая', code: 'low'},
            {name: 'Средняя', code: 'medium'},
            {name: 'Высокая', code: 'high'}
        ];

        const radiusOptions = [
            {name: '1 км.', code: '1000'},
            {name: '3 км.', code: '3000'},
            {name: '6 км.', code: '6000'}
        ];

        const changeLoadingLevel = (evt: DropdownChangeEvent) => {
            loadingLevel.value = evt.value;
            emit('filtersChange', {loadingLevel: loadingLevel.value, radius: radius.value});
        }

        const changeRadius = (evt: DropdownChangeEvent) => {
            radius.value = evt.value;
            emit('filtersChange', {loadingLevel: loadingLevel.value, radius: radius.value});
        }

        return () => (
            <div class='additional-filters w-full py-2'>
                <div class='grid px-3'>
                    <div class='col-7'>
                        <Dropdown modelValue={loadingLevel.value}
                                  options={loadingLevelOptions}
                                  optionLabel='name'
                                  placeholder='Загруженность'
                                  onChange={changeLoadingLevel}
                                  class={['w-full', loadingLevel.value ? 'dropdown-active' : '']}
                        />
                    </div>
                    <div class='col-5'>
                        <Dropdown modelValue={radius.value}
                                  options={radiusOptions}
                                  optionLabel='name'
                                  placeholder='Радиус'
                                  onChange={changeRadius}
                                  class={['w-full', radius.value ? 'dropdown-active' : '']}
                        />
                    </div>
                </div>
            </div>
        )
    }
})

export default AdditionalFilters;