// ********** Water class **********

function Water(amount){
	this.amount = amount;
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
		if(this.p[i].y<(height-(height/9))-random(180)){ 
			this.isGoingUp[i] = false; 
		}
		else if(this.p[i].y>(height-(height/9))+random(180)){ 
			this.isGoingUp[i] = true; 
		}
		if(this.isGoingUp[i] == false){
			this.p[i].y += 1 * 3;
		}
		else if(this.isGoingUp[i] == true){
			this.p[i].y -= 1 * 3;
		}
	}
	this.reFlow();
}

Water.prototype.init = function(){
	for(var i=0;i<this.amount;i++){
		this.p[i] = createVector(random(0 - 1000,width + 2000),random(height/2+200,height));
		if(random(2)<1){this.isGoingUp[i] = false;}
		else{this.isGoingUp[i] = true;}
		this.color[i] = color(255,255,255,50);
		this.size[i] = random(10,20);
	}
}

Water.prototype.reFlow = function(i){
	for(i=0;i<this.amount;i++){
		if(this.p[i].x < 0 - 1000) {
			this.p[i] = createVector(width+2000,this.p[i].y);
		}
	}
}