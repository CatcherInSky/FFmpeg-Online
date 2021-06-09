<template>
  <div class="container">
    <el-progress v-if="propgress > 0" :text-inside="true" :stroke-width="14" :percentage="propgress" />
    <el-input 
      readonly
      resize="none"
      type="textarea"
      placeholder="请修改配置"
      class="textarea"
      :autosize="{minRows: 6, maxRows: 10}"
      :value="descrption"
    />
  </div>
</template>
<script>

export default {
  name: 'Detail',
  computed: {
    propgress() {
      return Number(this.$store.state.detail.progress.toFixed(2) || '0.00');
    },
    descrption() {
      return this.$store.state.detail.descrption_list.join('\n');
    }
  }

}
</script>

<style scoped>
.container {
  height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
}
.textarea {
  /* overflow: hidden; */
}

</style>
