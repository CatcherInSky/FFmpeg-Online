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
      <el-button size="mini" type="primary"
        :disabled="disabled"
        @click="confirm(video)"
      >转换</el-button>
      <el-button
        v-if="video_list.length > 1"
        size="mini" type="primary"
        @click="confirm_batch"
      >批量转换</el-button>
      <el-button size="mini" type="primary"
        @click="export_video(video)"
      >导出</el-button>
    </div>
  </div>
</template>
<script>

import { getParams } from '../utils/other.js';
import { transformVideo } from '../utils/ffmpeg.js';

export default {
  name: 'Setting',
  data() {
    return {
    }
  },
  computed: {
    // type() {
    //   return this.$store.state.show.type;
    // },
    index() {
      return this.$store.state.show.index;
    },
    disabled() {
      return this.index === null;
    },
    video_list() {
      return this.$store.state.video_list;
    },
    video() {
      const {video_list, index} = this;
      return index === null ? index : video_list[index]
    },

  },
  mounted() {
    getParams()
  },
  methods: {
    cancel() {

    },
    async confirm(video) {
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
      transformVideo(video)
      // transformVideo(this.video_list[0]);
      return;
    },
    confirm_batch() {
      this.video_list.forEach(async (video) => {
        await confirm(video);
      })
    },
    export_video({after: {name, data, type}}) {
      // 导出
      const src = URL.createObjectURL(
        new Blob([data], { type })
      );
      const el = document.createElement('a');
      el.setAttribute('href', src);

      el.setAttribute('download', name);
      el.click();
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
