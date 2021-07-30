class View {
  constructor(width, height, cellSize, map) {
    this.width = width;
    this.height = height;

    this.cellSize = cellSize;
    this.map = map;
    this.target = undefined;
    this.showMeta = true;

    this.moveX = {valPrev: 0, valCur: 0};
    this.moveY = {valPrev: 0, valCur: 0};

    this.minX = 0;
    this.minY = 0;
    this.maxX = this.minX + (this.width);
    this.maxY = this.minY + (this.height);

    this.minXCur = 0;
    this.maxXCur = this.width -1;
    this.minYCur = 0;
    this.maxYCur = this.height -1;

    this.offsetMinX = Math.round(this.width / 6);
    this.offsetMinY = Math.round(this.height / 6);
    logMeta('🖥️ created View');
  }

  show(cs, m) {
    for(var x = 0; x < this.width; x++) {
      for(var y = 0; y < this.height; y++) {
        if (m.map[this.minX+x][this.minY+y].occupant) {
          fill('blue');
        } else if (m.map[this.minX+x][this.minY+y].filled === 1) {
          fill('black');
          stroke('black');
        } else if (m.map[this.minX+x][this.minY+y].filled === 0) {
          fill('lightgray');
          stroke('darkgray');
        }
        rect(x*cs, y*cs, cs, cs);
      }
    }
  }

  // Prepare movement values for movement
  moveSetVal(move, val) {
    move.valPrev = move.valCur;
    move.valCur = val;
    return move;
  }

  move(x, y) {
    let minXNew = this.minX + x;
    let maxXNew = minXNew + (this.width);
    let minYNew = this.minY + y;
    let maxYNew = minYNew + (this.height);
  
  // If the view has no target.
    if ((minXNew >= 0 && maxXNew <= this.map.width)) {
      this.minX = minXNew;
      this.maxX = maxXNew;
    }
    if ((minYNew >= 0 && maxYNew <= this.map.height)) {
      this.minY = minYNew;
      this.maxY = maxYNew;
    }
  }
}