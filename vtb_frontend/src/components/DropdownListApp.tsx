import {defineComponent, PropType, toRefs} from "vue";

type DropdownListAppPropsType = {
    chapterName: string
}

const DropdownListApp = defineComponent({
    name: 'dropdownListApp',
    props: {
        chapterName: String as PropType<DropdownListAppPropsType['chapterName']>,
    },
    setup(props){
        const {chapterName} = toRefs(props);

        return () => (
            <div class='list col-12 px-3 absolute'>
                {chapterName.value === 'history' ? (<div class='grid'>
                    <div class='col-4 card-date ml-2 my-2'>
                        <span>02 июня</span>
                    </div>
                </div>) : (<div></div>)}
                <div class='col-12 mx-auto px-2'>
                    <div class='grid card p-0 px-2'>
                        <div class='col-8 text-left'>
                            <div class='col-12'>
                                <h3 class='m-0 py-2' style={`color: #009FDF`}>Банк 1</h3>
                                {chapterName.value === 'favorite' ? (
                                    <div class='grid'>
                                        <div class='col-12 py-1'>
                                            <span>Работает до 19:00</span>
                                        </div>
                                    </div>
                                ) : (<div></div>)}
                                <div class='grid'>
                                    <div class='col-12 py-1'>
                                        <span>г. Ставрополь, ул. Тухачевского, д. 17/4</span>
                                    </div>
                                </div>
                                {chapterName.value === 'favorite' ? (
                                    <div class='grid'>
                                        <div class='col-12 py-1' style={`color: #21A400`}>
                                            <span>Загруженность: низкая</span>
                                        </div>
                                    </div>
                                ) : (<div></div>)}
                                {chapterName.value === 'history' ? (
                                    <div class='grid py-1'>
                                        <div class='col-12'>
                                            <h3 class='font-italic m-0'>Открытие счета</h3>
                                        </div>
                                    </div>
                                ) : (<div></div>)}
                            </div>
                        </div>
                        <div class='col-4'>
                                <span class='material-icons-outlined p-3 favorite-button mt-6 text-2xl'>{true ? 'favorite' : 'add-favorite_border'}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

export default DropdownListApp;