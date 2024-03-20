<template>
  <view>
    <button @tap="add">add</button>
    <view>count: {{_commonStore.count}}</view>
    <my-picker :list="list" :on-button-click="onButtonClick"></my-picker>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Picker from '../../taro/components/picker/index'
import '../../taro/css/components/picker/index.css'

import pinia from "../../stores"
import { commonStore } from '../../stores/common'
const _commonStore = commonStore(pinia);

const MyPicker = ref(Picker)
const add = () =>{
  _commonStore.setCount()
}
</script>
