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
      <el-form-item label="加速">

      </el-form-item>
      <el-form-item label="水印">

      </el-form-item>
      <el-form-item label="重命名">

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

// import { createFFmpeg } from '@ffmpeg/ffmpeg/dist/ffmpeg.min.js'
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { getParams } from '../utils/other.js';
import { getVideoInfo, transformVideo } from '../utils/ffmpeg.js';

export default {
  name: 'Setting',
  computed: {
    video_list() {
      return this.$store.state.video_list;
    },

  },
  mounted() {
    getParams()
  },
  methods: {
    cancel() {

    },
    async confirm() {
      const config = {
        input: {
          command: '-i',
          name: this.video_list[0].name,
          format: 'mp4',
        },
        output: {
          name: 'output',
          format: 'webm',
        },
        // 多线程
        multithreading: {
          command: '-threads',
          value: '5',
        },
        // 编码效率
        preset: {
          command: '-preset',
          value: 'ultrafast',
        },
        // 尺寸
        size: {
          command: '-s',
          value: '1920x1080'
        }


      };
      getVideoInfo(this.video_list[0]);
      // transformVideo(this.video_list[0]);
      return;
    },
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
