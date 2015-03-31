// ********** Iceberg Class **********

function Iceberg(amount){
	this.amount = amount;
	this.p1 = new Array(this.amount);
	this.p2 = new Array(this.amount);
	this.p3 = new Array(this.amount);
	this.p4 = new Array(this.amount);
	this.p5 = new Array(this.amount);
	this.p6 = new Array(this.amount);
	this.p7 = new Array(this.amount);
	
	this.c1 = new Array(this.amount);
	this.c2 = new Array(this.amount);
	this.c3 = new Array(this.amount);
	this.c4 = new Array(this.amount);
	this.c5 = new Array(this.amount);
	this.c6 = new Array(this.amount);
	this.c7 = new Array(this.amount);
	this.location = new Array(this.amount);
}

Iceberg.prototype.appear = function(){
	for(i = 0; i < this.amount; i++){

	noStroke();
	fill(this.c1[i]); // p1, p2, p3
	triangle(this.p1[i].x,this.p1[i].y,this.p2[i].x,this.p2[i].y,this.p3[i].x,this.p3[i].y);
	fill(this.c2[i]); // p1, p2, p4
	triangle(this.p1[i].x,this.p1[i].y,this.p2[i].x,this.p2[i].y,this.p4[i].x,this.p4[i].y);
	fill(this.c3[i]); // p1, p4, p5
	triangle(this.p1[i].x,this.p1[i].y,this.p4[i].x,this.p4[i].y,this.p5[i].x,this.p5[i].y);
	fill(this.c4[i]);  // p2, p3, p6
	triangle(this.p2[i].x,this.p2[i].y,this.p3[i].x,this.p3[i].y,this.p6[i].x,this.p6[i].y);
	fill(this.c5[i]); // p2, p6, p7
	triangle(this.p2[i].x,this.p2[i].y,this.p6[i].x,this.p6[i].y,this.p7[i].x,this.p7[i].y);
	fill(this.c6[i]); // p2, p4, p7
	triangle(this.p2[i].x,this.p2[i].y,this.p4[i].x,this.p4[i].y,this.p7[i].x,this.p7[i].y);
	fill(this.c7[i]); // p4, p5, p7
	triangle(this.p4[i].x,this.p4[i].y,this.p5[i].x,this.p5[i].y,this.p7[i].x,this.p7[i].y);

	}
}

Iceberg.prototype.init = function(){
	var dep = height/4;
	
	
	for(i = 0; i < this.amount; i++){
	var mul = random(2,4);
	var ran1 = random(35,45); // 40
	var ran2 = random(25,35); // 30
	var ran3 = random(20,30); // 25
	var ran4 = random(15,25); // 20
	var ran5 = random(40,50); // 45
	var ran6 = random(10,20); // 15
	var ran7 = random(55,65); // 60
	var ran8 = random(60,70); // 65

	this.location[i] = createVector(random(width),random(height-dep*2, height-dep));
	if(i>0){
	// if(this.location[i].x - this.location[i-1].x < 200 && this.location[i-1].x - this.location[i].x > 0 - 200){
	// 	this.location[i].x = this.location[i].x + 300;
	// 	//console.log("OK!!!!1");
	// }

	// else if(this.location[i-1].x - this.location[i].x < 200 && this.location[i].x - this.location[i-1].x > 0 - 200){
	// 	//console.log("OK!!!!2");
	// 	this.location[i].x = this.location[i].x - 300;
	// }
	this.location[i].x = this.location[i-1].x +500;
	}
	this.p1[i] = createVector(this.location[i].x,this.location[i].y-ran1*mul);
	this.p2[i] = createVector(this.location[i].x,this.location[i].y+ran2*mul);
	this.p3[i] = createVector(this.location[i].x+ran2*mul,this.location[i].y+ran2*mul);
	this.p4[i] = createVector(this.location[i].x-ran3*mul,this.location[i].y+ran4*mul);
	this.p5[i] = createVector(this.location[i].x-ran5*mul,this.location[i].y+ran2*mul);
	this.p6[i] = createVector(this.location[i].x+ran6*mul,this.location[i].y+ran7*mul);
	this.p7[i] = createVector(this.location[i].x-ran3*mul,this.location[i].y+ran8*mul);

	this.c1[i] = color(random(20,40),170,206);
	this.c2[i] = color(random(50,100),190,230);
	this.c3[i] = color(random(100,120),225,240);
	this.c4[i] = color(random(10,25),100,120);
	this.c5[i] = color(random(5,15),70,85);
	this.c6[i] = color(random(0,5),90,100);
	this.c7[i] = color(random(10,20),50,70);
	}
}