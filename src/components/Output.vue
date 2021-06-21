<template>
  <div class="container" ref="textarea">
    <el-progress v-if="propgress > 0" :text-inside="true" :stroke-width="14" :percentage="propgress" />
    <el-input 
      readonly
      resize="none"
      type="textarea"
      placeholder="请修改配置"
      class="textarea"
      :rows="rows"
      :value="descrption"
    />
  </div>
</template>
<script>

export default {
  name: 'Output',
  data() {
    return {
      rows: 5
    }
  },
  computed: {
    propgress() {
      return Number(this.$store.state.detail.progress.toFixed(2) || '0.00');
    },
    descrption() {
      return this.$store.state.detail.descrption_list.join('\n');
    }
  },
  mounted() {
    this.getTextareaRows()
  },
  methods: {
    getTextareaRows() {
      const size = this.$refs.textarea.getBoundingClientRect(), padding = 80;
      this.rows = Math.floor((size.height - padding) / 21);
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
