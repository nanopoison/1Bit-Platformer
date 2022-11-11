export default function menuScene() {

	var play = playButton()

	var custom = customLevels()

	onKeyPress("e", () => {
		go("levelEdit")
	})

	// db debug
	onKeyPress("c", () => {
		replit.setData("db_debug", 0);
	})
	
	onKeyPress("u", () => {
		replit.getData("db_debug").then((d) => {
			console.log(d);
			if (d == null)
				replit.setData("db_debug", 0)
			replit.setData("db_debug", d + 1)
		})
	})

	onKeyPress("p", () => {
		replit.getData("db_debug").then(console.log);
	})
	
}

function playButton() {

	const play = add([
		pos(center()),
		anchor("center"),
		rect(128,48),
		color(255,255,255),
		scale(1),
		area(),
	])

	var t = play.add([
		pos(),
		anchor("center"),
		text("Play", {
			 size: 24,
		}),
		color(0),
	])

	play.onClick(() => {
		debug.log("he")
		go("game")
	})
	
	return play
}

function customLevels() {

	const customBut = add([
		pos(center().add(0,64)),
		anchor("center"),
		rect(128,48),
		color(255,255,255),
		scale(1),
		area(),
	])

	var t = customBut.add([
		pos(),
		anchor("center"),
		text("Custom", {
			 size: 24,
		}),
		color(0),
	])

	customBut.onClick(() => {
		go("customLevel")
	})
	
	
}