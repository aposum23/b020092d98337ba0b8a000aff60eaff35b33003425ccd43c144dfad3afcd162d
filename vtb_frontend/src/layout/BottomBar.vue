<script setup lang="ts">
import {ref} from "vue";

const bottomBarStructure = [
  {name: 'close', icon: 'east', class: 'close-button'},
  {name: 'settings', icon: 'settings', class: 'settings-button'},
  {name: 'favorite', icon: 'favorite', class: 'favorite-button'},
  {name: 'map', icon: 'map', class: 'map-button'},
  {name: 'bookmark_added', icon: 'bookmark_added', class: 'bookmark-button'},
  {name: 'time', icon: 'schedule', class: 'time-button'},
]

const currentChapter = ref<string>('map');

const openChapter = (chapterName: string) => {
  currentChapter.value = chapterName;
}
</script>

<template>
  <div class="grid bottom m-0 align-content-center lg:align-content-start justify-content-center lg:py-5">
    <template v-for="chapter in bottomBarStructure">
      <div class="col-2 lg:col-12 mx-1" :class="chapter.class">
        <div class="chapter-button mx-auto" :class="{'active-chapter': currentChapter === chapter.name}" @click="openChapter(chapter.name)">
          <span class="material-icons-round" :class="{'active-icon': currentChapter === chapter.name}">{{chapter.icon}}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
span {
  color: var(--primary-color);
  cursor: pointer;
}
</style>
