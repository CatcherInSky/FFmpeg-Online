import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // before after
    show: {
      type: 'before',
      index: null,
    },
    showType: 'before',
    // {
    //   uid: raw.uid,
    //   before: {
    //     lastModified: raw.lastModified,
    //     name,
    //     type: raw.type,
    //     size: raw.size,
    //     data: new Uint8Array(result, 0, result.byteLength),
    //     info: null,
    //   },
    //   after: {
    //     name: '',
    //     type: '',
    //     size: 0,
    //     data: [],
    //     info: null,
    //   },
    // }
    video_list: [],
    detail: {
      // 0-100
      progress: 0,
      // ffmpeg输出
      descrption_list: [],
    },
    setting: {
      name: '',
      format: '',
      encoder: [],
      speed: [],
      size: [],
    },
  },
  mutations: {
    setShowType(state, type) {
      state.show.type = type;
    },
    setShowIndex(state, index) {
      state.show.index = index;
    },
    setVideo(state, video_list) {
      state.video_list = video_list;
    },
    setProgress({detail}, progress) {
      detail.progress = progress;
      if(progress > 100) {
        setTimeout(() => detail.progress = 0, 1000);
      }
    },
    setDescrption({detail}, desc) {
      detail.descrption_list = desc;
    },
    setSetting(state, setting) {
      state.setting = setting;
    }
  },
  actions: {
    addVideo({commit, state}, video) {
      state.video_list.map(it => it.name).includes(video.name)
        ? console.log('视频重复', name)
        : commit('setVideo', [...state.video_list, video]);
    },
    deleteVideo({commit, state}, index) {
      const temp = state.video_list.concat([]);
      temp.splice(index, 1);
      commit('setVideo', temp);
    },
    addDescrption({commit, state: {detail}}, desc) {
      commit('setDescrption', [...detail.descrption_list, desc]);
    }
  },
})