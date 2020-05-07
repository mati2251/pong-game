const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Ball {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.drawBall();
	}

	getPosition = () => {
		return {x: this.x, y: this.y}
	}

	setPosition = (x, y) => {
		this.x = x;
		this.y = y;
	}

	startBall = () => {
	}

	drawBall = () => {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI)
		ctx.strokeStyle = "#FFFFFF"
		ctx.lineWidth = 4;
		ctx.stroke();
		ctx.closePath();
	}
}

class Paddle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.drawPaddle();
	}

	setPosition(x) {
		this.x = x;
	}

	cleanPaddle = () => {
		ctx.clearRect(this.x - 4, this.y - 4, 208, 28);
	}

	getPosition = () => {
		return {x: this.x, y: this.y}
	}

	changePaddlePositionWithMouse = (event) => {
		const positionX = event.pageX - 104;
		console.log(positionX);
		console.log(canvas.width);
		this.cleanPaddle();
		this.setPosition(positionX);
		this.drawPaddle();
	}

	drawPaddle = () => {
		ctx.beginPath();
		ctx.strokeStyle = "#FFFFFF"
		ctx.lineWidth = 4;
		ctx.strokeRect(this.x, this.y, 200, 20)
		ctx.closePath();
	}
}

const setCanvasDimension = () => {
	canvas.width = window.innerWidth - 30;
	canvas.height = window.innerHeight - 150;
};

setCanvasDimension()

document.getElementById("start").onclick = (() => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.className = "border"
	const ball = new Ball(canvas.width / 2, 50)
	const paddle = new Paddle(canvas.width / 2 - 100, canvas.height - 50)
	document.onmousemove = (e) => paddle.changePaddlePositionWithMouse(e)
})

window.addEventListener("resize", () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	document.onmousemove = (e) => undefined
	setCanvasDimension()
})

