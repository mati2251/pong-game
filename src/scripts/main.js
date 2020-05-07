const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Ball {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.score = document.getElementById("score")
		this.lost = document.getElementById("lost");
		this.howManyStepX = Math.floor(Math.random() * (2));
		if (this.howManyStepX === 0) {
			this.howManyStepX = -1.0;
		}
		this.howManyStepY = 1.0;
		this.drawBall();
		this.score.innerHTML = "0"
		this.displayScore();
		this.time = 5;
		this.interval = setInterval(() => this.startBall(), this.time);
	}

	getPosition = () => {
		return {x: this.x, y: this.y}
	}

	setPosition = (x, y) => {
		this.x = x;
		this.y = y;
	}

	stopInterval = () => {
		window.clearInterval(this.interval);
	}

	startBall = () => {
		ctx.clearRect(this.x - 24, this.y - 24, 48, 48)
		this.x += this.howManyStepX;
		this.y += this.howManyStepY;
		this.checkPosition()
		this.time -= 0.0001;
		this.drawBall()
	}

	displayLost = () => {
		this.lost.className = 'lostDisplay';
	}

	hiddenLost = () => {
		this.lost.className = 'lost';
	}

	displayScore = () => {
		this.score.className = 'scoreDisplay';
	}

	hiddenScore = () => {
		this.score.className = 'score';
	}

	checkPosition = () => {
		if (this.y < 20) {
			this.howManyStepY = -this.howManyStepY
			this.howManyStepX *= 1.1
		}
		if (this.x < 20 || this.x > canvas.width - 20) {
			this.howManyStepX = -this.howManyStepX
			this.howManyStepY *= 1.1
		}
		if (this.y >= canvas.height - 76 && this.x > paddle.getPosition().x && this.x < paddle.getPosition().x + 208) {
			this.howManyStepY = -this.howManyStepY
			this.howManyStepX *= 1.1
			this.score.innerText = (parseInt(this.score.innerText)+1).toString()
		}
		if (this.y > canvas.height) {
			this.displayLost();
			this.score.innerText = `Your score ${this.score.innerText}`
			document.onmousemove = (e) => undefined
			this.stopInterval();
		}
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

let ball;
let paddle;

document.getElementById("start").onclick = (() => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.className = "border"
	if (ball !== undefined) {
		ball.hiddenLost();
		ball.stopInterval();
	}
	ball = new Ball(canvas.width / 2, 50)
	paddle = new Paddle(canvas.width / 2 - 100, canvas.height - 50)
	document.onmousemove = (e) => paddle.changePaddlePositionWithMouse(e)
})

window.addEventListener("resize", () => {
	ball.hiddenLost()
	ball.hiddenScore()
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	document.onmousemove = (e) => undefined
	ball.stopInterval();
	setCanvasDimension()
})

