<template>
<div class="changeData">
  <input v-model="dataFromApp.name">
  <input v-model="dataFromApp.login">
</div>
</template>

<script>
export default {
name: "ChangeData",
  props:{
    dataFromApp:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style lang="scss">

</style>