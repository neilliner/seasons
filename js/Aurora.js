function Aurora(){ 
	this.amount = 25;
	this.ap1 = new Array(this.amount);
	this.ap2 = new Array(this.amount);
	this.ap3 = new Array(this.amount);

	this.cp1 = new Array(this.amount);
	this.cp2 = new Array(this.amount);
	this.cp3 = new Array(this.amount);
	this.cp4 = new Array(this.amount);

	//this.xSpeed = 30;

}


Aurora.prototype.appear = function(){
	for(i = 0; i < this.amount ; i++){
		beginShape();
		noFill();
		stroke(0, i*10, 255, 150);
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
		//if(this.ap2[i].x >= width || this.ap2[i].x <= 0){
			//this.xSpeed *= -1;
			this.ap2[i].x -= 30;
			this.cp2[i].x -= 30;
			this.cp3[i].x -= 30;
	//}
	}

}