import BranchWorker from './branch.worker';

// const _self = self; // eslint-disable-line no-restricted-globals

function centerDistance(x, y) {
  return Math.round(Math.sqrt(Math.pow(0 - x, 2) + Math.pow(0 - y, 2)));
}

// TODO randomize direction?
function generateBranches(
  _canvas,
  _ctx,
  angleArea,
  tilt,
  length,
  ox,
  oy,
  x,
  y,
  branches,
  branchArray,
  _width,
  _height
) {
  for (let b = 0; b < branches; b++) {
    // let newAngle = Math.round(Math.atan2(newY+ox, newX+oy)*180/Math.PI);

    let angle = ((2 * Math.PI) / branches) * b + angleArea / 2 + tilt;

    if (ox !== x || oy !== y) {
      const vx = x - ox;
      const vy = y - oy;

      const centerAngle = Math.atan2(vy, vx);

      const lowerBound = centerAngle - angleArea / 2;
      const upperBound = centerAngle + angleArea / 2;

      const bCoef = angleArea / (branches - 1);

      // console.log(bCoef);

      angle = bCoef * b + lowerBound;
    }

    // let angle = (2*Math.PI)/branches*b + angleArea/2 + tilt;
    const newX = Math.round(Math.cos(angle) * length) + x;
    const newY = Math.round(Math.sin(angle) * length) + y;

    const angleAreaDegrees = (angleArea * 180) / Math.PI;

    // nothing can be behind the point
    if (centerDistance(newX, newY) - centerDistance(x, y) < 0) {
      continue;
    }

    // nothing can go directly backwards
    // if(centerDistance(newX, newY) - centerDistance(x,y) < -length/2) continue;

    branchArray.push({
      newX,
      newY,
      x,
      y,
    });

    // draw line for branch
    // ctx.moveTo(x, y);
    // ctx.lineTo(newX, newY);
    //
    // ctx.clearRect(-width/2, -height/2, width, height);
    // ctx.stroke();
  }
}

function drawBranches(_canvas, ctx, branchArray, _width, _height, timeDiff) {
  branchArray.forEach((branch) => {
    const { x, y, newX, newY } = branch;

    ctx.moveTo(x, y);
    ctx.lineTo(timeDiff * (newX - x) + x, timeDiff * (newY - y) + y);
  });
}

async function animateBranches(
  canvas,
  ctx,
  branchArray,
  prevTime,
  time,
  config
) {
  const { width, height, longestAnimationTime } = config;

  const currentTime = new Date();

  if (
    longestAnimationTime &&
    (currentTime.getTime() - prevTime.getTime()) / 1000 > longestAnimationTime
  ) {
    currentTime.setTime(prevTime.getTime() + longestAnimationTime * 1000);
  }

  let timeDiff = (currentTime.getTime() - time.getTime()) / 1000;
  if (timeDiff > 1.0) {
    timeDiff = 1;
  }

  drawBranches(canvas, ctx, branchArray, width, height, timeDiff);

  if (timeDiff >= 1) {
  } else {
    await new Promise((resolve, _reject) => {
      requestAnimationFrame(async () => {
        await animateBranches(
          canvas,
          ctx,
          branchArray,
          currentTime,
          time,
          config
        );
        resolve();
      });
    });
  }
}

// angleArea <= 90
/*
determine branch direction
determine branch
(pseudo) randomize number of branches?
pseudo randomize direction of branches?
 */
// eslint-disable-next-line complexity
async function drawFractal(
  canvas,
  ctx,
  workers,
  promiseBranches,
  branchMemoryArray,
  ox,
  oy,
  x,
  y,
  angleArea,
  depth,
  _branch,
  width,
  height,
  config
) {
  if (Math.abs(x) < config.limitX && Math.abs(y) < config.limitY) {
    if (depth >= config.maxDepth) {
      return;
    }

    const branches = Math.round(
      Math.random() * (config.maxBranches - config.minBranches) +
        config.minBranches
    );
    const length =
      Math.random() * (config.maxLength - config.minLength) + config.minLength;
    let branchArray = [];

    // await generateBranches(canvas, ctx, angleArea, 0, length, ox, oy, x, y, branches, branchArray, width, height);

    branchMemoryArray.splice(0, 0, {
      x: ox,
      y: oy,
      newX: x,
      newY: y,
    });

    // let startTime = (new Date).getTime();
    const chunkSize =
      branchMemoryArray.length < workers.length
        ? branchMemoryArray.length
        : branchMemoryArray.length / workers.length;
    const promises = [];
    for (const w in workers) {
      const worker = workers[w];
      const chunk =
        parseInt(w) === workers.length - 1
          ? branchMemoryArray.splice(0)
          : branchMemoryArray.splice(0, chunkSize);

      if (chunk.length > 0) {
        worker.postMessage(
          Object.assign(
            {
              branchMemoryArray: chunk,
              width,
              height,
              branches, // max number
              length,
              angleArea,
            },
            config
          )
        );

        promises.push(
          new Promise((resolve, reject) => {
            worker.addEventListener('message', (e) => {
              if (!e) {
                reject(e);
              }
              resolve(e.data);
            });
          })
        );
      }
    }
    await Promise.all(promises).then((arrays) => {
      branchArray = branchArray.concat(...arrays);
    });
    // let endTime = (new Date).getTime();
    // console.log(`diff: ${(endTime - startTime)/1000}`)

    promiseBranches.push(promises);

    const newX = branchArray[0].newX;
    const newY = branchArray[0].newY;
    await drawFractal(
      canvas,
      ctx,
      workers,
      promiseBranches,
      branchArray,
      x,
      y,
      newX,
      newY,
      angleArea,
      depth + 1,
      0,
      width,
      height,
      config
    );
  } else {
    return;
  }
}

function commitCanvas(canvas, config) {
  const { width, height } = canvas;
  const { backgroundColor, foregroundColor } = config;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(-width / 2, -height / 2, width, height);

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.stroke();

  ctx.fillStyle = foregroundColor;
  ctx.fillRect(-width / 2, -height / 2, width, height);

  const bitmap = canvas.transferToImageBitmap();
  postMessage({ bitmap });
}

let done = false;
let animationsDone = false;

async function canvasService(canvas, config) {
  commitCanvas(canvas, config);

  if (!animationsDone) {
    setTimeout(() => {
      canvasService(canvas, config);
    }, 20);
  } else {
    // eslint-disable-next-line no-restricted-globals
    postMessage({ message: 'done' });
  }
}

async function animationService(
  canvas,
  ctx,
  workers,
  promiseBranches,
  animationPromises,
  config
) {
  let promiseBranch = [];
  while ((promiseBranch = promiseBranches.shift())) {
    const animationPromise = new Promise(async (resolve, _reject) => {
      await Promise.all(promiseBranch).then(async (arrays) => {
        let branchArray = [];
        branchArray = branchArray.concat(...arrays);

        requestAnimationFrame(async () => {
          await animateBranches(
            canvas,
            ctx,
            branchArray,
            new Date(),
            new Date(),
            config
          );
          resolve();
        });
      });
    });

    if (
      config.hasOwnProperty('animateAllBranches') &&
      config.animateAllBranches === true
    ) {
      animationPromises.push(animationPromise);
    } else {
      await animationPromise;
    }
  }

  if (done && !promiseBranches.length) {
    await Promise.all(animationPromises);
    // CLEANUP
    workers.forEach((worker) => worker.terminate());
    animationsDone = true;
    commitCanvas(canvas, config);
  } else {
    setTimeout(async () => {
      animationService(
        canvas,
        ctx,
        workers,
        promiseBranches,
        animationPromises,
        config
      );
    }, 20);
  }
}

async function fractalService(workers, config) {
  const { width, height, angleArea, animateAllBranches } = config;

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');

  canvasService(canvas, config).catch((err) => console.log(err));

  ctx.translate(width / 2, height / 2);

  ctx.beginPath();

  // randomize??
  ctx.strokeStyle = config.strokeStyle;

  const promiseBranches = [];
  animationService(canvas, ctx, workers, promiseBranches, [], config);
  await drawFractal(
    canvas,
    ctx,
    workers,
    promiseBranches,
    [],
    0,
    0,
    0,
    0,
    angleArea,
    0,
    -1,
    width,
    height,
    config
  );

  done = true;

  // ctx.closePath();
}

self.onmessage = async (e) => {
  // eslint-disable-line no-restricted-globals
  if (!e) {
    return;
  }

  const workers = [];
  // let maxThreads = navigator.hardwareConcurrency;
  const maxThreads = 1;
  for (let w = 0; w < maxThreads; w++) {
    workers.push(new BranchWorker());
  }

  await fractalService(workers, e.data);
};
