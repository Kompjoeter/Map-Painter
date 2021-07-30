var img = [];
var diameter = 10;

function preload() {
  img[0] = loadImage('assets/water00.png');
  img[1] = loadImage('assets/water01.png');
  img[2] = loadImage('assets/water02.png');
  img[3] = loadImage('assets/sand00.png');
  img[4] = loadImage('assets/grass00.png');
  img[5] = loadImage('assets/grass01.png');
  img[6] = loadImage('assets/mountain00.png');
}

function setup() {
  const c = createCanvas(24*16, 12*16);
  c.parent('canvas-container');
  // New map, width/height must always be higher than view's.
  map = new Map(128,128);
  // New view
  view = new View(48, 24, 8, map);
}
  
function draw() {
  background(220);
  stroke('black');

  // Register key presses
  for (const key in keys) {
    keySetVal(key);
	}

  // Register view navigation
  view.moveSetVal(view.moveX, keys.d.valCur - keys.a.valCur);
  view.moveSetVal(view.moveY, keys.s.valCur - keys.w.valCur);
  view.move(view.moveX.valPrev, view.moveY.valPrev);

  // Draw view content
	view.show(view.cellSize, map);

  // Brush functionality
  brushPoint('white', 'sprite', brush);
  brushCircle('white', 'sprite', brush);
}
