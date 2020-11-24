(async function () {
  const heartPath = new Path2D('M535.38,56.82C508.88,28.07,472.51,12.24,433,12.24c-29.55,0-56.62,9.35-80.45,27.77A164.79,164.79,0,0,0,320,74a164.56,164.56,0,0,0-32.53-34C263.65,21.59,236.58,12.24,207,12.24c-39.54,0-75.91,15.83-102.42,44.58C78.43,85.23,64,124,64,166.11c0,43.3,16.14,82.94,50.78,124.75,31,37.39,75.54,75.35,127.12,119.31,17.61,15,37.58,32,58.31,50.15a30.06,30.06,0,0,0,39.58,0c20.73-18.13,40.7-35.15,58.32-50.17,51.58-44,96.12-81.91,127.11-119.31C559.87,249.05,576,209.41,576,166.11,576,124,561.57,85.23,535.38,56.82Z');
  
  const viewBox = [document.getElementById("canvas").parentElement.clientWidth, document.getElementById("canvas").parentElement.clientHeight - 50];
  
  const imageURLs = [
    'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1503431128871-cd250803fa41?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1536500152107-01ab1422f932?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&h=300&q=80'
  ];
  
  const images = await loadImages(imageURLs);
  
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  const W = document.getElementById("canvas").parentElement.clientWidth;
  const H = document.getElementById("canvas").parentElement.clientHeight - 50;
  const S = 40;

  canvas.width = W;
  canvas.height = H;

  // gen columns
  const colsCoord = genRandomSlices(S, W);

  // gen rows
  const rowsCoord = genRandomSlices(S, H);

  const RL = rowsCoord.length;
  const CL = colsCoord.length;

  // gen grid
  const grid = Array.from({ length: RL }, () => new Array(CL));

  for (let ri = 0; ri < RL; ri++) {
    const row = rowsCoord[ri];

    for (let ci = 0; ci < CL; ci++) {
      const col = colsCoord[ci];
      grid[ri][ci] = {
        x1: col.min,
        y1: row.min,
        x2: col.max,
        y2: row.min,
        x3: col.max,
        y3: row.max,
        x4: col.min,
        y4: row.max,
        modx: false,
        mody: false
      };
    }
  }

  // shuffle indexes
  const rndColsIndexes = Array.from({ length: CL }, (_, i) => i).sort(
    () => 0.5 - Math.random()
  );
  const rndRowsIndexes = Array.from({ length: RL }, (_, i) => i).sort(
    () => 0.5 - Math.random()
  );

  // shift rects side
  for (let ri = 0; ri < RL; ri++) {
    for (let ci = 0; ci < CL; ci++) {
      const c = rndColsIndexes[ci];
      const r = rndRowsIndexes[ri];
      const rect = grid[r][c];

      let isHorizontal = Math.random() < 0.5;
      let neighbor = pickNeighbor(grid, RL, CL, r, c, isHorizontal);

      if (!neighbor) {
        isHorizontal = !isHorizontal;
        neighbor = pickNeighbor(grid, RL, CL, r, c, isHorizontal);
      }

      if (neighbor) {
        const ngb = grid[neighbor.ri][neighbor.ci];
        const ratio = 0.3 + Math.random() * 0.4;
        if (isHorizontal) {
          rect.modx = true;
          ngb.modx = true;
          if (neighbor.di === -1) {
            // left
            ngb.x2 = ngb.x3 = rect.x1 = rect.x4 = lerp(ngb.x1, rect.x2, ratio);
          } else {
            // right
            ngb.x1 = ngb.x4 = rect.x2 = rect.x3 = lerp(ngb.x2, rect.x1, ratio);
          }
        } else {
          rect.mody = true;
          ngb.mody = true;

          if (neighbor.di === -1) {
            // top
            ngb.y3 = ngb.y4 = rect.y1 = rect.y2 = lerp(ngb.y1, rect.y4, ratio);
          } else {
            // bottom
            ngb.y1 = ngb.y2 = rect.y3 = rect.y4 = lerp(ngb.y4, rect.y1, ratio);
          }
        }
      }
    }
  }

  // draw
  var showedPics = [];
  var rand = 0;
  const pathRatio = Math.max(viewBox[0] / W, viewBox[1] / H);
  for (let ri = 0; ri < RL; ri++) {
    for (let ci = 0; ci < CL; ci++) {
      const r = grid[ri][ci];
      const x1 = (r.x1 - W / 2) * pathRatio + viewBox[0] / 2;
      const x2 = (r.x2 - W / 2) * pathRatio + viewBox[0] / 2;
      
      const y1 = (r.y1 - H / 2) * pathRatio + viewBox[1] / 2;
      const y3 = (r.y3 - H / 2) * pathRatio + viewBox[1] / 2;
      
      const isInPath = 
        ctx.isPointInPath(heartPath, lerp(x1, x2, 0.1), lerp(y1, y3, 0.1)) &&
        ctx.isPointInPath(heartPath, lerp(x1, x2, 0.9), lerp(y1, y3, 0.1)) && 
        ctx.isPointInPath(heartPath, lerp(x1, x2, 0.9), lerp(y1, y3, 0.9)) &&
        ctx.isPointInPath(heartPath, lerp(x1, x2, 0.1), lerp(y1, y3, 0.9));
      
      if (!isInPath) continue;
      
	  rand = Math.floor(images.length * Math.random());
	  
	  if(showedPics.includes(rand))
		continue;
		
	  //showedPics.push(rand);
	  
      const img = images[rand];
      const dx = r.x1;
      const dy = r.y1;
      const dw = r.x2 - r.x1;
      const dh = r.y4 - r.y1;
      const ratio = Math.min(img.width / dw, img.height / dh);
      const sx = (img.width - dw * ratio) * 0.5;
      const sy = (img.height - dh * ratio) * 0.5;
      const sw = dw * ratio;
      const sh = dh * ratio;
      ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }
})();

function genRandomSlices(size, max) {
  const out = [];
  let prev = 0;
  let curr = 0;
  let last = 0;
  let step = 0;

  while (true) {
    step = size * (Math.random() + 1);
    curr = prev + step;
    if (curr > max) {
      last = prev;
      break;
    }

    out.push({ min: prev, max: curr });
    prev = curr;
  }

  const scale = max / last;

  out.forEach((v) => {
    v.min *= scale;
    v.max *= scale;
  });

  return out;
}

function pickNeighbor(grid, RL, CL, ri, ci, isHorizontal) {
  const di = Math.sign(0.5 - Math.random()) || 1;
  let ni;
  if (isHorizontal) {
    ni = ci + di;
    if (ni > -1 && ni < CL && !(grid[ri][ni].mody || grid[ri][ci].mody)) {
      return { ri, ci: ni, di };
    }

    ni = ci - di;
    if (ni > -1 && ni < CL && !(grid[ri][ni].mody || grid[ri][ci].mody)) {
      return { ri, ci: ni, di: -di };
    }
  } else {
    ni = ri + di;
    if (ni > -1 && ni < RL && !(grid[ni][ci].modx || grid[ri][ci].modx)) {
      return { ri: ni, ci, di };
    }

    ni = ri - di;
    if (ni > -1 && ni < RL && !(grid[ni][ci].modx || grid[ri][ci].modx)) {
      return { ri: ni, ci, di: -di };
    }
  }

  return null;
}

// utils

function loadImages(images) {
  return Promise.all(images.map(loadImg));
}

function loadImg(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.crossOrigin = "Anonymous";
    img.src = src;
  });
}

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}