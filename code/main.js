import kaboom from "kaboom"
import ssControllerComponent from "./plugins/ssControllerComponent"
import GridComponent from "./plugins/Grid/gridComponent.js"
import GameManager from "./plugins/GameManager/gameManager"
import menuScene from "./scenes/menuScene"
import gameScene from "./scenes/gameScene"
import levelEditScene from "./scenes/levelEditScene"
import customLevelScene from "./scenes/customLevelScene"
import prebuiltLevels from "./levels"

// database

var levels = prebuiltLevels();

console.log(replit);

replit.setData("p_locked", false);
replit.setData("levels", { 0: createBasicLevel(0), 1: createBasicLevel(1), 2: createBasicLevel(2), 3: createBasicLevel(3), 4: createBasicLevel(4), 5: createBasicLevel(5) }).then(console.log)

function createBasicLevel(i) {
	return { levelId: i, creatorId: 501600, level: levels[0], name: "Sandwiches are good", difficulty: 0 }
}

// initialize context
kaboom({
	//canvas: document.getElementById("cv"),
	width: 640,
	height: 480,
	background: [0, 0, 0],
})

// plugins
plug(ssControllerComponent);
plug(GridComponent);
plug(GameManager);

// load sprites

var s = 16;

var cellSize = 16;
var width = 320;
var height = 320;
var count = 0;

loadSpriteAtlas("sprites/1bitplatformer.png", getAtlas());

var at = loadSpriteAtlas("sprites/1bitplatformer.png", {
	"void": {
		"x": 0,
		"y": 0,
		"width": s,
		"height": s,
	},
	"miniCoin": {
		"x": s,
		"y": 0,
		"width": s,
		"height": s,
	},
	"coin": {
		"x": s * 2,
		"y": 0,
		"width": s,
		"height": s,
	},
	"chain": {
		"x": s * 3,
		"y": 0,
		"width": s,
		"height": s * 3,
		"sliceY": 3,
	},
	"chain-grab": {
		"x": s * 4,
		"y": 0,
		"width": s,
		"height": s,
	},
	"sus-plat-chain": {
		"x": s * 5,
		"y": 0,
		"width": s,
		"height": s,
	},
	"chain-hook": {
		"x": s * 6,
		"y": 0,
		"width": s,
		"height": s,
	},
	"exclam-white-o": {
		"x": s * 7,
		"y": 0,
		"width": s,
		"height": s,
	},
	"coin-white-o": {
		"x": s * 8,
		"y": 0,
		"width": s,
		"height": s,
	},
	"plate-white-o": {
		"x": s * 9,
		"y": 0,
		"width": s,
		"height": s,
	},
	"cross-white-o": {
		"x": s * 10,
		"y": 0,
		"width": s,
		"height": s,
	},
	"special-white-o": {
		"x": s * 11,
		"y": 0,
		"width": s,
		"height": s,
	},
	"pipe-top": {
		"x": s * 12,
		"y": 0,
		"width": s,
		"height": s,
	},
	"plant-hill": {
		"x": s * 13,
		"y": 0,
		"width": s,
		"height": s,
	},
	"tree-oak": {
		"x": s * 14,
		"y": 0,
		"width": s,
		"height": s * 2,
	},
	"tree-pine": {
		"x": s * 15,
		"y": 0,
		"width": s,
		"height": s * 3,
	},
	"plant-flower-mini": {
		"x": s * 16,
		"y": 0,
		"width": s,
		"height": s,
	},
	"plant-flower": {
		"x": s * 17,
		"y": 0,
		"width": s,
		"height": s,
	},
	"plant-grass": {
		"x": s * 18,
		"y": 0,
		"width": s,
		"height": s,
	},
	"plant-vine": {
		"x": s * 19,
		"y": 0,
		"width": s,
		"height": s,
	},
	//pt2
	"bit1": {
		"x": 0,
		"y": s,
		"width": s,
		"height": s,
	},
	"bit2": {
		"x": s,
		"y": s,
		"width": s,
		"height": s,
	},
	"bit3": {
		"x": s * 2,
		"y": s,
		"width": s,
		"height": s,
	},
	"chain-link": {
		"x": s * 3,
		"y": s,
		"width": s,
		"height": s,
	},
	"sus-plat-link-left": {
		"x": s * 4,
		"y": s,
		"width": s,
		"height": s,
	},
	"sus-plat-link-mid": {
		"x": s * 5,
		"y": s,
		"width": s,
		"height": s,
	},
	"sus-plat-link-right": {
		"x": s * 6,
		"y": s,
		"width": s,
		"height": s,
	},
	"exclam-black-o": {
		"x": s * 7,
		"y": s,
		"width": s,
		"height": s,
	},
	"coin-black-o": {
		"x": s * 8,
		"y": s,
		"width": s,
		"height": s,
	},
	"plate-black-o": {
		"x": s * 9,
		"y": s,
		"width": s,
		"height": s,
	},
	"cross-black-o": {
		"x": s * 10,
		"y": s,
		"width": s,
		"height": s,
	},
	"special-black-o": {
		"x": s * 11,
		"y": s,
		"width": s,
		"height": s,
	},
	"pipe-mid": {
		"x": s * 12,
		"y": s,
		"width": s,
		"height": s,
	},
	"tree-weird": {
		"x": s * 13,
		"y": s,
		"width": s,
		"height": s,
	},
	"plant-bush-mini": {
		"x": s * 16,
		"y": s,
		"width": s,
		"height": s,
	},
	"plant-bush": {
		"x": s * 17,
		"y": s,
		"width": s,
		"height": s,
	},
	"plant-grass-tall": {
		"x": s * 18,
		"y": s,
		"width": s,
		"height": s,
	},
	"plant-vine-bottom": {
		"x": s * 19,
		"y": s,
		"width": s,
		"height": s,
	},
	// row 3
	"heart-mini": {
		"x": 0,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"heart": {
		"x": s,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"heart-full": {
		"x": s * 2,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"chain-bottom": {
		"x": s * 3,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"sus-plat-plat-left": {
		"x": s * 4,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"sus-plat-plat-mid": {
		"x": s * 5,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"sus-plat-plat-right": {
		"x": s * 6,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"exclam-white": {
		"x": s * 7,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"coin-white": {
		"x": s * 8,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"plate-white": {
		"x": s * 9,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"cross-white": {
		"x": s * 10,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"special-white-o-2": {
		"x": s * 11,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"pipe-bottom": {
		"x": s * 12,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"tree-weird-bottom": {
		"x": s * 13,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"plant-mushroom": {
		"x": s * 14,
		"y": s * 2,
		"width": s,
		"height": s,
	},
	"door": {
		"x": s * 16,
		"y": s * 2,
		"width": s * 4,
		"height": s,
		"sliceX": 4,
		"anims": {
			"closed": {
				"from": 0,
				"to": 0,
			},
			"locked": {
				"from": 1,
				"to": 1,
			},
			"open": {
				"from": 2,
				"to": 3,
				"speed": 3,
			}
		}
	},
	// row 4
	"ladder-top": {
		"x": 0,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"ladder-small-top": {
		"x": s,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"gem": {
		"x": s * 2,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"plat1-single": {
		"x": s * 3,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"plat1-left": {
		"x": s * 4,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"plat1-mid": {
		"x": s * 5,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"plat1-right": {
		"x": s * 6,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"exclam-black": {
		"x": s * 7,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"coin-black": {
		"x": s * 8,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"plate-black": {
		"x": s * 9,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"cross-black": {
		"x": s * 10,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"special-weird": {
		"x": s * 11,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"sign-left": {
		"x": s * 12,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"sign-right": {
		"x": s * 13,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"sign-up": {
		"x": s * 14,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"sign-down": {
		"x": s * 15,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"sign-blank": {
		"x": s * 16,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"sign-exclam": {
		"x": s * 17,
		"y": s * 3,
		"width": s,
		"height": s,
	},
	"double-door": {
		"x": s * 18,
		"y": s * 3,
		"width": s * 2,
		"height": s * 2,
		"sliceY": 2,
		"anims": {
			"closed": {
				"from": 0,
				"to": 0,
			},
			"open": {
				"from": 0,
				"to": 1,
			},
		},
	},
	// row 5
	"ladder-middle": {
		"x": 0,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"ladder-small-middle": {
		"x": s,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"gem-full": {
		"x": s * 2,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"plat2-single": {
		"x": s * 3,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"plat2-left": {
		"x": s * 4,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"plat2-mid": {
		"x": s * 5,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"plat2-right": {
		"x": s * 6,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"ground-top-left": {
		"x": s * 7,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"ground-top": {
		"x": s * 8,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"ground-top-right": {
		"x": s * 9,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"special-empty": {
		"x": s * 10,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"special-glass": {
		"x": s * 11,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"sign-left-arrow": {
		"x": s * 12,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"sign-right-arrow": {
		"x": s * 13,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"sign-up-arrow": {
		"x": s * 14,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"sign-down-arrow": {
		"x": s * 15,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"key-large": {
		"x": s * 16,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	"key": {
		"x": s * 17,
		"y": s * 4,
		"width": s,
		"height": s,
	},
	// row 6
	"ladder-middle-2": {
		"x": 0,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"ladder-small-middle-2": {
		"x": s,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"gem-2": {
		"x": s * 2,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"plat3-single": {
		"x": s * 3,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"plat3-left": {
		"x": s * 4,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"plat3-mid": {
		"x": s * 5,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"plat3-right": {
		"x": s * 6,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"ground-left": {
		"x": s * 7,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"ground-middle": {
		"x": s * 8,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"ground-right": {
		"x": s * 9,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"ground2-top-left": {
		"x": s * 10,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"ground2-top": {
		"x": s * 11,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"ground2-top-right": {
		"x": s * 12,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"ground2-single-top": {
		"x": s * 13,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"connector1": {
		"x": s * 14,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"ground3-top-left": {
		"x": s * 15,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"ground3-top": {
		"x": s * 16,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"ground3-top-right": {
		"x": s * 17,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"ground3-single-top": {
		"x": s * 18,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	"connector2": {
		"x": s * 19,
		"y": s * 5,
		"width": s,
		"height": s,
	},
	// row 7
	"ladder-bottom": {
		"x": 0,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"ladder-small-bottom": {
		"x": s,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"spikes": {
		"x": s * 2,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"conveyor-single": {
		"x": s * 3,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"conveyor-left": {
		"x": s * 4,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"conveyor-mid": {
		"x": s * 5,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"conveyor-right": {
		"x": s * 6,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"ground-bot-left": {
		"x": s * 7,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"ground-bot-middle": {
		"x": s * 8,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"ground-bot-right": {
		"x": s * 9,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"ground2-left": {
		"x": s * 10,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"ground2-mid": {
		"x": s * 11,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"ground2-right": {
		"x": s * 12,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"ground2-single-mid": {
		"x": s * 13,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"connector3": {
		"x": s * 14,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"ground3-left": {
		"x": s * 15,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"ground3-mid": {
		"x": s * 16,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"ground3-right": {
		"x": s * 17,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"ground3-single-mid": {
		"x": s * 18,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	"connector4": {
		"x": s * 19,
		"y": s * 6,
		"width": s,
		"height": s,
	},
	// row 8
	"bridge": {
		"x": 0,
		"y": s * 7,
		"width": s * 3,
		"height": s * 2,
	},
	"plat4-single": {
		"x": s * 3,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"plat4-left": {
		"x": s * 4,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"plat4-mid": {
		"x": s * 5,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"plat4-right": {
		"x": s * 6,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground-tree-top-left": {
		"x": s * 7,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground-tree-top-mid": {
		"x": s * 8,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground-tree-top-right": {
		"x": s * 9,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground2-bot-left": {
		"x": s * 10,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground2-bot-mid": {
		"x": s * 11,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground2-bot-right": {
		"x": s * 12,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground2-single-bot": {
		"x": s * 13,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"connector5": {
		"x": s * 14,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground3-bot-left": {
		"x": s * 15,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground3-bot-mid": {
		"x": s * 16,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground3-bot-right": {
		"x": s * 17,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground3-single-bot": {
		"x": s * 18,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"connector6": {
		"x": s * 19,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	// row 9
	"spring": {
		"x": s * 3,
		"y": s * 8,
		"width": s * 3,
		"height": s,
		"sliceX": 3,
		"anims": {
			"idle": {
				"from": 2,
				"to": 2,
			},
			"bounce": {
				"from": 2,
				"to": 0,
				"speed": 20,
			},
			"debounce": {
				"from": 0,
				"to": 2,
				"speed": 20,
			}
		}
	},
	"icicles": {
		"x": s * 6,
		"y": s * 8,
		"width": s,
		"height": s,
	},
	"ground-tree-left": {
		"x": s * 7,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground-tree-mid": {
		"x": s * 8,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground-tree-right": {
		"x": s * 9,
		"y": s * 7,
		"width": s,
		"height": s,
	},
	"ground2-horiz-left": {
		"x": s * 10,
		"y": s * 8,
		"width": s,
		"height": s,
	},
	"ground2-horiz-mid": {
		"x": s * 11,
		"y": s * 8,
		"width": s,
		"height": s,
	},
	"ground2-horiz-right": {
		"x": s * 12,
		"y": s * 8,
		"width": s,
		"height": s,
	},
	"ground2-single": {
		"x": s * 13,
		"y": s * 8,
		"width": s,
		"height": s,
	},
	"connector7": {
		"x": s * 14,
		"y": s * 8,
		"width": s,
		"height": s,
	},
	"ground3-horiz-left": {
		"x": s * 15,
		"y": s * 8,
		"width": s,
		"height": s,
	},
	"ground3-horiz-mid": {
		"x": s * 16,
		"y": s * 8,
		"width": s,
		"height": s,
	},
	"ground3-horiz-right": {
		"x": s * 17,
		"y": s * 8,
		"width": s,
		"height": s,
	},
	"ground3-single": {
		"x": s * 18,
		"y": s * 8,
		"width": s,
		"height": s,
	},
	"connector8": {
		"x": s * 19,
		"y": s * 8,
		"width": s,
		"height": s,
	},
	// row 10
	"support-top-left": {
		"x": 0,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"support-top": {
		"x": s,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"support-top-right": {
		"x": s * 2,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"spikes-trap": {
		"x": s * 3,
		"y": s * 9,
		"width": s,
		"height": s * 3,
		"sliceY": 2,
		"anims": {
			"inactive": {
				"from": 1,
				"to": 1,
			},
			"activate": {
				"from": 1,
				"to": 0,
			},
		},
	},
	"sign-post-left": {
		"x": s * 4,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"sign-post-exclam": {
		"x": s * 5,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"sign-post-right": {
		"x": s * 6,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"ground-tree-mid2-left": {
		"x": s * 7,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"ground-tree-mid2-left": {
		"x": s * 8,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"ground-tree-mid2-right": {
		"x": s * 9,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"ground4-top-left": {
		"x": s * 10,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"ground4-top-mid": {
		"x": s * 11,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"ground4-top-right": {
		"x": s * 12,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"ground4-single-top": {
		"x": s * 13,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"connector9": {
		"x": s * 14,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"ground5-top-left": {
		"x": s * 15,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"ground5-top-mid": {
		"x": s * 16,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"ground5-top-right": {
		"x": s * 17,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"ground5-single-top": {
		"x": s * 18,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	"connector10": {
		"x": s * 19,
		"y": s * 9,
		"width": s,
		"height": s,
	},
	// row 11 (TODO: After sign-post-exclam)


	// extras
	"player": {
		"x": 0,
		"y": s * 12,
		"width": s * 7,
		"height": s * 4,
		"sliceX": 7,
		"sliceY": 4,
		"anims": {
			"run0": {
				"from": 1,
				"to": 4,
				"speed": 10,
				"loop": true,
			},
			"run1": {
				"from": 1 + 7,
				"to": 4 + 7,
				"speed": 10,
				"loop": true,
			},
			"run2": {
				"from": 1 + 7 * 2,
				"to": 4 + 7 * 2,
				"speed": 10,
				"loop": true,
			},
			"run3": {
				"from": 1 + 7 * 3,
				"to": 4 + 7 * 3,
				"speed": 10,
				"loop": true,
			},
			"idle0": {
				"from": 0,
				"to": 0,
				"loop": true,
			},
			"idle1": {
				"from": 7,
				"to": 7,
				"loop": true,
			},
			"idle2": {
				"from": 14,
				"to": 14,
				"loop": true,
			},
			"idle3": {
				"from": 21,
				"to": 21,
				"loop": true,
			},
		},
	}
});

var data = loadData();

data.levelID = 0;

at.onFinish(() => {
	var a = Object.keys(at.data)
	var d = Object.values(at.data)

	var dict = {}
	for (var i = 0; i < a.length; i++) {
		dict[i] = new LevelObject(a[i])
		switch (i) {
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 27:
			case 28:
			case 29:
			case 30:
			case 31:
			case 81:
			case 82:
			case 100:
			case 119:
				dict[i].type = "block"
				break;
			case 98:
			case 80:
			case 118:
				dict[i].type = "left_block";
				break;
			case 120:
				dict[i].type = "right_block";
				break;
			case 20:
				dict[i].type = "coin"
				break;
			case 149:
				dict[i].type = "spring"
				break;
			case 14:
			case 16:
			case 17:
			case 36:
			case 35:
			case 86:
				dict[i].type = "decoration"
				break;
			case 113:
			case 150:
				dict[i].type = "spikes"
				break;
			case 53:
				dict[i].type = "door"
				break;
			case 42:
			case 43:
			case 44:
			case 58:
			case 59:
			case 60:
				dict[i].type = "platform"
				break;
			default:
				break;
		}
	}
	data["spriteDict"] = dict
})

function getAtlas() {
	var atlas = [];
	for (var i = 0; i < width / cellSize; i++) {
		for (var j = 0; j < height / cellSize; j++) {
			var k = "" + count;
			atlas[k] = [];
			atlas[k]["x"] = i * cellSize;
			atlas[k]["y"] = j * cellSize;
			atlas[k]["width"] = cellSize;
			atlas[k]["height"] = cellSize;
			count++;
		}
	}
	return atlas;
}

// sounds
loadSound("score", "sounds/score.mp3");
loadSound("blip", "sounds/blip.mp3");
loadSound("spring", "sounds/spring.mp3");
loadSound("explode", "sounds/explode.mp3");

// load levels
data["levels"] = prebuiltLevels()

// scenes
scene("menu", menuScene);
scene("game", gameScene);
scene("levelEdit", levelEditScene);
scene("customLevel", customLevelScene)

// go
go("menu");

// debug
debug.inspect = false;

// additional

class LevelObject {

	static typeDict = {
		"default": (s) => [
			pos(),
			sprite(s),
			scale(2),
			offscreen({ hide: true }),
		],
	}

	constructor(sprite) {
		this.sprite = sprite
		this.type = "default";
	}

	setType(type) {
		this.type = type
	}

	/**
	 *	Returns the type dictionary and the callback with this.sprite as a parameter
	 */
	getTypeOutput() {
		return [LevelObject.typeDict[this.type], this.sprite];
	}

	/**	
	 *	Defines type of dictionary
	 */
	static setTypeOutput(type, callback) {
		LevelObject.typeDict[type] = callback
	}

}

LevelObject.setTypeOutput("block", (s) => [
	pos(),
	sprite(s),
	area(),
	scale(2),
	body({ isStatic: true }),
	offscreen({ hide: true, paused: true }),
])

LevelObject.setTypeOutput("left_block", (s) => [
	pos(),
	sprite(s),
	area({ shape: new Rect(vec2(2, 0), 14, 16) }),
	scale(2),
	body({ isStatic: true }),
	offscreen({ hide: true }),
])

LevelObject.setTypeOutput("right_block", (s) => [
	pos(),
	sprite(s),
	area({ shape: new Rect(vec2(0, 0), 14, 16) }),
	scale(2),
	body({ isStatic: true }),
	offscreen({ hide: true }),
])

LevelObject.setTypeOutput("coin", (s) => [
	pos(),
	sprite("21"),
	area({ shape: new Rect(vec2(3, 3), 10, 10) }),
	scale(2),
	offscreen({ hide: true }),
	{
		add() {
			this.onCollide("player", () => {
				data.coins++
				play("score", { detune: data.coins * 100 })
				this.destroy()
			})
		}
	}
])

LevelObject.setTypeOutput("spring", (s) => [
	pos(),
	sprite(s, { anim: "idle" }),
	area({ shape: new Rect(vec2(0), 16, 16) }),
	scale(2),
	body({ isStatic: true }),
	offscreen({ hide: true }),
	"spring",
	{
		add() {
			this.onAnimEnd("bounce", () => {
				this.play("debounce")
			});
			this.onAnimEnd("debounce", () => {
				this.play("idle")
			})
		},
		update() {
			var f = this.frame;
			switch (f) {
				case 0:
					this.area.shape = new Rect(vec2(0, 8), 16, 8)
					break;
				case 1:
					this.area.shape = new Rect(vec2(0, 4), 16, 12)
					break;
				default:
				case 2:
					this.area.shape = new Rect(vec2(0), 16, 16)
					break;
			}
		}
	}
])

LevelObject.setTypeOutput("platform", (s) => [
	pos(),
	sprite(s),
	area({ shape: new Rect(vec2(0), 16, 8) }),
	scale(2),
	body({ isStatic: true }),
	offscreen({ hide: true }),
	"platform",
])

LevelObject.setTypeOutput("spikes", (s) => [
	pos(),
	sprite(s),
	area(),
	scale(2),
	body({ isStatic: true }),
	offscreen({ hide: true }),
	"spike",
	{
		add() {
			this.onCollide("player", (p) => {
				var pp = p.pos.add(16, 16);
				p.die = true;
				p.destroy();
			})
		},
	}
])

LevelObject.setTypeOutput("decoration", (s) => [
	pos(0, 3),
	sprite(s),
	scale(2),
	z(-1),
	offscreen({ hide: true }),
])

LevelObject.setTypeOutput("door", (s) => [
	pos(0, 3),
	sprite(s),
	area(),
	scale(2),
	z(-1),
	"door",
	offscreen({ hide: true }),
	{
		add() {
			this.used = false;
			this.player = null;

			this.onAnimEnd()

			this.onCollideUpdate((p) => {
				if (!p.is("player"))
					return
				if (isKeyDown("w") || isKeyDown("up") && !this.used) {
					this.used = true
					p.kinematic = true
					var d = this
					p.pos = d.pos
					d.play("open", {
						onEnd: () => {
							p.destroy()
							data.levelID++
							if (data.levelID > data.levels.length - 1) {
								data.levelID = 0
								console.log("What")
								go("menu")
							} else {
								console.log("the heck")
								go("game")
							}
						}
					})
				}
			})
		}
	}
])