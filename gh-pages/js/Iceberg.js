// ********** Iceberg Class **********

function Iceberg(){
	
	this.location = createVector(random(width),random(height));
	
	this.p1 = createVector(this.location.x,this.location.y-40*3);
	this.p2 = createVector(this.location.x,this.location.y+40*3);
	this.p3 = createVector(this.location.x+30*3,this.location.y+30*3);
	this.p4 = createVector(this.location.x-25*3,this.location.y+20*3);
	this.p5 = createVector(this.location.x-45*3,this.location.y+30*3);
	this.p6 = createVector(this.location.x+15*3,this.location.y+60*3);
	this.p7 = createVector(this.location.x-25*3,this.location.y+66*3);
	
	this.c1 = color(random(20,40),170,206);
	this.c2 = color(random(50,100),190,230);
	this.c3 = color(random(100,120),225,240);
	this.c4 = color(random(10,25),100,120);
	this.c5 = color(random(5,15),70,85);
	this.c6 = color(random(0,5),90,100);
	this.c7 = color(random(10,20),50,70);
}

Iceberg.prototype.appear = function(){
	noStroke();
	fill(this.c1); // p1, p2, p3
	triangle(this.p1.x,this.p1.y,this.p2.x,this.p2.y,this.p3.x,this.p3.y);
	fill(this.c2); // p1, p2, p4
	triangle(this.p1.x,this.p1.y,this.p2.x,this.p2.y,this.p4.x,this.p4.y);
	fill(this.c3); // p1, p4, p5
	triangle(this.p1.x,this.p1.y,this.p4.x,this.p4.y,this.p5.x,this.p5.y);
	fill(this.c4);  // p2, p3, p6
	triangle(this.p2.x,this.p2.y,this.p3.x,this.p3.y,this.p6.x,this.p6.y);
	fill(this.c5); // p2, p6, p7
	triangle(this.p2.x,this.p2.y,this.p6.x,this.p6.y,this.p7.x,this.p7.y);
	fill(this.c6); // p2, p4, p7
	triangle(this.p2.x,this.p2.y,this.p4.x,this.p4.y,this.p7.x,this.p7.y);
	fill(this.c7); // p4, p5, p7
	triangle(this.p4.x,this.p4.y,this.p5.x,this.p5.y,this.p7.x,this.p7.y);
}