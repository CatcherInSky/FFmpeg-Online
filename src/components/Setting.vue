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
export default {
  name: 'Setting',
  computed: {
    video_list() {
      return this.$store.state.video_list;
    },

  },
  mounted() {
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
      const ffmpeg = createFFmpeg({
        log: true,
        logger: (e) => {
          console.log('log', e)
          this.$store.dispatch('addDescrption', e.message)
        },
        progress: (e) => { 
          console.log('progress', e)
          this.$store.commit('setProgress', e.ratio * 100)
        },
      });
      await ffmpeg.load();
      ffmpeg.FS('writeFile', this.video_list[0].name, this.video_list[0].Unit8Array);

      await ffmpeg.run(
        '-i', this.video_list[0].name,
        '-threads', '8', '-preset', 'ultrafast', 
        // 给流进行编码
        "-segment_format_options", "movflags=frag_keyframe+empty_moov+default_base_moof",
        // 编码为 5 秒钟的片段
        "-segment_time", "5",
        'output.webm',
        ).then(res => {
        console.log('run then', res);
      });

      const output = ffmpeg.FS('readFile', 'output.webm');

      const src = URL.createObjectURL(
        new Blob([output.buffer], { type: "video/webm" })
      );
      console.log(src);

      // 导出
      const el = document.createElement('a');
      el.setAttribute('href', src);
      el.setAttribute('download', 'output.webm');
      el.click();
      return ;

      // const mediaSource = new MediaSource();
      // src = URL.createObjectURL(mediaSource);

      // const sourceBuf = mediaSource.addSourceBuffer(`video/mp4; `)
      // mediaSource.duration = 5;
      // sourceBuf.timestampOffset = 0;
      // sourceBuf.appendBuffer(buffer);

      // mediaSource.duration = 10 + index * 5;
      // sourceBuf.timestampOffset = 5 + index * 5;
      // sourceBuf.appendBuffer(buffer);


      // mediaSource.endOfStream();
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
