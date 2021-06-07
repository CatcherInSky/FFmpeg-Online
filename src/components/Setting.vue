<template>
  <div class="container">
    <el-form 
      label-position="top"
    >
      <el-form-item label="格式">
        <el-select>
          
        </el-select>
      </el-form-item>
      <el-form-item label="码率">
        <el-select>

        </el-select>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select>
          
        </el-select>
      </el-form-item>
      <el-form-item label="水印">

      </el-form-item>

    </el-form>
    <span style="flex: 1" />
    <div style="display: flex; justify-content: flex-end">
      <el-button size="mini" @click="cancel">重置</el-button>
      <el-button size="mini" type="primary" @click="confirm">转换</el-button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Setting',
  methods: {
    cancel() {},
    confirm() {},
  },
}
</script>

<style scoped>
.container {
  text-align: left; 
  padding: 20px; 
  display: flex; 
  flex-direction: column;
  min-height: calc(100% - 40px);
}

</style>
