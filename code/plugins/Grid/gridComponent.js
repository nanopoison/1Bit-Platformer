import GridObject from "./gridObject.js";

export default function gridComponent(k) {
	return {
		grid(width = 4, height = 4, cellSize = 32, { createGridObject = (g, x, y) => new GridObject(g, x, y), d = false } = {}) {
			return {

				require: ["pos"],
				id: "grid",

				add() {
					this.width = width;
					this.height = height;
					this.cellSize = cellSize;
					this.createGridObject = createGridObject;

					this.d = d;

					this.gridArray = [];

					for (var i = 0; i < this.width; i++) {
						this.gridArray.push([]);
						for (var j = 0; j < this.height; j++) {
							this.gridArray[i].push(createGridObject(this, i, j));
						}
					}
				},

				draw() {
					if (this.d) {

						//debug.log("horizontal");

						for (var i = 0; i <= this.height; i++) {
							var v1 = k.vec2(0, i * this.cellSize).add(this.pos);
							var v2 = k.vec2(this.width * this.cellSize, i * this.cellSize).add(this.pos);

							//debug.log(v1 + " -> " + v2);

							k.drawLine({
								p1: v1,
								p2: v2,
								width: 1,
								color: k.rgb(77, 155, 230),
							})
						}

						//debug.log("vertical");

						for (var j = 0; j <= this.width; j++) {
							var v1 = k.vec2(j * this.cellSize, 0).add(this.pos);
							var v2 = k.vec2(j * this.cellSize, this.height * this.cellSize).add(this.pos);

							//debug.log(v1 + " -> " + v2);

							k.drawLine({
								p1: v1,
								p2: v2,
								width: 1,
								color: k.rgb(77, 155, 230),
							})
						}
					}
				},

				destroy() {

				},

				inspect() {

				},

				// grid methods

				getGridXY(pos) {
					var worldPos = k.toWorld(pos);
					worldPos.x = Math.floor((worldPos.sub(this.pos)).x / this.cellSize);
					worldPos.y = Math.floor((worldPos.sub(this.pos)).y / this.cellSize);
					return worldPos;
				},

				// returns world position from gridXY
				getWorldPos(x, y) {
					var vector2 = k.vec2(x * this.cellSize, y * this.cellSize).add(this.pos);
					return vector2;
				},

				// sets the value of the object at x, y
				setGridObjectXY(x, y, value) {
					if (x < this.width && x >= 0 && y < this.height && y >= 0)
						this.gridArray[x][y] = value;
				},

				setGridObjectWP(worldPosition, value) {
					var gridXY = this.getGridXY(worldPosition);
					this.setGridObjectXY(gridXY.x, gridXY.y, value);
				},

				// gets the value of the object at x, y
				getGridObjectXY(x, y) {
					if (x < this.width && x >= 0 && y < this.height && y >= 0)
						return this.gridArray[x][y];
					else
						return null;
				},

				getGridObjectWP(worldPosition) {
					var gridXY = this.getGridXY(worldPosition);
					return this.getGridObjectXY(gridXY.x, gridXY.y);
				},

				triggerGridObjectChanged(x, y) {
					// tmp
					debug.log("Placed @" + x + "," + y + "!");
				},

				isXYinBounds(x, y) {
					return (x < this.width && x >= 0 && y < this.height && y >= 0);
				},
			}
		},

		addGrid(level, levelConfig) {
			var g = add([
				pos(),
				grid(levelConfig.width, levelConfig.height, levelConfig.cellSize),
			]);

			for (var r = 0; r < levelConfig.height; r++) {
				for (var c = 0; c < levelConfig.width; c++) {
					const o = g.getGridObjectXY(c, r);
					const p = level[r][c];
					if (levelConfig[p] != null && p != "-1" && p != "0") {
						const obj = add(levelConfig[p][0](levelConfig[p][1]))
						o.setValue(obj);
						obj.pos = g.getWorldPos(o.x, o.y).add(o.getValue().pos);
					}
				}
			}

			return g;
		}
	}
}