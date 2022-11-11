export default function levelEditScene(width = 40, height = 30) {

	db.set("levels", {});

	var data = loadData()

	var dict = data["spriteDict"];

	console.log(dict)

	var selIndex = 5

	var g = add([
		pos(),
		grid(width, height, 32, { d: true }),
	])

	function place(p) {
		var gridObj = g.getGridObjectWP(p)
		if (gridObj == null)
			return
		if (gridObj.getValue() != null)
			gridObj.destroy()
		var obj = add([
			pos(),
			sprite(dict[selIndex].sprite),
			scale(2),
			outview({ hide: true }),
			{
				add() {
					this.spriteID = selIndex
				}
			}
		])
		gridObj.setValue(obj)
		obj.pos = g.getWorldPos(gridObj.x, gridObj.y)
		console.log(obj.spriteID)
	}

	function remove(p) {
		var gridObj = g.getGridObjectWP(p)
		if (gridObj == null)
			return
		var obj = gridObj.getValue()
		if (obj == null)
			return
		gridObj.destroy()
	}

	var s = add([
		pos(center()),
		sprite(dict[selIndex].sprite),
		color(120, 120, 255),
		opacity(0.5),
		scale(2),
		z(2),
	])

	onMouseDown("left", (p) => {
		place(p)
		s.color = rgb(120, 255, 120)
	})

	onMouseDown("right", (p) => {
		remove(p)
		s.color = rgb(255, 120, 120)
	})

	onMouseRelease("left", () => {
		s.color = rgb(120, 120, 255)
	})

	onMouseRelease("right", () => {
		s.color = rgb(120, 120, 255)
	})

	onUpdate(() => {
		var p = mousePos()
		debug.log(selIndex);
		if (isNaN(p.x) || isNaN(p.y))
			return
		var xy = g.getGridXY(p)
		s.pos = g.getWorldPos(xy.x, xy.y)
		s.use(sprite(dict[selIndex].sprite))
	})

	onKeyPress("q", () => {
		if (selIndex > 0)
			selIndex--;
	})

	onKeyPress("e", () => {
		if (selIndex < Object.keys(dict).length - 1)
			selIndex++;
	})

	onKeyPress("f", () => {
		if (selIndex < Object.keys(dict).length - 6)
			selIndex += 5;
	})

	onKeyPress("r", () => {
		if (selIndex > 6)
			selIndex -= 5
	})

	var w = g.width
	var h = g.height
	var c = g.cellSize
	function clampCamPos(x, y) {
		x = Math.min(Math.max(x, 320), w * c - 320)
		y = Math.min(Math.max(y, 240), h * c - 240)

		//console.log("C:" + vec2(x, y) + ", Max: " + vec2(w * c, h * c))
		return vec2(x, y)
	}

	var speed = 150;
	var mult = 1;
	onUpdate(() => {
		if (isKeyDown("shift"))
			mult = 2;
		else
			mult = 1;
	})

	onKeyDown("w", () => {
		var p = camPos().add(0, -speed * mult * dt())
		camPos(clampCamPos(p.x, p.y))
	})

	onKeyDown("s", () => {
		var p = camPos().add(0, speed * mult * dt())
		camPos(clampCamPos(p.x, p.y))
	})

	onKeyDown("a", () => {
		var p = camPos().add(-speed * mult * dt(), 0)
		camPos(clampCamPos(p.x, p.y))
	})

	onKeyDown("d", () => {
		var p = camPos().add(speed * mult * dt(), 0)
		camPos(clampCamPos(p.x, p.y))
	})

	onKeyPress("escape", () => {
		go("menu")
	})

	onKeyPress("space", () => {
		var level = [];
		for (var r = 0; r < g.height; r++) {
			level[r] = [];
			for (var c = 0; c < g.width; c++) {
				var obj = g.getGridObjectXY(c, r).getValue()
				if (obj == null)
					level[r].push(-1)
				else
					level[r].push(obj.spriteID)
			}
		}
		console.log(level)
	})

}