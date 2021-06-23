<template>
    <video ref="video" class="video-js vjs-default-skin vjs-big-play-centered">
      <source type="video/mp4"/>
      <source type="video/webm"/>
      <source type="video/ogg"/>
    </video>
</template>
<script>

export default {
  name: 'Video',
  data() {
    return {
      player: null
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
  },
  watch: {
    video(val) {
      this.changeVideo(val);
    }
  },
  mounted() {
    this.initVideo();
  },
  methods: {
    initVideo() {
      const {$refs: {video: videoDom}, video} = this;
      const config = this.createConfig(video)
      console.log('初始化player', config)
      if(!config) {
        return;
      }
      this.player = this.$video(videoDom, config)
      console.log(this.player);
    },
    changeVideo({data, type}) {
      this.player && this.player.src({
        src: URL.createObjectURL(new Blob([data]), {type}), type
      })
    },
    createConfig({name, type, data}) {
      if(!data) {
        console.log('无视频数据可渲染')
        return null;
      }
      return {
        techOrder: ['html5'], 
        // poster: '',
        name,
        fluid: true,
        sources: [{src: URL.createObjectURL(new Blob([data]), {type}), type}],
        perload: 'auto',
        controls: true,
      };
    }
  },
}
</script>

<style scoped>


</style>
