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
    game.load.image('arrow', "./assets/sprites/arrow.png");
}

var card = [];
var dropZone1;
var dragPosition;

function drawRec(color, x, y, s) {
    var bmd = game.make.bitmapData(s, s);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,s,s);
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();        
    sprite = game.add.sprite(x, y, bmd);     
}


var maps = [[0, 0 ,0 ,0, 0, 0, 0 ,0],
            [1, 1 ,1 ,0, 0, 0, 0 ,0],
            [0, 0 ,1 ,0, 0, 0, 0 ,0],
            [0, 0 ,0 ,1, 1, 1, 0 ,0],
            [0, 0 ,0 ,0, 0, 1, 1 ,1],
            [0, 0 ,0 ,0, 0, 0, 0 ,0],
            [0, 0 ,0 ,0, 0, 0, 0 ,0],
            [0, 0 ,0 ,0, 0, 0, 0 ,0]];

function create() {
	
	var bricks = [];
	for(c=0; c<8; c++) {
		bricks[c] = [];
		for(r=0; r<8; r++) {
			bricks[c][r] = { x: 0, y: 0, type : 1, org: 1 };
		}
	}
	
	for(c = 0; c < 8; c++)
    {
        for(x = 0; x < 8; x++)
        {
			bricks[c][x].type =  maps[c][x];
		}
	}
			
    dropZone1 = game.add.sprite(200, 0, 'zone');
    dropZone1.width = 800;
    dropZone1.height = 800;
    
    for(c = 0; c < 8; c++)
    {
        for(x = 0; x < 8; x++)
        {
            if(bricks[x][c].type  === 0)  // wall 
                drawRec("#FF0000", 200 + c * 100, x * 95, 90);
            else		// path
                drawRec("#00FF00", 200 + c * 100, x * 95, 90);
        }
    }
    
    for(c = 0; c < 8; c++)
    {
        card[c] = game.add.sprite(100, 100 + c * 100, 'arrow');
        card[c].width = 95;
        card[c].height = 95;
        card[c].anchor.set(0.5, 0.5);
        card[c].angle = c  * 90;
        card[c].inputEnabled = true;
        card[c].input.enableDrag();
        card[c].events.onInputOver.add(onOver, this);
        card[c].events.onInputOut.add(onOut, this);
        card[c].events.onDragStart.add(onDragStart, this);
        card[c].events.onDragStop.add(onDragStop, this);
    }

    dragPosition = new Phaser.Point(card.x, card.y);

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
    if (!sprite.overlap(dropZone1))
    {
        game.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
    }
}

function update () {

}

function render () {

}
