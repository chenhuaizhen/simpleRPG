var wall = new Image();
var canvas;
var ctx;
var canvasM;
var ctxM;
var barry = new Image();
var lizard = new Image();
var B;
var L;
var now;
var attackNow;
var trapGroup = new Array();
var gameLoop;
var toolGroup = new Array();
var tool1 = new Image();
var attack1 = new Image();
var attack2 = new Image();
var attackLoop;
var attackObj;

function attack(){
	this.x;
	this.y;
	this.direct;
	this.picnum;
	this.val;
	this.update = updateAttack;
}

function updateAttack(){
	ctx.clearRect(this.x*35,this.y*35,35,35);
	drawBack(this.val,this.y,this.x);
	switch(this.direct){
		case 1:
			if(this.picnum==1)
				ctx.drawImage(barry,B.picnum*31.33,2*32,31.33,32,B.x*35,B.y*35,35,35);
			if(this.picnum==5)
				cancelAnimationFrame(attackLoop);
			if(this.x!=35){
				if(group[this.y*35+this.x+1]==0||group[this.y*35+this.x+1]==8||
					group[this.y*35+this.x+1]==9||group[this.y*35+this.x+1]==16||
					group[this.y*35+this.x+1]==34||group[this.y*35+this.x+1]==35||
					group[this.y*35+this.x+1]==36||group[this.y*35+this.x+1]==38)
				{
					this.val = group[this.y*35+this.x+1];
					this.x++;
				}else{
					cancelAnimationFrame(attackLoop);
					return;
				}
			}
			ctx.drawImage(attack1,this.picnum*8,0,8,13,this.x*35,this.y*35,35,35);
			this.picnum++;
			break;
		case 3:
			if(this.picnum==1)
				ctx.drawImage(barry,B.picnum*31.33,1*32,31.33,32,B.x*35,B.y*35,35,35);
			if(this.picnum==5)
				cancelAnimationFrame(attackLoop);
			if(this.x!=0){
				if(group[this.y*35+this.x-1]==0||group[this.y*35+this.x-1]==8||
					group[this.y*35+this.x-1]==9||group[this.y*35+this.x-1]==16||
					group[this.y*35+this.x-1]==34||group[this.y*35+this.x-1]==35||
					group[this.y*35+this.x-1]==36||group[this.y*35+this.x-1]==38)
				{
					this.val = group[this.y*35+this.x-1];
					this.x--;
				}else{
					cancelAnimationFrame(attackLoop);
					return;
				}
			}
			ctx.drawImage(attack2,32-this.picnum*8,0,8,13,this.x*35,this.y*35,35,35);
			this.picnum++;
			break;
	}
}

function attackInitLoop(){
    attackLoop = requestAnimationFrame(attackInitLoop);
    if(new Date()-attackNow>100){
    	attackObj.update();
    	attackNow = new Date();
    }
}

function trap(){
	this.x;
	this.y;
	this.times;
	this.val;
	this.update = updateTrap;
}

function updateTrap(){
	ctx.clearRect(this.x*35,this.y*35,35,35);
	drawBack(this.val,this.y,this.x);
	switch(this.times){
		case 0:
			ctx.drawImage(wall,54,210,50,50,this.x*35+5,this.y*35+5,0,0);
			break;
		case 1:
			ctx.drawImage(wall,54,210,50,50,this.x*35+15,this.y*35+15,10,10);
			break;			
		case 2:
			ctx.drawImage(wall,54,210,50,50,this.x*35+10,this.y*35+10,15,15);
			break;
		case 3:
			ctx.drawImage(wall,54,210,50,50,this.x*35+5,this.y*35+5,25,25);
			break;		
	}
	if(this.times!=0){
		if(B.x==this.x&&B.y==this.y){
			alert("you are dead");
			cancelAnimationFrame(gameLoop);
			return;
		}
	}
	this.times++;
	if(this.times==4)
		this.times=0;
}

function initTrap(){
	for(var i=0;i<18;i++){
		for(var j=0;j<35;j++){
			if(group[i*35+j]==0||group[i*35+j]==34){
				if(Math.random()<0.2){
					var temp = new trap();
					temp.x = j;
					temp.y = i;
					temp.val = group[i*35+j];
					temp.times = 0;
					temp.now = new Date();
					trapGroup.push(temp);
				}
			}
		}
	}
}

function beast(){
	this.x;
	this.y;
	this.direct;
	this.lastdirect;
	this.picnum;
	this.val;
	this.name;
	this.move = moveBeast;
	this.init = initBeast;
	this.rule;
}

function beastLoop(){
    gameLoop = requestAnimationFrame(beastLoop);
    if(new Date()-now>350){
    	L.direct = Math.floor(Math.random()*4);
    	L.move();
    	for(var i=0;i<trapGroup.length;i++){
    		if(Math.random()<0.2)
    			trapGroup[i].update();
    	}
    	now = new Date();
    }
}

function initBeast(){
	this.x = 22;
	this.y = 1;
	this.direct = 1;
	this.lastdirect = 1;
	this.val = 0;
	this.picnum = 2;
	this.name = lizard;
	ctx.drawImage(this.name,this.picnum*32,2*32,32,32,this.x*35,this.y*35,35,35);	
}

function moveBeast(){
	if(this.direct!=this.lastdirect){
		this.lastdirect = this.direct;
		this.picnum=2;
	}
	ctx.clearRect(this.x*35,this.y*35,35,35);
	drawBack(this.val,this.y,this.x);
	switch(this.direct){
		case 0:
			if(this.y!=0){
				if(group[(this.y-1)*35+this.x]==0||group[(this.y-1)*35+this.x]==8||
					group[(this.y-1)*35+this.x]==9||group[(this.y-1)*35+this.x]==16||
					group[(this.y-1)*35+this.x]==34||group[(this.y-1)*35+this.x]==35||
					group[(this.y-1)*35+this.x]==36||group[(this.y-1)*35+this.x]==38)
				{
					this.val = group[(this.y-1)*35+this.x];
					this.y--;
					if(this.y==B.y&&this.x==B.x){
						alert("you are dead");
						cancelAnimationFrame(gameLoop);
						return;
					}
				}
			}
			ctx.drawImage(this.name,this.picnum*32,3*32,32,32,this.x*35,this.y*35,35,35);	
			this.picnum++;
			if(this.picnum==3)
				this.picnum=0;
			break;
		case 1:
			if(this.x!=35){
				if(group[this.y*35+this.x+1]==0||group[this.y*35+this.x+1]==8||
					group[this.y*35+this.x+1]==9||group[this.y*35+this.x+1]==16||
					group[this.y*35+this.x+1]==34||group[this.y*35+this.x+1]==35||
					group[this.y*35+this.x+1]==36||group[this.y*35+this.x+1]==38)
				{
					this.val = group[this.y*35+this.x+1];
					this.x++;
					if(this.y==B.y&&this.x==B.x){
						alert("you are dead");
						cancelAnimationFrame(gameLoop);
						return;
					}
				}
			}
			ctx.drawImage(this.name,this.picnum*32,2*32,32,32,this.x*35,this.y*35,35,35);	
			this.picnum++;
			if(this.picnum==3)
				this.picnum=0;
			break;
		case 2:
			if(this.y!=17){
				if(group[(this.y+1)*35+this.x]==0||group[(this.y+1)*35+this.x]==8||
					group[(this.y+1)*35+this.x]==9||group[(this.y+1)*35+this.x]==16||
					group[(this.y+1)*35+this.x]==34||group[(this.y+1)*35+this.x]==35||
					group[(this.y+1)*35+this.x]==36||group[(this.y+1)*35+this.x]==38)
				{
					this.val = group[(this.y+1)*35+this.x];
					this.y++;
					if(this.y==B.y&&this.x==B.x){
						alert("you are dead");
						cancelAnimationFrame(gameLoop);
						return;
					}
				}
			}
			ctx.drawImage(this.name,this.picnum*32,0,32,32,this.x*35,this.y*35,35,35);	
			this.picnum++;
			if(this.picnum==3)
				this.picnum=0;
			break;
		case 3:
			if(this.x!=0){
				if(group[this.y*35+this.x-1]==0||group[this.y*35+this.x-1]==8||
					group[this.y*35+this.x-1]==9||group[this.y*35+this.x-1]==16||
					group[this.y*35+this.x-1]==34||group[this.y*35+this.x-1]==35||
					group[this.y*35+this.x-1]==36||group[this.y*35+this.x-1]==38)
				{
					this.val = group[this.y*35+this.x-1];
					this.x--;
					if(this.y==B.y&&this.x==B.x){
						alert("you are dead");
						cancelAnimationFrame(gameLoop);
						return;
					}
				}
			}
			ctx.drawImage(this.name,this.picnum*32,1*32,32,32,this.x*35,this.y*35,35,35);	
			this.picnum++;
			if(this.picnum==3)
				this.picnum=0;
			break;
	}
}

function tool(){
	this.x;
	this.y;
	this.name;
	this.val;
	this.update = updateTool;
}

function updateTool(){
	if(this.x==B.x&&this.y==B.y){
		alert("get the tool :"+this.val);
		this.x=-1;
		this.y=-1;
	}
}

function initTool(){
	var temp = new tool();
	temp.x = 30;
	temp.y = 16;
	temp.name=tool1;
	temp.val="tool1";
	ctx.drawImage(temp.name,0,0,22,21,temp.x*35+5,temp.y*35+5,25,25);
	toolGroup.push(temp);
}

function person(){
	this.x;
	this.y;
	this.direct;
	this.lastdirect;
	this.picnum;
	this.val;
	this.move = move;
	this.init = initPerson;
}

function move(){
	if(this.direct!=this.lastdirect){
		this.lastdirect = this.direct;
		this.picnum=1;
	}
	ctx.clearRect(this.x*35,this.y*35,35,35);
	drawBack(this.val,this.y,this.x);
	switch(this.direct){
		case 0:
			if(this.y!=0){
				if(group[(this.y-1)*35+this.x]==0||group[(this.y-1)*35+this.x]==8||
					group[(this.y-1)*35+this.x]==9||group[(this.y-1)*35+this.x]==16||
					group[(this.y-1)*35+this.x]==34||group[(this.y-1)*35+this.x]==35||
					group[(this.y-1)*35+this.x]==36||group[(this.y-1)*35+this.x]==38)
				{
					this.val = group[(this.y-1)*35+this.x];
					this.y--;
				}
			}
			ctx.drawImage(barry,this.picnum*31.33,3*32,31.33,32,this.x*35,this.y*35,35,35);	
			mask(this.x*35,this.y*35);
			this.picnum++;
			if(this.picnum==2)
				this.picnum=0;
			break;
		case 1:
			if(this.x!=35){
				if(group[this.y*35+this.x+1]==0||group[this.y*35+this.x+1]==8||
					group[this.y*35+this.x+1]==9||group[this.y*35+this.x+1]==16||
					group[this.y*35+this.x+1]==34||group[this.y*35+this.x+1]==35||
					group[this.y*35+this.x+1]==36||group[this.y*35+this.x+1]==38)
				{
					this.val = group[this.y*35+this.x+1];
					this.x++;
				}
			}
			ctx.drawImage(barry,this.picnum*31.33,2*32,31.33,32,this.x*35,this.y*35,35,35);	
			mask(this.x*35,this.y*35);
			this.picnum++;
			if(this.picnum==2)
				this.picnum=0;
			break;
		case 2:
			if(this.y!=17){
				if(group[(this.y+1)*35+this.x]==0||group[(this.y+1)*35+this.x]==8||
					group[(this.y+1)*35+this.x]==9||group[(this.y+1)*35+this.x]==16||
					group[(this.y+1)*35+this.x]==34||group[(this.y+1)*35+this.x]==35||
					group[(this.y+1)*35+this.x]==36||group[(this.y+1)*35+this.x]==38)
				{
					this.val = group[(this.y+1)*35+this.x];
					this.y++;
				}
			}
			ctx.drawImage(barry,this.picnum*31.33,0,31.33,32,this.x*35,this.y*35,35,35);
			mask(this.x*35,this.y*35);	
			this.picnum++;
			if(this.picnum==2)
				this.picnum=0;
			break;
		case 3:
			if(this.x!=0){
				if(group[this.y*35+this.x-1]==0||group[this.y*35+this.x-1]==8||
					group[this.y*35+this.x-1]==9||group[this.y*35+this.x-1]==16||
					group[this.y*35+this.x-1]==34||group[this.y*35+this.x-1]==35||
					group[this.y*35+this.x-1]==36||group[this.y*35+this.x-1]==38)
				{
					this.val = group[this.y*35+this.x-1];
					this.x--;
				}
			}
			ctx.drawImage(barry,this.picnum*31.33,1*32,31.33,32,this.x*35,this.y*35,35,35);	
			mask(this.x*35,this.y*35);
			this.picnum++;
			if(this.picnum==2)
				this.picnum=0;
			break;
	}
	for(var i=0;i<toolGroup.length;i++)
		toolGroup[i].update();
}

function initPerson(){
	this.x = 34;
	this.y = 16;
	this.direct = 3;
	this.lastdirect = 3;
	this.val = 38;
	this.picnum = 1;
	ctx.drawImage(barry,this.picnum*31.33,1*32,31.33,32,this.x*35,this.y*35,35,35);	
	mask(this.x*35,this.y*35);
}

$(document).ready(function(){
	init();
});

function init(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	canvas.addEventListener('mousedown',drawImage,false);
	canvasM = document.getElementById('canvasM');
	ctxM = canvasM.getContext('2d');
	canvasM.addEventListener('mousedown',drawImage,false);

    ctx.clearRect(0,0,500,500);
    wall.src="game.png";
    barry.src="Barry.png";
    lizard.src="lizard.png";
    tool1.src="tool1.png";
    attack1.src="attack1.png";
    attack2.src="attack2.png";
    B = new person();
    L = new beast();
    initTrap();
}

function drawImage(e){
	initWall();
	B.init();
	L.init();
	now = new Date();
	initTool();
	beastLoop();
}

var group =[32,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,6,6,6,28,28,28,28,28,28,28,28,28,28,28,28,28,28,
			34,34,34,34,34,13,13,13,13,13,13,13,13,13,13,34,13,13,6,6,6,28,0,0,0,0,0,0,0,0,0,0,0,0,28,
			13,13,13,13,34,34,13,13,13,13,13,34,34,13,13,34,13,13,6,6,6,28,0,18,22,23,18,0,14,14,14,14,0,0,28,
			13,34,34,13,13,34,34,35,34,34,13,34,34,35,35,34,13,13,6,6,6,28,0,18,18,18,18,0,6,6,6,6,0,0,28,
			13,34,34,13,13,13,13,13,34,34,13,13,36,13,13,36,13,13,6,6,6,28,0,0,0,0,0,0,8,8,8,8,0,0,28,
			13,36,13,13,13,13,13,13,13,36,13,34,34,13,13,36,13,13,6,6,6,28,0,14,14,14,14,0,6,6,6,6,0,0,28,
			13,34,34,34,34,13,13,13,13,34,34,34,13,13,13,34,34,34,6,6,6,28,0,0,0,0,0,0,14,14,14,14,0,0,28,
			13,34,13,13,34,35,35,35,35,34,34,34,35,35,35,34,34,34,8,8,8,0,0,0,0,0,0,0,28,28,0,0,0,0,0,
			13,34,34,34,34,13,13,13,13,34,34,34,13,13,13,34,34,34,6,6,6,28,28,28,28,28,0,0,28,28,0,17,17,17,17,
			13,36,13,13,34,13,13,13,13,34,34,34,34,13,13,36,13,13,6,6,6,28,19,19,19,28,0,0,28,28,0,17,31,31,31,
			13,36,13,13,34,13,13,13,13,34,34,34,34,13,34,34,34,34,6,6,6,28,19,19,19,28,0,0,28,28,0,24,23,25,26,
			13,36,13,13,34,13,13,13,13,13,36,13,13,13,34,13,13,36,6,6,6,28,28,28,28,28,0,0,28,28,0,0,0,0,0,
			13,36,13,13,34,34,34,34,13,13,36,13,13,13,13,13,13,34,8,8,8,0,0,0,0,0,0,0,28,28,28,6,9,6,28,
			13,34,34,13,13,13,13,13,13,13,36,13,13,13,13,13,13,34,6,6,6,0,14,14,0,0,0,0,28,28,28,6,9,6,28,
			13,34,34,34,13,34,34,13,13,13,34,34,34,34,34,13,13,34,6,6,6,0,14,14,0,17,17,17,17,28,28,6,9,6,28,
			13,34,34,34,13,34,34,35,35,35,34,34,34,34,34,35,35,34,6,6,6,0,0,0,0,26,29,29,29,28,28,6,9,6,28,
			13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,34,6,6,6,17,17,17,17,24,29,29,29,28,0,0,0,0,38,
			13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,6,6,6,17,18,18,18,18,29,29,29,28,28,28,28,28,28];

function drawBack(point,i,j){
	switch(point){
		case 0://road
			(function(x,y){ctx.drawImage(wall,106,158,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 1://wall1
			(function(x,y){ctx.drawImage(wall,54,54,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 2://wall2
			(function(x,y){ctx.drawImage(wall,2,54,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 3://wall3
			(function(x,y){ctx.drawImage(wall,158,2,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 4://wall4
			(function(x,y){ctx.drawImage(wall,106,2,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 5://wall5
			(function(x,y){ctx.drawImage(wall,54,2,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 6://water
			(function(x,y){ctx.drawImage(wall,2,2,50,50,y*35,x*35,35,35);})(i,j);
			if(Math.random()<0.2)
				(function(x,y){ctx.drawImage(wall,210,243,25,23,y*35+7.5,x*35+7.5,20,20);})(i,j);
			break;
		case 7://grass
			(function(x,y){ctx.drawImage(wall,106,210,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 8://bridge1
			(function(x,y){ctx.drawImage(wall,106,262,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 9://bridge2
			(function(x,y){ctx.drawImage(wall,54,262,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 10://castle
			(function(x,y){ctx.drawImage(wall,2,262,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 11://mountain
			(function(x,y){ctx.drawImage(wall,106,210,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,54,210,50,48,y*35,x*35,35,35);})(i,j);
			break;
		case 12://mountain2
			(function(x,y){ctx.drawImage(wall,106,210,50,50,y*35,x*35,35,35);})(i,j);
			var size = Math.random()*25+25;
			(function(x,y){ctx.drawImage(wall,2,210,size,size,y*35,x*35,35,35);})(i,j);
			break;
		case 13://mountain3
			var size = Math.random()*25+25;
			(function(x,y){ctx.drawImage(wall,158,158,size,size,y*35,x*35,35,35);})(i,j);
			break;
		case 14://tree
			(function(x,y){ctx.drawImage(wall,106,158,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,158,106,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 15://tree2
			(function(x,y){ctx.drawImage(wall,106,106,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 16://trap
			(function(x,y){ctx.drawImage(wall,106,158,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,54,210,50,50,y*35+5,x*35+5,25,25);})(i,j);
			break;
		case 17://hinder
			(function(x,y){ctx.drawImage(wall,106,158,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,210,2,44,50,y*35,x*35,35,35);})(i,j);
			break;
		case 18://flower1
			(function(x,y){ctx.drawImage(wall,106,210,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,158,210,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 19://flower2
			(function(x,y){ctx.drawImage(wall,106,210,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,210,216,25,25,y*35,x*35,17.5,17.5);})(i,j);
			(function(x,y){ctx.drawImage(wall,210,216,25,25,y*35+17.5,x*35+17.5,17.5,17.5);})(i,j);
			break;
		case 20://flower3
			(function(x,y){ctx.drawImage(wall,106,210,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,210,189,25,25,y*35+5,x*35+5,25,25);})(i,j);
			break;
		case 21://flower4
			(function(x,y){ctx.drawImage(wall,106,210,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,210,268,25,21,y*35+5,x*35+5,25,25);})(i,j);
			break;
		case 22://house1
			(function(x,y){ctx.drawImage(wall,106,158,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,210,162,25,25,y*35,x*35,35,35);})(i,j);
			break;
		case 23://house2
			(function(x,y){ctx.drawImage(wall,106,158,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,210,135,25,25,y*35,x*35,35,35);})(i,j);
			break;
		case 24://house3
			(function(x,y){ctx.drawImage(wall,106,158,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,210,108,25,25,y*35,x*35,35,35);})(i,j);
			break;
		case 25://house4
			(function(x,y){ctx.drawImage(wall,106,158,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,210,81,25,25,y*35,x*35,35,35);})(i,j);
			break;
		case 26://house5
			(function(x,y){ctx.drawImage(wall,106,158,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,210,54,25,25,y*35,x*35,35,35);})(i,j);
			break;
		case 27://leaf
			(function(x,y){ctx.drawImage(wall,106,158,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,210,243,25,23,y*35,x*35,35,35);})(i,j);
			break;
		case 28://tree3
			(function(x,y){ctx.drawImage(wall,106,210,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,54,106,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 29://vegetable1
			(function(x,y){ctx.drawImage(wall,106,210,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,2,106,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 30://vegetable2
			(function(x,y){ctx.drawImage(wall,106,210,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,158,54,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 31://vegetable3
			(function(x,y){ctx.drawImage(wall,106,210,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,106,54,50,50,y*35,x*35,35,35);})(i,j);
			break;	
		case 32://transforEnd
			(function(x,y){ctx.drawImage(wall,54,158,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,158,262,50,46,y*35,x*35,35,35);})(i,j);
			break;
		case 33://tip
			(function(x,y){ctx.drawImage(wall,106,158,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,2,158,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 34://road2
			(function(x,y){ctx.drawImage(wall,54,158,50,50,y*35,x*35,35,35);})(i,j);
			break;
		case 35://route
			var size = Math.random()*25+25;
			(function(x,y){ctx.drawImage(wall,158,158,size,size,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,210,291,19,25,y*35,x*35,35,35);})(i,j);
			break;	
		case 36://route2
			var size = Math.random()*25+25;
			(function(x,y){ctx.drawImage(wall,158,158,size,size,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,237,54,25,17,y*35+5,x*35,30,35);})(i,j);
			//(function(x,y){ctx.drawImage(wall,240,54,18,17,y*35+5,x*35,35,35);})(i,j);
			break;	
		case 37://tip2
			(function(x,y){ctx.drawImage(wall,158,310,23,23,y*35,x*35,35,35);})(i,j);
			break;	
		case 38://transforBegin
			(function(x,y){ctx.drawImage(wall,106,158,50,50,y*35,x*35,35,35);})(i,j);
			(function(x,y){ctx.drawImage(wall,158,262,50,46,y*35,x*35,35,35);})(i,j);
			break;			
	}
}

function initWall(){
	for(var i=0;i<18;i++){
		for(var j=0;j<35;j++){
			drawBack(group[i*35+j],i,j);
		}
	}
}

$(document).keydown(
	function(event){
	switch(event.keyCode)
	{
		case 32://space
			event.preventDefault();
			attackObj = new attack();
			attackObj.x = B.x;
			attackObj.y = B.y;
			attackObj.direct = B.direct;
			attackObj.val = B.val;
			attackObj.picnum = 1;
			if(attackObj.direct==1)
				ctx.drawImage(attack1,0,0,8,13,attackObj.x*35+10,attackObj.y*35+10,20,20);
			else if(attackObj.direct==3)
				ctx.drawImage(attack2,32,0,8,13,attackObj.x*35,attackObj.y*35,35,35);
			attackNow = new Date();
			attackInitLoop();
			break;
		case 37://left
			event.preventDefault();
			B.direct = 3;
			B.move();
			break;
		case 38://up
			event.preventDefault();
			B.direct = 0;
			B.move();
			break;
		case 39://right
			event.preventDefault();
			B.direct = 1;
			B.move();
			break;
		case 40://down
			event.preventDefault();
			B.direct = 2;
			B.move();
			break;
		default:
			break;
	}		
});

function mask(x,y){
	ctxM.clearRect(0,0,1225,630);  
    ctxM.globalCompositeOperation="source-over";  
    ctxM.fillRect(0,0,1225,630);  
    ctxM.globalCompositeOperation="destination-out";  
    ctxM.beginPath();  
    ctxM.arc(x,y,100,0,Math.PI*2,true);  
    ctxM.fill();
}