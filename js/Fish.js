// ********** Fish class **********

function Fish(amount){
	this.amount = amount;
	this.fishP = new Array(this.amount);
	this.isSwimLeft = new Array(this.amount);
	this.speed = new Array(this.amount);
	this.c = new Array(this.amount);
}

Fish.prototype.init= function(){
	for(var i=0;i<this.amount;i++){
		this.fishP[i] = createVector(random(width),random(height/2,height));
		this.c[i] = color(random(255),random(255),random(255),255);
		this.speed[i] = random(.5,1);
		if(random(2) < 1){
			this.isSwimLeft[i] = false;
		}
		else{
			this.isSwimLeft[i] = true;
		}
	}
}

Fish.prototype.appear = function(){

	for(var i=0;i<this.amount;i++){
		fill(this.c[i]);
		noStroke();
		if(this.isSwimLeft[i]){
			var tail = random(25,30);
			ellipse(this.fishP[i].x,this.fishP[i].y,40,20);
			triangle(this.fishP[i].x+15,this.fishP[i].y,this.fishP[i].x+tail,this.fishP[i].y-10,this.fishP[i].x+tail,this.fishP[i].y+10);
		}
		else{
			var tail = random(25,30);
			ellipse(this.fishP[i].x,this.fishP[i].y,40,20);
			triangle(this.fishP[i].x-15,this.fishP[i].y,this.fishP[i].x-tail,this.fishP[i].y-10,this.fishP[i].x-tail,this.fishP[i].y+10);
		}
		this.swim();
	}
}

Fish.prototype.swim = function(){
	for(var i=0;i<this.amount;i++){
		if(this.fishP[i].x < 0){
			this.isSwimLeft[i] = false;
		}
		else if(this.fishP[i].x > width+200){
			this.isSwimLeft[i] = true;
		}
		if(this.isSwimLeft[i]){
			this.fishP[i].x -= this.speed[i];
		}
		else{
			this.fishP[i].x += this.speed[i];
		}
	}
}