export default function customLevelScene() {

	var player = {};

	var t = add([
		pos(center()),
		anchor("center"),
		text("Logging into\n Repl.it", {
			size: 48,
		}),
		color(255, 255, 255),
	])

	replit.getUserOrAuth().then((user) => {
		// check locked
		var locked = true;
		var cancelled = false;
		replit.getData("players").then((players) => {
			if (!(user.id in players)) {
				addPlayer(locked)
			} else {
				console.log("Already in database!")
			}
			// after log in
			player = players[user.id]

			lScene(players);
		})

		function addPlayer(locked) {
			if (locked && !cancelled) {
				replit.getData("p_locked").then((l) => {
					locked = l
					console.log(locked + " -> " + l)
					addPlayer(locked)
				})
			} else {
				if (locked && cancelled)
					return;
				replit.setData("p_locked", true);
				replit.getData("players").then((players) => {
					players[user.id] = { id: user.id, name: user.name }
					replit.setData("players", players).then(console.log)
					replit.setData("p_locked", false);
				})
			}
		}

		function lScene(players) {

			destroy(t);

			var page = 1;
			var LPP = 5

			replit.getData("levels").then((levels) => {

				console.log(levels);

				var levelsLength = Object.keys(levels).length
				var pages = levelsLength / LPP

				// TODO: display (LPP) levels per page, arrows across pages :)

				var i = (page - 1) * LPP;
				for (var levelKey in levels) {
					var level = levels[levelKey]

					if (i >= LPP * page || i >= levelsLength)
						return;

					var pageText = add([
						pos(width() / 2, 24),
						anchor("center"),
						text("Page " + page, {
							size: 32,
						}),
						color(255, 255, 255),
					])

					var levelElement = add([
						pos(width() / 2, 60 + (i * 88)),
						anchor("top"),
						rect(256, 64),
						color(255, 255, 255),
						area(),
					])
					levelElement.radius = 8;

					levelElement.onClick(() => {
						// show pop up first?
						go("game", {})
					})

					var levelNameText = levelElement.add([
						pos(-120, 16),
						anchor("left"),
						text(level.name, {
							size: 16
						}),
						color(0),
					])

					var levelCreatorNameText = levelElement.add([
						pos(-120, 48),
						anchor("left"),
						text(players[level.creatorId].name, {
							size: 16
						}),
						color(0),
					])

					var levelInfoButton = levelElement.add([
						pos(120, 48),
						anchor("right"),
						rect(24, 24),
						color(0),
					])
					levelInfoButton.radius = 8;

					var levelInfoI = levelInfoButton.add([
						pos(-12, 0),
						anchor("center"),
						text("i", {
							size: 22,
						}),
						color(255, 255, 255),
					])

					i++
				}

			})

			// way to exit
			onKeyPress("space", () => {
				go("menu")
			})

		}
	})

}