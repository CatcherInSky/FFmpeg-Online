<template>
  <div class="container">
    <el-form 
      label-position="top"
    >
      <el-form-item label="格式">
        <el-select size="mini" v-model="form.encoder">
          <el-option
            v-for="{label, value} in encoder"
            :key="label"
            :label="label"
            :value="value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select size="mini" v-model="form.size">
          <el-option
            v-for="{label, value} in size"
            :key="label"
            :label="label"
            :value="value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="加速">
        <el-select size="mini" v-model="form.speed">
          <el-option
            v-for="{label, value} in speed"
            :key="label"
            :label="label"
            :value="value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="码率">
        <el-select>

        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="水印">

      </el-form-item> -->
      <el-form-item label="重命名">
        <el-input size="mini" placeholder="默认为output" v-model="form.name" />
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

import { transformVideo } from '../utils/ffmpeg.js';
import { options, map } from '../constant/constant.js';

export default {
  name: 'Setting',
  data() {
    return {
      ...options, ...map,
      form: {
        encoder: '',
        size: '',
        speed: '',
        name: '',
      },
    }
  },
  computed: {
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
      return index === null ? index : video_list[index];
    },
  },
  watch: {
    form: {
      deep: true,
      handler({encoder, size, speed, name}) {
        this.$store.commit('setSetting', {
          encoder: encoder && encoder.split(' '),
          size: size && size.split(' '),
          speed: speed && speed.split(' '),
          name,
          format: encoder && this.format.get(encoder)
        })
      }
    }
  },
  methods: {
    cancel() {
    },
    async confirm(video) {
      transformVideo(video)
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
