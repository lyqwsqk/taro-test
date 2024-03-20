<template>
  <view class="blue">
    <pickerView />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import picker from '../../components/picker'
const pickerView = ref(picker)

</script>

<style lang="scss">
.blue {
  color: blue
}
</style>
