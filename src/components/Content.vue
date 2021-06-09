<template>
  <div>
    <el-tabs v-model="selected_tab" type="card" >
      <el-tab-pane label="新增视频" name="add" :closable="false"/>
      <el-tab-pane
        closable
        v-for="(item, index) in video_list"
        :key="index"
        :label="item.name"
        :name="index.toString()"
      />
    </el-tabs>
    <div v-if="selected_tab == 'add'">
      <Upload />
    </div>
    <div v-else>
      <Video :video="video_list[selected_tab]"/>
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
  computed: {
    video_list() {
      return this.$store.state.video_list;
    },

  },
  data() {
    return {
      selected_tab: 'add',
    }
  },
  methods: {
  }
}
</script>

<style scoped>


</style>
