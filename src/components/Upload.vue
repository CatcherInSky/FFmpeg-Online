<template>
  <el-upload 
    ref="upload"
    multiple
    drag
    accept=".mp4,.webm,.ogg,.ogv"
    action="https://jsonplaceholder.typicode.com/posts/"
    :limit="limit"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="upload"
    :on-exceed="exceed"

    class="upload"
  >
    <div>
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </div>
    <div class="el-upload__tip" slot="tip">只能上传视频文件</div>
  </el-upload>  
</template>
<script>
// flv?结合flvjs？ https://blog.csdn.net/boyit0/article/details/84395347

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
          name,
          before: {
            lastModified: raw.lastModified,
            name,
            type: raw.type,
            size: raw.size,
            data: new Uint8Array(result, 0, result.byteLength),
            info: null,
          },
          after: {
            name: '',
            type: '',
            size: 0,
            data: undefined,
            info: null,
          },
        })
      };
      status === 'ready' && reader.readAsArrayBuffer(raw)
    },
    exceed() {},
  },
}
</script>

<style scoped>
.upload {
  width: 100%;
  height: 60vh;
}
.upload /deep/ .el-upload .el-upload-dragger {
  width: calc(80vw - 40px);
  height: calc(60vh - 30px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-upload__text {
  margin-bottom: 40px;
}

</style>
