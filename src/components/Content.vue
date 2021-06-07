<template>
  <div>
    <el-tabs v-model="selectedItem" type="card" editable @edit="edit">
      <el-tab-pane
        v-for="item in list"
        :key="item.value"
        :label="item.label"
        :name="item.value"
      />

    </el-tabs>
    <div v-if="selectedItem == 'add'">
      <Upload />
    </div>
    <div v-else>
      <Video />
    </div>
  </div>
</template>
<script>
import Video from './Video.vue';
import Upload from './Upload.vue';

export default {
  name: 'Content',
  components: {
    Video,
    Upload,
  },
  data() {
    return {
      selectedItem: 'add',
      list: [
        {
          label: '新增视频',
          value: 'add',
        }
      ],
    }
  },
  methods: {
    edit(targetName, action) {
      if(action === 'add') {

      } else if(action === 'remove') {
        
      }
    },
  }
}
</script>

<style scoped>


</style>
