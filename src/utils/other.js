import $store from '../store';

export const getParams = () => {
  console.log($store.state.setting)
  return [ 
    '-threads', '8', '-preset', 'ultrafast', 
    // 给流进行编码
    "-segment_format_options", "movflags=frag_keyframe+empty_moov+default_base_moof",
    // 编码为 5 秒钟的片段
    "-segment_time", "5",
  ];
}

export const getVideoType = (type = 'video/mp4') => {
  const res = type.match(/(?<=video\/).*/)
  return res && res[0] ? res[0] : 'mp4'
}

