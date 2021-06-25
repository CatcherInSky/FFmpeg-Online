const constant = {
  encoder: {
    'mp4/h264': '-codec:v libx264',
    'mp4/h265': '-codec:v libx265',
    'webm': '-codec:v libvpx',
    'ogv': '-codec:v libvorbis',
  },
  format: {
    '-codec:v libx264': 'video/mp4',
    '-codec:v libx265': 'video/mp4',
    '-codec:v libvpx': 'video/webm',
    '-codec:v libvorbis': 'video/ogv',
  },
  size:  {
    '1920×1080': '-s 1920x1080',
    '720×480': '-s 720x480',
    '540×960': '-s 540x960',
  },
  speed: {
    '0.5': '-filter_comlex [0:v]setpts=2*PTS[v];[0:a]atempo=0.5[a] -map [v] -map [a]',
    '1': ' ',
    '2': '-filter_comlex [0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a] -map [v] -map [a]',
  }
  
  // video_quality: [
  //   'low high',
  // ],

};
const createOptions = (obj) => Object.keys(obj).map(key => ({ label: key, value: obj[key] }));
export const options = {
  // format: createOptions(constant.format),
  encoder: createOptions(constant.encoder),
  size: createOptions(constant.size),
  speed: createOptions(constant.speed),
}
const createMap = (obj) => new Map(Object.entries(obj))
export const map = {
  format: createMap(constant.format)
}