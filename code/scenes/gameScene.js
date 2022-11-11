export default function gameScene({ customId = -1 } = {}) {

	var data = loadData()

	data.coins = 0;
	var id = data.levelID;

	gravity(1600);

	let levels = data["levels"]
	let dict = data["spriteDict"]

	let l;
	if (customId == -1) {
		l = addGrid(levels[id], getLevelConfig(id))
	} else {
		replit.getData("levels").then((customLevels) => {
			l = addGrid(customLevels[customId], );
		});
	}


	function getLevelConfig(levelID) {
		let lc = {
			height: levels[levelID].length,
			width: levels[levelID][0].length,
			cellSize: 32,
		}

		console.log(levels[levelID])

		// todo
		for (let [key, value] of Object.entries(dict)) {
			lc[key] = value.getTypeOutput()
		}

		return lc
	}

	// game

	var bottom = l.height * l.cellSize;

	let player = add([
		pos(0, 256 + 64),
		sprite("player", { anim: "idle1" }),
		area({ shape: new Rect(vec2(2, 5), 12, 11) }),
		body(),
		ssController(),
		scale(2),
		{
			add() {
				this.n = 0;
				this.frame = 0;
				this.die = false;

				this.onBeforePhysicsResolve((col) => {
					if (col.target.is("spring")) {
						if (!col.isBottom() || this.isJumping()) {
							col.preventResolve();
						} else {
							if (Math.abs(col.displacement.y) > 25)
								col.preventResolve();
						}
					} else if (col.target.is("platform")) {
						if (!col.isBottom() || this.isJumping())
							col.preventResolve();
					}
				});

				this.onPhysicsResolve((c) => {
					if (c.target.is("spring") && c.resolved) {
						// do spring
						if (c.target.curAnim() != "bounce") {
							c.target.play("bounce", {
								pingpong: true
							});
						} else {
							if (isKeyDown("space") || isKeyDown("z")) {
								this.jump(750);
								play("spring");
							} else {
								this.jump(500);
								play("spring", { speed: 1.25, detune: randi(2, 4) * 100, volume: 0.5 });
							}
						}
					}
				})
			},
			async update() {
				if (this.pos.y >= bottom) {
					this.die = true;
					this.destroy();
				}

				if (this.input != 0) {
					if (this.getVelocity() < 0) {
						this.flipX(true);
					} else {
						this.flipX(false);
					}
				}
				if (this.n % 8 == 0) {
					var curA = this.curAnim();
					if (Math.abs(this.getVelocity()) > 0.5) {
						switch (curA) {
							case "run3":
							case "idle0":
								var frame = 0;
								if (curA == "run3") {
									frame = (this.frame - 1) % 4;
								}
								this.play("run0");
								this.frame = 1 + frame;
								break;
							case "run0":
							case "idle1":
								var frame = 0;
								if (curA == "run0") {
									frame = (this.frame - 1) % 4;
								}
								this.play("run1");
								this.frame = 8 + frame;
								break;
							case "run1":
							case "idle2":
								var frame = 0;
								if (curA == "run1") {
									frame = (this.frame) % 4;
								}
								this.play("run2");
								this.frame = 15 + frame;
								break;
							case "run2":
							case "idle3":
								var frame = 0;
								if (curA == "run2") {
									frame = (this.frame + 1) % 4;
								}
								this.play("run3");
								this.frame = 22 + frame;
							default:
								break;
						}
					} else {
						switch (curA) {
							case "run0":
							case "idle0":
								this.play("idle1");
								break;
							case "run1":
							case "idle1":
								this.play("idle2");
								break;
							case "run2":
							case "idle2":
								this.play("idle3");
								break;
							case "run3":
							case "idle3":
								this.play("idle0");
								break;
						}
					}
				}
				this.n++;
			},

			destroy() {
				if (this.die) {
					var pp = this.pos.add(16, -14);
					play("explode");
					for (var i = 0; i < 50; i++) {
						var a = randi(0, 360);
						add([
							pos(pp),
							rect(randi(2, 4), 1),
							rotate(a),
							move(a, randi(25, 75)),
							color(255, 255, 255),
							lifespan(0.625),
						]);
					}
				}
			},
		},
		"player",
	])

	var w = l.width
	var h = l.height
	var c = l.cellSize

	var left_border = add([
		pos(-32, 0),
		rect(32, l.height * l.cellSize),
		area(),
		body({ isStatic: true }),
	])

	var right_border = add([
		pos(l.width * l.cellSize, 0),
		rect(32, l.height * l.cellSize),
		area(),
		body({ isStatic: true }),
	])

	var top_border = add([
		pos(32, -32),
		rect(l.width * l.cellSize, 32),
		area(),
		body({ isStatic: true }),
	])

	var bot_border = add([
		pos(32, l.height * l.cellSize + 32),
		rect(l.width * l.cellSize, 32),
		area(),
		body({ isStatic: true }),
	])

	function clampCamPos(v) {
		x = Math.min(Math.max(v.x, 320), w * c - 320)
		y = Math.min(Math.max(v.y, 240), h * c - 240)

		//console.log("C:" + vec2(x, y) + ", Max: " + vec2(w * c, h * c))
		return vec2(x, y)
	}

	onDraw(async () => {
		camPos(clampCamPos(player.pos.add(0, -50)));
	})

	// ui

	let cont = add([
		pos(width() - 32, 32),
		anchor("topright"),
		rect(128, 48),
		color(0, 0, 0),
		outline(2, rgb(255, 255, 255)),
		fixed(),
	])
	cont.radius = 24;

	cont.add([
		pos(-70, 24),
		anchor("left"),
		text("0", {
			size: 16,
		}),
		fixed(),
		{
			async update() {
				this.text = data.coins;
			},
		}
	])

	cont.add([
		pos(-90, 24),
		anchor("center"),
		sprite("41"),
		scale(2),
		fixed(),
	])

	onKeyPress("r", () => {
		player.die = true;
		go("game")
	})

	onKeyPress("escape", () => {
		go("menu")
	})

}