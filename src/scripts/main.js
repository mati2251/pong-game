const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

console.log(canvas)
const setCanvasDimension = () => {
	canvas.width = window.innerWidth-30;
	canvas.height = window.innerHeight-60;
};

setCanvasDimension()
