<template>
  <div style="height: 100%">
    <el-progress :text-inside="true" :stroke-width="14" :percentage="70" />
    <el-input 
      readonly
      resize="none"
      type="textarea"
      placeholder="请修改配置"
      :autosize="{minRows: 6}"
    />
  </div>
</template>
<script>

export default {
  name: 'Detail',

}
</script>

<style scoped>


</style>
