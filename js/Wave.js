// ********** Wave class **********

function Wave(){
	this.amount = 3;
	this.startPoint = 0-200;
}

Wave.prototype.appear = function(s){
	stroke(50,190,230,255);
	strokeWeight(100);
	this.startPoint += 1+(s[5]/10);
	if(this.startPoint > width + 200){this.startPoint = 0-200}
	for(var i=0;i<this.amount;i++){
		var j = this.amount - i;
		line((i*90)+this.startPoint,height/2,(i*90)+this.startPoint,(height/2)-(1+(s[j+2]/4)));
	}	
}