import $store from '../store';

export const getParams = () => {
  console.log($store.state.setting)
  const {name, format, encoder, size, speed} = $store.state.setting;

  return {
    name,
    format,
    params: [...encoder, ...size, ...speed],
  }
}

export const getVideoType = (type = 'video/mp4') => {
  const res = type.match(/(?<=video\/).*/)
  return res && res[0] ? res[0] : 'mp4'
}

