// Snap coordinate (cor) to grid with cellsize (cs) of X.
function snap(cor, cs) {
	var cell = Math.round(cor / cs) * cs;
	return cell;
}

// View (v) coordinates (x, y) to Map coordinates
function cellViewToMap(v, x, y) {
  return [v.minX+x, v.minY+y];
}

// Set prop's (target) value of map cell (x, y coordinates) to new value (val)
function cellSet(x, y, map, target, val) {
  map.map[x][y][target] = val;
}

// Get index of array (a) that matches with value (t)
function indexOfId(a, t) {
	const matchesId = (e) => e.id === t;
	return a.findIndex(matchesId);
}

//A single cell brush
function brushPoint(color, target, val) {
  noFill();
  stroke(color);
  rect(snap(mouseX, view.cellSize), snap(mouseY, view.cellSize), view.cellSize, view.cellSize);

  if (mouseIsDown) {
    let mX = snap(mouseX, view.cellSize) / view.cellSize;
    let mY = snap(mouseY, view.cellSize) / view.cellSize;
    mXY = (cellViewToMap(view, mX, mY));
    cellSet(mXY[0], mXY[1], map, target, val);
  }
}