var img = '';

function preload() {
  img = loadImage('assets/water.png');
}

function setup() {
  const c = createCanvas(24*16, 24*16);
  c.parent('canvas-container');
  // New map, width/height must always be higher than view's.
  map = new Map(64,64);
  // New view
  view = new View(24, 24, 16, map);
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
  brushPoint('white', 'filled', brush);
}
