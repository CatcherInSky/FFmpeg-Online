// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index.js';
import Video from 'video.js'
import video_zhCN from 'video.js/dist/lang/zh-CN.json'
import video_en from  'video.js/dist/lang/en.json'
import 'video.js/dist/video-js.css'
import '@ffmpeg/ffmpeg/dist/ffmpeg.min.js'
// import ffprobe from './wasm/ffprobe/index.js'
// console.log(ffprobe)



Video.addLanguage('zh-CN', video_zhCN);
Video.addLanguage('en', video_en);
Vue.prototype.$video = Video
Vue.config.productionTip = false
Vue.use(ElementUI);

// const ffprobe = new Ffprobe();
// console.log('ffprobe', ffprobe)
// ffprobe.onmessage = function(e) {
//   console.log('onmessage', e.data)
// }
// ffprobe.postMessage(['1', '1'])
// Vue.prototype.$ffprobe = ffprobe;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
