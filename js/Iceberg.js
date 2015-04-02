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

	this.c1r = new Array(this.amount);
	this.c2r = new Array(this.amount);
	this.c3r = new Array(this.amount);
	this.c4r = new Array(this.amount);
	this.c5r = new Array(this.amount);
	this.c6r = new Array(this.amount);
	this.c7r = new Array(this.amount);

	this.location = new Array(this.amount);

	this.p1InitY = new Array(this.amount);
	this.isGoingDown = new Array(this.amount);
}

Iceberg.prototype.appear = function(){
	for(i = 0; i < this.amount; i++){
		this.c1[i] = color(this.c1r[i],170,206);
		this.c2[i] = color(this.c2r[i],190,230);
		this.c3[i] = color(this.c3r[i],225,240);
		this.c4[i] = color(this.c4r[i],100,120);
		this.c5[i] = color(this.c5r[i],70,85);
		this.c6[i] = color(this.c6r[i],90,100);
		this.c7[i] = color(this.c7r[i],50,70);

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
		var mul = random(2,3.5);
		var ran1 = random(35,45); // 40
		var ran2 = random(25,35); // 30
		var ran3 = random(20,30); // 25
		var ran4 = random(15,25); // 20
		var ran5 = random(40,50); // 45
		var ran6 = random(10,20); // 15
		var ran7 = random(55,65); // 60
		var ran8 = random(60,70); // 65

		this.location[i] = createVector(random(width+1000)-1000,random(height-dep*2, height-dep));
		if(i>0){
			this.location[i].x = this.location[i-1].x +random(400,600);
		}

		this.p1[i] = createVector(this.location[i].x,this.location[i].y-ran1*mul);
		this.p2[i] = createVector(this.location[i].x,this.location[i].y+ran2*mul);
		this.p3[i] = createVector(this.location[i].x+ran2*mul,this.location[i].y+ran2*mul);
		this.p4[i] = createVector(this.location[i].x-ran3*mul,this.location[i].y+ran4*mul);
		this.p5[i] = createVector(this.location[i].x-ran5*mul,this.location[i].y+ran2*mul);
		this.p6[i] = createVector(this.location[i].x+ran6*mul,this.location[i].y+ran7*mul);
		this.p7[i] = createVector(this.location[i].x-ran3*mul,this.location[i].y+ran8*mul);

		this.p1InitY[i] = this.p1[i].y;

		if(random(2) < 1){
			this.isGoingDown[i] = false;
		}
		else{
			this.isGoingDown[i] = true;
		}
	}
}

Iceberg.prototype.floating = function(){
	var speed = 1
	var fRange = 100;
	for(i = 0; i < this.amount; i++){
		if(this.p1[i].y < this.p1InitY[i] - random(fRange)){
			this.isGoingDown[i] = true;
		}
		else if(this.p1[i].y > this.p1InitY[i] + random(fRange)){
			this.isGoingDown[i] = false;
		}

		if(this.isGoingDown[i]){
			this.p1[i] = createVector(this.p1[i].x,this.p1[i].y+speed);
			this.p2[i] = createVector(this.p2[i].x,this.p2[i].y+speed);
			this.p3[i] = createVector(this.p3[i].x,this.p3[i].y+speed);
			this.p4[i] = createVector(this.p4[i].x,this.p4[i].y+speed);
			this.p5[i] = createVector(this.p5[i].x,this.p5[i].y+speed);
			this.p6[i] = createVector(this.p6[i].x,this.p6[i].y+speed);
			this.p7[i] = createVector(this.p7[i].x,this.p7[i].y+speed);
		}
		else{
			this.p1[i] = createVector(this.p1[i].x,this.p1[i].y-speed);
			this.p2[i] = createVector(this.p2[i].x,this.p2[i].y-speed);
			this.p3[i] = createVector(this.p3[i].x,this.p3[i].y-speed);
			this.p4[i] = createVector(this.p4[i].x,this.p4[i].y-speed);
			this.p5[i] = createVector(this.p5[i].x,this.p5[i].y-speed);
			this.p6[i] = createVector(this.p6[i].x,this.p6[i].y-speed);
			this.p7[i] = createVector(this.p7[i].x,this.p7[i].y-speed);
		}
	}
}

Iceberg.prototype.changeColorByMusic = function(s){
	for(i = 0; i < this.amount; i++){
		this.c1r[i] = s[i*2];
		this.c2r[i] = s[i*2];
		this.c3r[i] = s[i*2];
		this.c4r[i] = s[i*2];
		this.c5r[i] = s[i*2];
		this.c6r[i] = s[i*2];
		this.c7r[i] = s[i*2];
	}
}