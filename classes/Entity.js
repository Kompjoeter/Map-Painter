class Entity {
	constructor(width, height, posX, posY, name) {
		// Unique identifier
		this.id = uuidv4();
		// Space in grid-cells this entity occupies.
		this.width = width;
		this.height = height;
		// Movement values
		this.moveX = {valPrev: 0, valCur: 0};
		this.moveY = {valPrev: 0, valCur: 0};
		// Coordinates.
		this.posX = {valPrev: posX, valCur: posX, valGoal: posX};
		this.posY = {valPrev: posY, valCur: posY, valGoal: posY};
		// Collision status, based on last calculated movement.
		this.colliding = false
		// In-game identifier of entity, not unique perse.
		this.name = name;
		// Initialize position on map
		this.move(map, 0,0);
		// Logging creation
		logMeta(`🖥️ created Entity with id: ${this.id}`);
	}

	// If not colliding, change entity coordinates, then position entity on map.
	move(m, x, y) {
		if (!this.checkForBounds(m, this.posX.valCur+x, this.posY.valCur+y)) {
			this.posX.valPrev = this.posX.valCur;
			this.posY.valPrev = this.posY.valCur;
			this.posX.valCur += x;
			this.posY.valCur += y;
			this.posToMap(m,this.posX,this.posY);
		}
	}

	// Prepare movement values for movement
	moveSetVal(move, val) {
		move.valPrev = move.valCur;
		move.valCur = val;
		return move;
	}

	// Position entity on map based on entity coordinates.
	posToMap(m,x,y) {
		if (m.map[x.valPrev][y.valPrev].occupant && m.map[x.valPrev][y.valPrev].occupant === this.id) {
			m.map[x.valPrev][y.valPrev].occupant = undefined;
		}
		m.map[x.valCur][y.valCur].occupant = this.id;
	}

	// Check if coordinates are within map or not.
	checkForBounds(m, x, y) {
		if (x < 0 || x > m.width-1 || y < 0 || y > m.height-1 || m.map[x][y].filled) {
			this.colliding = true;
			return true;
		}
		this.colliding = false;
		return false;
	}
}