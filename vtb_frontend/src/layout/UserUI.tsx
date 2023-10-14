import {defineComponent} from "vue";
import BottomBar from "@/layout/BottomBar.vue";
import TopBar from "@/layout/TopBar.tsx";

const UserUI = defineComponent({
    name: 'UserUI',
    setup() {
        return () => (
            <div class='user-ui' style='width: 100vw; height: 100vh; position: absolute; top: 0; left: 0;'>
                <TopBar />
                <BottomBar />
            </div>
        );
    }
})

export default UserUI;