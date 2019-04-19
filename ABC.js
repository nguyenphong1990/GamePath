/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/sZNHMqNe
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(1000, 800, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    //game.load.baseURL = 'http://examples.phaser.io/assets/';
    //game.load.crossOrigin = 'anonymous';
    game.load.image('zone', "./assets/particles/red.png");
    game.load.image('up', "./assets/sprites/UP.png");
	game.load.image('down', "./assets/sprites/DOWN.png");
	game.load.image('left', "./assets/sprites/LEFT.png");
	game.load.image('right', "./assets/sprites/RIGHT.png");
}

const OBJECT_SIZE 	= 95
const PADDING_SIZE	= 5

const 	LEFT =	2
const 	RIGHT =	3
const 	UP 	 =	4
const 	DOWN  =	5

const WALL = 0
const PATH	= 1


var background;
var dragPosition;

var paths = [];
var maps = [];

var path_1 = [LEFT, RIGHT, UP, DOWN];

var maps_1 = [[0, 0 ,0 ,0, 0, 0, 0 ,0],
            [1, 1 ,1 ,0, 0, 0, 0 ,0],
            [0, 0 ,1 ,0, 0, 0, 0 ,0],
            [0, 0 ,0 ,1, 1, 1, 0 ,0],
            [0, 0 ,0 ,0, 0, 1, 1 ,1],
            [0, 0 ,0 ,0, 0, 0, 0 ,0],
            [0, 0 ,0 ,0, 0, 0, 0 ,0],
            [0, 0 ,0 ,0, 0, 0, 0 ,0]];

			
function drawRec(color, x, y, s) {
    var bmd = game.make.bitmapData(s, s);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,s,s);
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();        
    sprite = game.add.sprite(x, y, bmd);     
}


function create() {
	
	/* Init maps */
	for(c=0; c<8; c++) {
		maps[c] = [];
		for(r=0; r<8; r++) {
			maps[c][r] = { x : 0, y : 0, type : maps_1[c][r], org: 1 };
		}
	}
	
    background = game.add.sprite(200, 0, 'zone');
    background.width = 800;
    background.height = 800;
    
    for(c = 0; c < 8; c++)
    {
        for(x = 0; x < 8; x++)
        {
            if(maps[x][c].type  === WALL)  // wall 
			{
                drawRec("#FF0000", 200 + c * (OBJECT_SIZE +PADDING_SIZE), x * (OBJECT_SIZE +PADDING_SIZE), OBJECT_SIZE);
			}
            else		// path
			{
                drawRec("#00FF00", 200 + c * (OBJECT_SIZE +PADDING_SIZE), x * (OBJECT_SIZE +PADDING_SIZE), OBJECT_SIZE);
			}
			
			maps[x][c].x = 200 + c * (OBJECT_SIZE +PADDING_SIZE);
			maps[x][c].y = x * (OBJECT_SIZE +PADDING_SIZE);
        }
    }
    
	/* Init path */	
    for(c = 0; c < path_1.length; c++)
    {
		if(path_1[c] == UP)
		{
			paths[c] = game.add.sprite(100, 100 + c * (OBJECT_SIZE +PADDING_SIZE), 'up');
		}
		if(path_1[c] == LEFT)
		{
			paths[c] = game.add.sprite(100, 100 + c * (OBJECT_SIZE +PADDING_SIZE), 'left');
		}
		if(path_1[c] == RIGHT)
		{
			paths[c] = game.add.sprite(100, 100 + c * (OBJECT_SIZE +PADDING_SIZE), 'right');
		}
		if(path_1[c] == DOWN)
		{
			paths[c] = game.add.sprite(100, 100 + c * (OBJECT_SIZE +PADDING_SIZE), 'down');
		}
        paths[c].width = OBJECT_SIZE;
        paths[c].height = OBJECT_SIZE;
       // paths[c].anchor.set(0.5, 0.5);
        paths[c].inputEnabled = true;
        paths[c].input.enableDrag();
        paths[c].events.onInputOver.add(onOver, this);
        paths[c].events.onInputOut.add(onOut, this);
        paths[c].events.onDragStart.add(onDragStart, this);
        paths[c].events.onDragStop.add(onDragStop, this);
    }
	
    dragPosition = new Phaser.Point(paths.x, paths.y);

}

function onOver(sprite, pointer) {

    sprite.tint = 0xff7777;

}

function onOut(sprite, pointer) {

    sprite.tint = 0xffffff;

}

function onDragStart(sprite, pointer) {

    dragPosition.set(sprite.x, sprite.y);

}


function onDragStop(sprite, pointer) {
	for(c = 0; c < 8; c++)
    {
        for(x = 0; x < 8; x++)
        {
			if(maps[x][c].x < pointer.x 
				&& pointer.x < (maps[x][c].x + OBJECT_SIZE)
				&& maps[x][c].y < pointer.y 
				&& pointer.y < (maps[x][c].y + OBJECT_SIZE))
				{
					if(maps[x][c].type == PATH)
					{
						sprite.position.x = maps[x][c].x;
						sprite.position.y = maps[x][c].y;
						return;
					}
				}
				else
				{
					continue;
				}
        }
    }
	if(x >= 8 && c >= 8)
	{
		
		game.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
	}
}

function update () {

}

function render () {

}
