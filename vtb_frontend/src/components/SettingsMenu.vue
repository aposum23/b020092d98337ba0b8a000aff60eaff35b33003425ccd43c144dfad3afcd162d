<script setup lang="ts">
import {ref} from "vue";

type OptionType = {id: string, label: string, value: boolean};

const optionsStruct = ref<OptionType[]>([
  {id: 'location', label: 'Разрешить местоположение', value: false},
  {id: 'promotionNotice', label: 'Уведомлять об акциях', value: false},
  {id: 'noticeOfProposals', label: 'Уведомлять о предложениях', value: false},
  {id: 'notifyAboutQueue', label: 'Уведомлять об очереди', value: false},
  {id: 'notifyAboutChangesInSchedule', label: 'Уведомлять об изменениях в расписании', value: false},
]);

const experementalValue = ref(true);
</script>

<template>
  <div class='settings col-12 px-5'>
    <template v-for="(property, index) in optionsStruct" :key="property.id">
      <div class='grid my-1'>
        <div class='col-9 text-left'>
          <p class="m-0">{{ property.label }}</p>
        </div>
        <div class='col-3'>
          <div class='vertical-align-text-top'>
            <InputSwitch v-model="optionsStruct[index].value" :input-id="property.id"/>
          </div>
        </div>
    </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
</style>