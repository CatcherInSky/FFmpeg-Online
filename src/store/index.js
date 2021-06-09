import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    video_list: [],
    detail: {
      progress: 0,
      descrption_list: [],
    },
    setting: {
      
    },
  },
  mutations: {
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
  },
  actions: {
    addVideo({commit, state}, video) {
      commit('setVideo', [...state.video_list, video]);
    },
    addDescrption({commit, state: {detail}}, desc) {
      commit('setDescrption', [...detail.descrption_list, desc]);

    }
  },
})