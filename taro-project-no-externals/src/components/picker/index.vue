<template>
  <view class="red">
    <view>{{_commonStore.count}}</view>
    <button @tap="add">add</button>
  </view>
</template>

<script lang="ts" setup>
import pinia from "../../stores"
import { commonStore } from '../../stores/common'
const _commonStore = commonStore(pinia);

const add = () =>{
  _commonStore.setCount()
}
</script>

<style lang="scss">
.red {
  color: red
}
</style>
