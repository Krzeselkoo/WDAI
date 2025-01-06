const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const backgroundImg = new Image();
backgroundImg.src = 'images/board-bg.jpg';

const aimImg = new Image();
aimImg.src = 'images/aim.png';

const fullHeartImg = new Image();
fullHeartImg.src = 'images/full_heart.png';

const emptyHeartImg = new Image();
emptyHeartImg.src = 'images/empty_heart.png';

const zombieSprite = new Image();
zombieSprite.src = 'images/walkingdead.png';

const sadMusic = new Audio('images/sad-music.mp3');

const frameCount = 10; 
const frameWidth = 200; 
const frameHeight = 312; 
const animationSpeed = 10; 

let lives = 3;
let score = 0;
let zombies = [];
let isGameOver = false;

const zombieSpeed = [1, 2, 3];
let progressiveDifficulty = 1;
let zombieSpawnInterval = 2000 / progressiveDifficulty; 
let zombieSpawnTimer = 0;

const mouse = {
	x: 0,
	y: 0,
};


canvas.addEventListener('click', shootZombie);
canvas.addEventListener('mousemove', event => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

function spawnZombie() {
	const speed = zombieSpeed[Math.floor(Math.random() * zombieSpeed.length)];
	const scale = 0.5 + Math.random();
	const yPosition = 0.6*canvas.height + Math.random() * (canvas.height - frameHeight * scale - 0.6*canvas.height);
	zombies.push({
		x: canvas.width,
		y: yPosition,
		speed: speed,
		scale: scale,
		frame: 0, 
		animationTimer: 0, 
	});
}

function drawLives() {
	for (let i = 0; i < 3; i++) {
		if (i < lives) {
			ctx.drawImage(fullHeartImg, 10 + i * 80, 10, 70, 70);
		} else {
			ctx.drawImage(emptyHeartImg, 10 + i * 80, 10, 70, 70);
		}
	}
}

function shootZombie(event) {
	if (isGameOver) return;

	let hit = false;
	for (let i = zombies.length - 1; i >= 0 ; i--) {
		const zombie = zombies[i];
		const zombieWidth = frameWidth * zombie.scale;
		const zombieHeight = frameHeight * zombie.scale;

		if (
			event.clientX >= zombie.x &&
			event.clientX <= zombie.x + zombieWidth &&
			event.clientY >= zombie.y &&
			event.clientY <= zombie.y + zombieHeight
		) {
			hit = true;
			score += 20;
			zombies.splice(i, 1);
			break;
		}
	}

	if (!hit) {
		score -= 5;
		if(score < 0){
			endGame()
		}
	}
}


function update(deltaTime) {
	if (isGameOver) return;

	zombieSpawnTimer += deltaTime;
	if (zombieSpawnTimer > zombieSpawnInterval) {
		spawnZombie();
		zombieSpawnTimer = 0;
		// progressiveDifficulty += 0.06
		// zombieSpawnInterval = 2000 / progressiveDifficulty
		console.log(zombieSpawnInterval)
	}

	zombies.forEach(zombie => {
		zombie.x -= zombie.speed;

		zombie.animationTimer += deltaTime;
		if (zombie.animationTimer > 1000 / animationSpeed) {
			zombie.frame = (zombie.frame + 1) % frameCount;
			zombie.animationTimer = 0;
		}

		if (zombie.x < -100) {
			zombies.splice(zombies.indexOf(zombie), 1);
			lives--;
			if (lives <= 0) {
				endGame();
			}
		}
	});
}


function render() {

	if (isGameOver) return;
	
	ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

	zombies.sort((zombieA, zombieB) => {
		if(zombieA.y + frameHeight * zombieA.scale > zombieB.y + frameHeight * zombieB.scale){
			return 1;
		}
		return -1;
	}) 

	zombies.forEach(zombie => {
		const zombieWidth = frameWidth * zombie.scale;
		const zombieHeight = frameHeight * zombie.scale;
		ctx.drawImage(
			zombieSprite,
			zombie.frame * frameWidth,
			0, 
			frameWidth,
			frameHeight, 
			zombie.x,
			zombie.y, 
			zombieWidth,
			zombieHeight 
		);
	});

	ctx.drawImage(aimImg, mouse.x - 25, mouse.y - 25, 50, 50);

	ctx.fillStyle = 'white';
	ctx.font = '48px Arial';
	ctx.fillText('Score: ' + score, canvas.width - 250, 50);

	drawLives();
}

function endGame() {
	isGameOver = true;
	sadMusic.play();
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'white';
	ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 25, 250, 50);
	ctx.font = '48px Arial';
	ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
	ctx.fillStyle = 'black';
	ctx.font = '24px Arial';
	ctx.fillText(
		'Click to Restart',
		canvas.width / 2 - 60,
		canvas.height / 2 + 60
	);

	canvas.addEventListener('click', restartGame);
}

function restartGame() {
	if(
		mouse.x >= canvas.width / 2 - 100 &&
		mouse.x <= canvas.width / 2 + 150 &&
		mouse.y >= canvas.height / 2 + 25 &&
		mouse.y <= canvas.height / 2 + 75 
	){
	isGameOver = false;
	lives = 3;
	score = 0;
	zombies = [];
	sadMusic.pause();
	sadMusic.currentTime = 0;
	canvas.removeEventListener('click', restartGame);
	}
}

let lastTime = 0;
function gameLoop(timestamp) {
	const deltaTime = timestamp - lastTime;
	lastTime = timestamp;

	update(deltaTime);
	render();

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);