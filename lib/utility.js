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

// Log a message (m)
function logMeta(m) {
  console.log(m);
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

function brushCircle(color, target, val) {
  noFill();
  stroke(color);
  const circle = radialGradient(diameter, diameter);

  for(let x = 0; x < diameter; x++) {
    for(let y = 0; y < diameter; y++) {
      if (circle[x][y] < diameter / 20) {
        const mX = snap((x*view.cellSize - ((diameter/2)*view.cellSize)) + ((mouseX*view.cellSize) / view.cellSize), view.cellSize);
        const mY = snap(y*view.cellSize - ((diameter/2)*view.cellSize) + +((mouseY*view.cellSize) / view.cellSize), view.cellSize);
        rect(mX, mY, view.cellSize, view.cellSize);
        if (mouseIsDown) {
          const cell = cellViewToMap(view, mX/view.cellSize, mY/view.cellSize);
          if (cell[0] > 0 && cell[1] > 0)
          cellSet(cell[0], cell[1], map, target, val);
        }
      }
    }
  }
}

function radialGradient(w, h)
    {
        let plain = this.plainMap(w, h, 1);
        let grid = []
        let centrePoint = {x: Math.floor(w / 2), y: Math.floor(h / 2)}
        let furthestDistanceFromCentre = euclideanDistance({x: 0, y: 0}, centrePoint);
          
        for (let x = 0; x < w; x++) {
          grid[x] = [];
          for (var y = 0; y < h; y++) {
            let val = Math.floor(furthestDistanceFromCentre - euclideanDistance({x: x, y: y}, centrePoint));
            val = (val / furthestDistanceFromCentre);
            grid[x][y] = plain[x][y] - val;
          }
        }
        return grid;
    }

    function plainMap(w, h, val)
    {
        let plain = [];

        for(let x = 0; x < w; x++) {
            plain[x] = [];
            for(let y = 0; y < h; y++) {   
                plain[x][y] = val;
            }
        }
        return plain;
    }

    function euclideanDistance(point1, point2) {
        return Math.sqrt(
          Math.abs(Math.pow(point1.x - point2.x, 2)) +
          Math.abs(Math.pow(point1.y - point2.y, 2))
        )
    }