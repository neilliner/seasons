// ********** Water class **********

function Water(){
	this.amount = 200;
	this.p = new Array(this.amount);
	this.color = new Array(this.amount);
	this.isGoingUp = new Array(this.amount);
	this.size = new Array(this.amount);
}

Water.prototype.appear = function(){
	noStroke();	
	for(var i=0;i<this.amount;i++){
		fill(this.color[i]);
		ellipse(this.p[i].x,this.p[i].y,this.size[i],this.size[i]);
	}
	
}

Water.prototype.flow = function(){	
	for(var i=0;i<this.amount;i++){
		this.p[i].x -= 2;
		if(this.p[i].y<(height/2)-random(180)){ this.isGoingUp[i] = false; }
		else if(this.p[i].y>(height/2)+random(180)){ this.isGoingUp[i] = true; }

		if(this.isGoingUp[i] == false){
			this.p[i].y += 1;
		}

		else if(this.isGoingUp[i] == true){
			this.p[i].y -= 1;
		}
	}
	this.reFlow(this.checkDisappear());
}

Water.prototype.init = function(){
	for(var i=0;i<this.amount;i++){
		this.p[i] = createVector(random(width),random(height/2,height));
		if(random(2)<1){this.isGoingUp[i] = false;}
		else{this.isGoingUp[i] = true;}
		this.color[i] = color(0,random(150,200),255,200);
		this.size[i] = random(50,80);
	}
}

Water.prototype.checkDisappear = function(){
	for(i=0;i<this.amount;i++){
		if(this.p[i].x < 0) {
			//console.log(i);
			return i;
		}
	}
}

Water.prototype.reFlow = function(i){
	this.p[i].x = width;
}