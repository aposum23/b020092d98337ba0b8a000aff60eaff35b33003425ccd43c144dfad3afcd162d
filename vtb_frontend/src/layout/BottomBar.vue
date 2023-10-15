<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const emit = defineEmits<{
  'open:bar': [string],
}>()

const props = defineProps<{
  openedMenu: string;
}>()

const bottomBarStructure = [
  {name: 'close', icon: 'east', class: 'close-button'},
  {name: 'settings', icon: 'settings', class: 'settings-button'},
  {name: 'favorite', icon: 'favorite', class: 'favorite-button'},
  {name: 'map', icon: 'map', class: 'map-button'},
  {name: 'bookmark_added', icon: 'bookmark_added', class: 'bookmark-button'},
  {name: 'history', icon: 'schedule', class: 'time-button'},
]

const currentChapter = ref<string>(props.openedMenu ? props.openedMenu : '');
const chapterOpen = ref<boolean>(false);
const bottomBar = ref<HTMLElement | null>();
const pageHeight = ref<number>();

const openChapter = (chapterName: string) => {
  chapterOpen.value = currentChapter.value !== chapterName;
  currentChapter.value = chapterOpen.value ? chapterName : '';
};

watch(
    () => chapterOpen.value,
    (newValue) => {
      if (bottomBar.value) {
        if (newValue) bottomBar.value.style.bottom = '50vh';
        else bottomBar.value.style.bottom = '0';
        emit('open:bar', currentChapter.value);
      }
    }
);

watch(
    () => currentChapter.value,
    (newValue, oldValue) => emit('open:bar', newValue)
);

const slideDownEventHandler = (evt: TouchEvent) => {
  if (bottomBar.value) {
    chapterOpen.value = false;
    const touchCoordsY: number = evt.changedTouches[0].pageY;
    if (pageHeight.value && pageHeight.value - touchCoordsY <= pageHeight.value / 4) {
      currentChapter.value = '';
      chapterOpen.value = false
    }
    else if (pageHeight.value && pageHeight.value - touchCoordsY > pageHeight.value / 4) {
      currentChapter.value = currentChapter.value ? currentChapter.value : 'map';
      chapterOpen.value = true
    }
  }
}

onMounted(() => {
  pageHeight.value = window.innerHeight;
  bottomBar.value = document.getElementById('bottom-bar');
  if (bottomBar.value) bottomBar.value.addEventListener('touchmove', slideDownEventHandler);
});
</script>

<template>
  <div id="bottom-bar" class="grid bottom m-0 align-content-center lg:align-content-start justify-content-center lg:py-5">
    <template v-for="chapter in bottomBarStructure">
      <div class="col-2 lg:col-12 mx-1" :class="chapter.class">
        <div class="chapter-button mx-auto" :class="{'active-chapter': currentChapter === chapter.name}" @click="openChapter(chapter.name)">
          <span class="material-icons-round" :class="{'active-icon': currentChapter === chapter.name}">{{chapter.icon}}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
span {
  color: var(--primary-color);
  cursor: pointer;
}
</style>
