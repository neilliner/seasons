// ********** Snow class **********

function Snow(amount){
	this.x = new Array(amount);
	this.y = new Array(amount);
	this.xSpeed = new Array(amount);
	this.ySpeed = new Array(amount);
	this.amount = amount;
	this.sOpac = 255;
	this.size  = new Array(amount);
	this.so = 150;
}

Snow.prototype.appear = function(amt){
	if(amt > this.amount){
		amt = this.amount;
	}
	for(i=0;i<amt;i++){
		var sw = random(5);
		this.so = random(100,200);
		stroke(255,this.so);
		strokeWeight(sw);  // stroke is random
		fill(255,255,255,this.sOpac); // middle always white
		ellipse(this.x[i],this.y[i],this.size[i],this.size[i]);
	}
}

Snow.prototype.updatePos = function(){
	this.sOpac = 255;
	for(i=0;i<this.amount;i++){
		this.x[i] = random(width);
		this.y[i] = 0;		
		this.size[i] = 5;
	}
	for(i=0;i<this.amount;i++){
		this.xSpeed[i] = (random(10));
		this.ySpeed[i] = (random(10));
	}
}

Snow.prototype.fall = function(amt){
	if(amt > this.amount){
		amt = this.amount;
	}
	for(i=0;i<amt;i++){
		this.x[i] += this.xSpeed[i];
		this.y[i] += this.ySpeed[i]; 
	}
}

Snow.prototype.checkDisappear = function(){
	for(i=0;i<this.amount;i++){
		if (this.x[i] < 0 || this.x[i] > width || this.y[i] < 0 || this.y[i] > height-(random(height/4))) {
			return i;
		}
	}
}

Snow.prototype.updatePosWithIndex = function(i){
	this.x[i] = random(width);
	this.y[i] = 0;
	this.size[i] = 5;
}