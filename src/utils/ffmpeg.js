import { createFFmpeg } from "@ffmpeg/ffmpeg";
import $store from '../store'
export const initFFmpeg = async (
  logger = (e) => {
    $store.dispatch('addDescrption', e.message)
  },
  progress = (e) => {
    $store.commit('setProgress', e.ratio * 100)
  },
) => {
  const ffmpeg = createFFmpeg({
    // corePath: "../../node_modules/@ffmpeg/core/dist/ffmpeg-core.js",
    log: true,
    logger,
    progress,
  });
  await ffmpeg.load();
  return ffmpeg;
}
export const getVideoInfo = async ({name, Unit8Array: data}) => {
  // 正则
  // 格式 编解码器 文件大小 时长 码率模式 码率 创建日期
  // 格式 尺寸 帧率模式 帧率 色彩空间 色度抽样 位深 流大小
  // 格式 码率 声道数 采样率 压缩模式 流大小
  let res = [], info = {};
  const logger = (e) => res.push(e.message);
  const ffmpeg = await initFFmpeg( logger );
  ffmpeg.FS('writeFile', name, data);
  // ffprobe ?
  await ffmpeg.run('-i', name).then(() => {
    let flag = false, type = '';
    try {
      let message = res
        .filter(it => flag || (flag = it.includes('Input')))
        .filter(it => ['Input', 'Metadata:', 'At least one output file must be specified', 'FFMPEG_END'].every(t => !it.includes(t)))
        .map(it => it.replace(/Stream(.*?)\([a-z]+\):/g, '').trim())
        .map(it => {
          if(it.includes('Video')) {
            type = 'video';
          } else if(it.includes('Audio')) {
            type = 'audio'
          }
          return type.length > 0 ? `${type}_${it}` : it;
        });
      message = `,${message.join(',')},:`.replace(/(?<=,)(.*?):(.*?),(?=\s*\S*\s*:)/g,'"$1":"$2",');
      message = JSON.parse('{' + message.slice(1, message.length - 2) + '}')
      Object.keys(message).forEach(key => {
        if(key.includes('Video')) {
          // const list = message[key].split(', ');
          // h264 (Main) (avc1 / 0x31637661), yuv420p(tv, bt709), 1280x720, 10619 kb/s, 30 fps, 30 tbr, 30k 
          // info.video = {}
          info.video = message[key].trim();
        } else if(key.includes('Audio')) {
          // const [ format, sampling_frequency, sound_track, decode, bit_rate ] = message[key].split(', ');
          // info.audio = { format, sampling_frequency, sound_track, decode, bit_rate }
          info.audio = message[key].trim(); 
        } else {
          info[key.trim()] = message[key].trim();
        }
      })
      console.log('success', info)
    } catch(err) {
      console.log('fail', err);
      info = {};
    }
  });
  return info;
}
export const transformVideo = async ({name, Unit8Array: data}) => {
  console.log('getInfo', name, data)
  const ffmpeg = await initFFmpeg();
  ffmpeg.FS('writeFile', name, data);
  await ffmpeg.run(
    '-i', name,
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
}