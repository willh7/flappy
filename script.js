var birdY;
var birdX;
var birdR;
var gravity;
var acc;
var vel;
var tubes;
var score;
var count;
var highScore;
var img;
var clr;
var s;
var i;
var j;


function setup() {
	var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
	birdX = width/4;
	birdY = height/2;
	birdR = 20;
	gravity = .5;
	acc = 0;
	vel = 0;
	tubes = [];
	score = 0;
	count = 0;
	document.cookie = "highScore=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	highScore = 0;
	highScore = document.cookie.substring(10);
	imageMode(CENTER);
	img.loadPixels();
	s = sqrt(img.pixels.length)/2;
	for(i = 0; i < s; i++) {
		for(j = 0; j < s; j++) {
			if(sqrt(sq(s/2 - i) + sq(s/2 - j)) > s/2) {
				writeColor(i,j);
			}
		}
	}
	img.updatePixels();
}

function preload() {
	img = loadImage("bird.png");
}

function draw() {
	background(0,0,255);
	acc += gravity;
	vel += acc;
	birdY += vel;
	acc = 0;
	for(var i = 0; i < tubes.length; i++) {		
		tubes[i].show();		
		tubes[i].update();
		if(tubes[i] && tubes[i].x < -1*tubes[i].width) {
			tubes.splice(i,1);
			i = i-1;
		}
	}
	if(count % 180 === 0) {
		tubes.push(new tube());
	}
	fill(255,0,0);
	textSize(48);
	strokeWeight(5);
	text(score, 2, 36);
	textSize(32);
	text("Highscore: " + highScore, 2, height - 5);
	noStroke();
	push()
	translate(birdX, birdY);
	rotate(vel/10);
	//circle(0,0,birdR*2);
	image(img, 0, 0, birdR*2, birdR*2);
	pop();
	count++;
	if(birdY > height - birdR) {
		restart();
	}

}

function keyPressed() {
	if(key = ' ') {
		jump();
	}
}
function touchStarted() {
	jump();
}
function mousePressed() {
	jump();
}

function tube() {
	this.x = width;
	this.openSize = 160;
	this.y = random(height - this.openSize);
	this.width = 50;
	this.scored = false;

	this.show = function() {
		fill(255);
		rect(this.x, 0, this.width, this.y);
		rect(this.x, this.y + this.openSize, this.width, height - this.y - this.openSize);
	}

	this.update = function() {
		this.x += -1;
		if(this.x + this.width <= birdX - birdR && !this.scored) {
			score++;
			this.scored = true;
		}
		if(this.x-birdR < birdX && this.x + this.width + birdR > birdX && (this.y > birdY || this.y + this.openSize < birdY)) {
			restart();
		}
		if(this.x < birdX && this.x + this.width > birdX && (this.y + birdR > birdY || this.y + this.openSize - birdR < birdY)) {
			restart();
		}
		if(sqrt(sq(this.x - birdX) + sq(this.y - birdY)) < birdR) {
			restart();
		}
		if(sqrt(sq(this.x + this.width - birdX) + sq(this.y - birdY)) < birdR) {
			restart();
		}
		if(sqrt(sq(this.x - birdX) + sq(this.y + this.openSize - birdY)) < birdR) {
			restart();
		}
		if(sqrt(sq(this.x + this.width - birdX) + sq(this.y + this.openSize - birdY)) < birdR) {
			restart();
		}
	}
}

function restart() {
	birdX = width/4;
	birdY = height/2;
	acc = 0;
	vel = 0;
	tubes = [];
	if(score > highScore) {
		highScore = score;
		document.cookie = "highscore=" + score;
	}
	score = 0;
	count = 0;
}

function jump() {
	acc = -9;
	vel = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function writeColor(x, y) {
    let index = (x + y * s) * 4;
    img.pixels[index] = 0;
    img.pixels[index + 1] = 0;
    img.pixels[index + 2] = 0;
    img.pixels[index + 3] = 0;
  }

