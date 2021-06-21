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
  console.log('getInfo', name, data)
  const res = [], info = {};
  const logger = (e) => {
    res.push(e.message)
  }
  const ffmpeg = await initFFmpeg(
    logger
  );
  ffmpeg.FS('writeFile', name, data);
  await ffmpeg.run('-i', name).then(() => {
    console.log(res);
    let flag = false
    let message = res
      .filter(it => flag || (flag = it.includes('Metadata')))
      .filter(it => ['Metadata:', 'At least one output file must be specified', 'FFMPEG_END'].every(t => !it.includes(t)))
      .join('')
    console.log(message)
    // 正则
    


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