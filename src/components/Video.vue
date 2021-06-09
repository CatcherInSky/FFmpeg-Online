<template>
  <div>
    <video ref="video" class="video-js vjs-default-skin vjs-big-play-centered">
      <source />
    </video>
  </div>
</template>
<script>

export default {
  name: 'Video',
  props: {
    video: {
      type: Object,
    }
  },
  mounted() {
    this.initVideo();
  },
  methods: {
    initVideo() {
      const {$refs: {video: videoDom}, video: {Unit8Array, type, name}} = this;
      const source = [{src: URL.createObjectURL(new Blob([Unit8Array]), {type}), type}];
      console.log(source);
      let player = this.$video(videoDom, {
        techOrder: ['html5',], 
        // poster: '',
        name,
        fluid: true,
        sources: [{src: URL.createObjectURL(new Blob([Unit8Array]), {type}), type}],
        perload: 'auto',
        controls: true,
        
      })
      console.log(player);
    }
  }
}
</script>

<style scoped>


</style>
