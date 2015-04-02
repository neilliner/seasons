// ********** Aurora class **********

function Aurora(){ 
	this.amount = 25;
	this.ap1 = new Array(this.amount);
	this.ap2 = new Array(this.amount);
	this.ap3 = new Array(this.amount);

	this.cp1 = new Array(this.amount);
	this.cp2 = new Array(this.amount);
	this.cp3 = new Array(this.amount);
	this.cp4 = new Array(this.amount);

	this.isAp2GoingLeft = true;
	this.isAp1GoingLeft = true;
}


Aurora.prototype.appear = function(){
	for(i = 0; i < this.amount ; i++){
		beginShape();
		noFill();
		stroke(35, i*10, 70+i*2, 150);
		strokeWeight(10);
		vertex(this.ap1[i].x, this.ap1[i].y); 
		bezierVertex(this.cp1[i].x, this.cp1[i].y, this.cp2[i].x, this.cp2[i].y, this.ap2[i].x, this.ap2[i].y);
		bezierVertex(this.cp3[i].x, this.cp3[i].y, this.cp4[i].x, this.cp4[i].y, this.ap3[i].x, this.ap3[i].y);
		endShape();
	}
}

Aurora.prototype.init = function(){
	var c = width / 3; // aurora ap2 control point length
	for(i = 0; i < this.amount ; i++){
		this.ap1[i] = createVector( width/ 2 + (i*5), -10 );
		this.ap2[i] = createVector(width/2 + (i*5), height/4);
		this.ap3[i] = createVector(width/2 + (i*5), height+10);

		this.cp1[i] = createVector(this.ap1[i].x + width/4, this.ap1[i].y );
		this.cp2[i] = createVector(this.ap2[i].x + c, this.ap2[i].y + c);
		this.cp3[i] = createVector(this.ap2[i].x - c, this.ap2[i].y - c);
		this.cp4[i] = createVector(this.ap3[i].x - width/4, this.ap3[i].y );
	}
}
Aurora.prototype.move = function(){
	for(i = 0; i < this.amount ; i++){
		if(this.ap2[0].x < 0-1000){
			this.isAp2GoingLeft = false;
		}
		else if(this.ap2[0].x > width + 1000){
			this.isAp2GoingLeft = true;
		}
		if(this.isAp2GoingLeft){
			this.ap2[i].x -= 5;
			this.cp2[i].x -= 5;
			this.cp3[i].x -= 5;
		}
		else{
			this.ap2[i].x += 5;
			this.cp2[i].x += 5;
			this.cp3[i].x += 5;
		}

		if(this.ap1[0].x < 0){
			this.isAp1GoingLeft = false;
		}
		else if(this.ap1[0].x > width){
			this.isAp1GoingLeft = true;
		}
		if(this.isAp1GoingLeft){
			this.ap1[i].x -= 1;
			this.cp1[i].x -= 1;
		}
		else{
			this.ap1[i].x += 1;
			this.cp1[i].x += 1;
		}
	}
}