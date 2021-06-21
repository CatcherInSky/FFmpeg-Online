import $store from '../store';

export const getParams = () => {
  console.log($store.state.setting)
}