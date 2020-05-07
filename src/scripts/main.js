const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Ball {
	constructor(x,y) {
		this.x=x;
		this.y=y;
		this.drawBall();
	}

	setPosition(x,y){
		this.x=x;
		this.y=y;
	}

	drawBall(){
		ctx.closePath();
		ctx.beginPath();
		ctx.arc(this.x, this.y, 20, 0, 2*Math.PI)
		ctx.strokeStyle = "#FFFFFF"
		ctx.lineWidth = 4;
		ctx.stroke()
	}

}

const setCanvasDimension = () => {
	canvas.width = window.innerWidth-30;
	canvas.height = window.innerHeight-150;
};

setCanvasDimension()

document.getElementById("start").onclick = (() => {
	const ball = new Ball(canvas.width/2, 50)
})

window.addEventListener("resize", () => {
	setCanvasDimension()
})

