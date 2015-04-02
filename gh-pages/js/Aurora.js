// ********** Aurora class **********

function Aurora(){
	//this.location = createVector(width/2,0);
	this.x = new Array(width);
	this.y = new Array(width);
	this.amount = width;
	this.len1 = new Array(width);
	this.len2 = new Array(width);
	this.isGoingUp = new Array(width);
	this.lc1 = color(0,255,50,50);
	this.lc2 = color(0,50,255,50);
}

Aurora.prototype.appear = function(){
	//angleMode(DEGREES);
	strokeWeight(5);
	for(var i=0;i<this.amount;i++){
		stroke(lerpColor(this.lc1,this.lc2,i*0.0005));

		push();
			// if(i>this.amount/3){
			// 	rotate(70);
			// }else{
			// 	rotate(90);
			// }
			// translate((this.x[i]+i)-600,this.y[i]-this.len1[i]-height*1.25);
			translate(this.x[i]+i,this.y[i]-this.len1[i]);
			line(0,0,0,1+i/5);
		pop();
	}
}

Aurora.prototype.lengthOfAur = function(){
	 var n = 0.0;
	for(var i=0;i<this.amount;i++){
		this.x[i] = 0;
		this.y[i] = height/2;
		this.len1[i] = 1;
		this.len1[i] += (noise(n)*100);
		n+=0.005;
		//this.location[i] = createVector(width/2,0);
	}
}

Aurora.prototype.updateLen = function(){
	for(var i=0;i<this.amount;i++){

		if(this.y[i]<(height/2)-random(180)){ this.isGoingUp[i] = false; }
		else if(this.y[i]>(height/2)+random(180)){ this.isGoingUp[i] = true; }

		if(this.isGoingUp[i] == false){
			this.y[i] += (1*i/5000);
		}

		else if(this.isGoingUp[i] == true){
			this.y[i] -= (1*i/5000);
		}

		else{
			this.y[i] -= (1*i/5000);
		}
	}
}