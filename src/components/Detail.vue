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
      const { video: {info} } = this;
      const str = info ? Object.keys(info).map(it =>  `${it}: ${info[it]}`) : ['']
      return str.join('\r\n');
    },
  },
  watch: {
    video: {
      immediate: true,
      handler: async function() {
        const { video } = this;
        const { data, info, type, name } = video;
        if(data && !info) {
          this.loading = true;
          // video.info = await getVideoInfo(video);
          window.$ffprobe.onmessage = (e) => {
            console.log('ffprobe', e.data)
          }
          setTimeout(() => {

            window.$ffprobe.postMessage([
              'get_file_info', 
              new File(data, name, { type })
            ])
          }, 1000)
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
  white-space: pre-line;
  text-align: left;
}

</style>
