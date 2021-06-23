<template>
  <div class="container">
    <div class="title">
      <span>视频信息：</span>
      <el-radio-group :value="type" size="mini" >
        <el-radio-button label="before" @click.native="changeType('before')">原文件</el-radio-button>
        <el-radio-button label="after" @click.native="changeType('after')">转换后</el-radio-button>
      </el-radio-group>
    </div>
    <div class="info">
      {{detail}}
    </div>
  </div>
</template>
<script>
import { getVideoInfo } from '../utils/ffmpeg';

export default {
  name: 'Detail',
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    type() {
      return this.$store.state.show.type;
    },
    index() {
      return this.$store.state.show.index;
    },
    video_list() {
      return this.$store.state.video_list;
    },
    video() {
      const {video_list, type, index} = this;
      return video_list[index][type]
    },
    detail() {
      const { video } = this;
      return JSON.stringify(video.info);
    },
  },
  watch: {
    video: {
      immediate: true,
      handler: async function() {
        const { video } = this;
        const { data, info } = video;
        if(data && !info) {
          this.loading = true;
          console.log('读取视频信息', video);
          video.info = await getVideoInfo(video);
          this.loading = false;
        }
      }
    }
  },
  methods: {
    changeType(type) {
      this.$store.commit('setShowType', type)
    }
  }

}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  /* padding: 20px 0; */
  box-sizing: border-box;
  display: block;
}
.textarea {
  /* overflow: hidden; */
}
.info {
  overflow-wrap: break-word;
}

</style>
