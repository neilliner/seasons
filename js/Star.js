// ********** Star class **********

function Star(amount){
	this.x = new Array(amount);
	this.y = new Array(amount);
	this.xSpeed = new Array(amount);
	this.ySpeed = new Array(amount);
	this.amount = amount;
	this.sOpac = 255;
	this.size  = new Array(amount);
	this.so = 150;
}

Star.prototype.appear = function(){
	for(i=0;i<this.amount;i++){
		stroke(65,255,200,0); //head of the shootign star
		strokeWeight(5);
		line(this.x[i],this.y[i],this.x[i]-20,this.y[i]-20);
	}
}

Star.prototype.tail= function(){  // the tail for the shooting stars
	
	for(i=0;i<this.amount;i++){	
		noStroke();
		var xx = this.x[i];
		var yy = this.y[i];
		var opac = 200;
		var size = 10;
		for(j=100;j>0;j--){
			fill(255,255,255,opac);
			ellipse(xx+(20+j*2),yy+(20+j*2),size,size);
			opac -=2;
			size -= 0.1;
		}
	}
}

Star.prototype.updatePos = function(){
	this.sOpac = 255;
	for(i=0;i<this.amount;i++){
		this.x[i] = random(-500, width);
		this.y[i] = random(-200, -500);
		this.size[i] = 5;
	}
	for(i=0;i<this.amount;i++){
		this.xSpeed[i] = 5;
		this.ySpeed[i] = 5;
	}
}

Star.prototype.fall = function(){
	for(i=0;i<this.amount;i++){
		this.x[i] += this.xSpeed[i];
		this.y[i] += this.ySpeed[i]; 
	}
}

Star.prototype.checkDisappear = function(){
	for(i=0;i<this.amount;i++){
		if (this.x[i] < 0 || this.x[i] > width  || this.y[i] > height) {
			return i;
		}
	}
}

Star.prototype.updatePosWithIndex = function(i){
	this.x[i] = random(-500, width);
	this.y[i] = random(-200, -500);
	this.size[i] = 100;
}