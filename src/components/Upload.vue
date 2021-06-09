<template>
  <div>
    <el-upload 
      ref="upload"
      multiple
      drag
      accept=".mp4,.rmvb"
      action="https://jsonplaceholder.typicode.com/posts/"
      :limit="limit"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="upload"
      :on-exceed="exceed"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传视频文件</div>
    </el-upload>  
  </div>
</template>
<script>

export default {
  name: 'Upload',
  props: {
    limit: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
    }
  },
  computed: {
    video_list() {
      return this.$store.state.video_list;
    }
  },
  methods: {
    upload(file) {
      const {name, raw, status} = file;
      const reader = new FileReader();
      reader.onload = ({target: {result}}) => {
        this.$store.dispatch('addVideo', {
          uid: raw.uid,
          lastModified: raw.lastModified,
          origin: {
            name,
            type: raw.type,
            size: raw.size,
            source: [],
          },
          transform: {
            name: '',
            type: '',
            size: 0,
            source: [],
          },
          name,
          type: raw.type,
          size: raw.size,
          Unit8Array: new Uint8Array(result, 0, result.byteLength)
        })
      };
      status === 'ready' && reader.readAsArrayBuffer(raw)
    },
    exceed() {},
  },
}
</script>

<style scoped>


</style>
