'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

// TODO: this is not working... fix!
import FractalWorker from 'worker-loader!../worker/fractal.worker';
// import FractalWorker from '../worker/fractal.worker';
// import GifWorker from './gif.worker';

// import BranchWorker from '../worker/branch.worker';

// let bitmapURL = null;
let ctx: CanvasRenderingContext2D | null;
// let gif;
let time = Date.now();
const Fractal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  // TODO randomize angleArea in quadrants
  // TODO add logic to send branches away from clusterfuck of branching
  //  (length heightened, direction minimized to try to escape center
  //   const gifWorkerManager = new GifWorkerManager();

  // const fractalWorker = new FractalWorker();

  const updateContainer = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;

      if (dimensions.width !== width || dimensions.height !== height) {
        setDimensions({
          width,
          height,
        });
      }
    }
  }, [dimensions.height, dimensions.width]);

  useEffect(() => {
    updateContainer();

    window.addEventListener('resize', updateContainer);

    return window.removeEventListener('resize', updateContainer);
  }, [updateContainer]);

  useEffect(() => {
    const fractalWorker = new FractalWorker();
    // const imports = new URL('../../public/fractal.worker.js', import.meta.url);
    // const fractalWorker = new Worker(
    //   // new URL('../../public/fractal.worker', import.meta.url)
    //   imports
    //   // '/fractal.worker.js'
    // );

    // console.log(imports);

    console.log('FRACTAL', fractalWorker);

    // const fractalWorker = new Worker(
    //   new URL('../worker/fractal.worker.js', import.meta.url)
    // );

    const config = {
      // strokeStyle: 'rgba(0, 153, 255, 1)',
      strokeStyle: 'rgba(255, 255, 255, 1)',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      foregroundColor: 'rgba(0 ,0 ,0 , 0.5)',

      width: window.innerWidth,
      height: window.innerHeight,
      angleArea: Math.PI,

      minLength: 50,
      maxLength: 150,
      minBranches: 2,
      maxBranches: 3,
      maxDepth: 14,

      limitX: (window.innerWidth / 2) * 1.5,
      limitY: (window.innerWidth / 2) * 1.5,

      // longestAnimationTime: 0.05,
      animateAllBranches: false,
      allowBranchesToGoBackward: false,

      gifDelay: 50,
      gifQuality: 20000,
      gifRepeat: 0, // -1 no repeat
    };

    let previousAnimationFrameHandle: number | undefined;

    fractalWorker.postMessage(config);
    fractalWorker.onmessage = (e: MessageEvent) => {
      console.log(e);

      if (previousAnimationFrameHandle) {
        cancelAnimationFrame(previousAnimationFrameHandle);
      }

      console.log(e);

      // eslint-disable-next-line complexity
      previousAnimationFrameHandle = requestAnimationFrame(() => {
        if (e.data.message && e.data.message === 'done') {
          //   gifWorkerManager.done();
          fractalWorker.terminate();
          return;
        }

        if (canvasRef.current !== null) {
          const canvas = canvasRef.current;
          // const ctx = canvas.getContext('bitmaprenderer');

          if (!ctx) {
            ctx = canvas.getContext('2d');
          }

          if (ctx) {
            const bitmap = e.data.bitmap;

            ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
            if (Date.now() - time > config.gifDelay) {
              console.log('yep');
              // gifWorkerManager.postMessage({
              //   image: ctx.getImageData(0, 0, canvas.width, canvas.height).data,
              //   config: config,
              // });
              time = Date.now();
            } else {
            }

            // canvas.toBlob(function (blob) {
            // if (blob) {
            //   bitmapURL = URL.createObjectURL(blob);
            // }
            // let a = document.createElement('a');
            // a.href = URL.createObjectURL(new Blob(encoder.createReadStream().))
            // const canvasDownload = document.getElementById('canvas-download');
            // canvasDownload.href = canvas.toDataURL('image/jpg');
            // canvasDownload.download = 'rsymingt.jpg';
            // });

            // if(!rec) {
            //     stream = canvas.captureStream(20);
            //     rec = new MediaRecorder(stream, {
            //         mimeType: "video/webm; codecs=vp8"
            //     });
            //
            //     // let video = document.getElementById('canvas-video');
            //     // video.srcObject = stream;
            //
            //     rec.ondataavailable = e => {
            //         // console.log(e.data);
            //         chunks.push(e.data);
            //     };
            //
            //     rec.onstop = e => console.log('stop');
            //
            //     rec.start(100);
            // }
            // if(rec) {
            //     let videoBlob = new Blob(chunks, {type: 'video/mp4'});
            //
            //     // let videoObject = document.createElement('video');
            //     // videoObject.srcObject = videoBlob;
            //     // document.write(videoObject);
            //
            //     let videoURL = URL.createObjectURL(videoBlob);
            //
            //     const canvasDownload = document.getElementById('canvas-video-download');
            //     canvasDownload.href = videoURL;
            //     canvasDownload.download = 'rsymingt.mp4';
            // }

            // let bitmapBlob = new Blob([bitmap]);
            // let objectURL = URL.createObjectURL(bitmapBlob);
            // setBitmap(objectURL)
          }
        }
      });
    };

    return () => {
      fractalWorker.terminate();
    };
  }, []);

  return (
    // <div
    //   style={{
    //     // backgroundColor: "rgba(0 ,0 ,0 , 1)",
    //     position: 'fixed',
    //     // zIndex: '-2',
    //     top: 0,
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     overflow: 'auto',
    //   }}
    // >
    <div className="absolute inset-0" ref={containerRef}>
      <canvas
        style={{
          filter: 'blur(2px)',
          // position: 'absolute',
          zIndex: '10',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        onScroll={() => console.log('scrolling')}
        ref={canvasRef}
        width={`${dimensions.width}px`}
        height={`${dimensions.height}px`}
      />
      {/* <div
        style={{
          // backgroundColor: "rgba(0 ,0 ,0 , 0.5)",
          position: 'fixed',
          zIndex: '0',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      /> */}
      {/* <a
        id={'canvas-download'}
        style={{
          backgroundColor: 'rgba(0 ,0 ,0 , 0.5)',
          position: 'fixed',
          zIndex: '1',
          color: 'white',
        }}
        // href={bitmap}
        // onClick={(el) => {}}
      >
        download
      </a>
      <a
        id={'canvas-video-download'}
        style={{
          backgroundColor: 'rgba(0 ,0 ,0 , 0.5)',
          position: 'fixed',
          top: 30,
          zIndex: '1',
          color: 'white',
        }}
        // href={bitmap}
        // onClick={async (el) => {
        //   console.log('waiting');
        //   //   const blob = await gifWorkerManager.getGifBlob();
        //   const a = document.createElement('a');
        //   //   a.href = URL.createObjectURL(blob);
        //   a.download = 'test.gif';
        //   a.click();
        //   //     .then(blob => console.log(blob));
        // }}
      >
        Download Gif
      </a> */}
      {/* {props.children} */}
      {/* </div> */}
    </div>
  );
};

export default Fractal;
