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




Video.addLanguage('zh-CN', video_zhCN);
Video.addLanguage('en', video_en);
Vue.prototype.$video = Video
Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
