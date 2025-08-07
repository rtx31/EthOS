const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");
const gameOverText = document.getElementById("gameOver");

let score = 0;
let isGameOver = false;

function movePlayer(direction) {
  const left = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
  if (direction === "left" && left > 0) {
    player.style.left = left - 30 + "px";
  } else if (direction === "right" && left < window.innerWidth - 60) {
    player.style.left = left + 30 + "px";
  }
}

document.getElementById("leftBtn").addEventListener("touchstart", () => movePlayer("left"));
document.getElementById("rightBtn").addEventListener("touchstart", () => movePlayer("right"));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") movePlayer("left");
  else if (e.key === "ArrowRight") movePlayer("right");
});

function createFallingItem() {
  const item = document.createElement("div");
  const isBug = Math.random() < 0.2;
  item.classList.add(isBug ? "bug" : "block");

  item.style.left = Math.floor(Math.random() * (window.innerWidth - 40)) + "px";
  game.appendChild(item);

  let top = 0;
  const fallInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(fallInterval);
      item.remove();
      return;
    }

    top += 4;
    item.style.top = top + "px";

    const playerLeft = parseInt(player.style.left);
    const playerRight = playerLeft + 60;
    const itemLeft = parseInt(item.style.left);
    const itemRight = itemLeft + 40;

    if (top >= window.innerHeight - 100 && itemLeft < playerRight && itemRight > playerLeft) {
      if (isBug) {
        gameOver();
      } else {
        score += 1;
        scoreText.innerText = `Score: ${score}`;
      }
      clearInterval(fallInterval);
      item.remove();
    }

    if (top > window.innerHeight) {
      clearInterval(fallInterval);
      item.remove();
    }
  }, 20);
}

function gameOver() {
  isGameOver = true;
  gameOverText.style.display = "block";
}

function restartGame() {
  score = 0;
  isGameOver = false;
  scoreText.innerText = `Score: ${score}`;
  gameOverText.style.display = "none";
}

setInterval(() => {
  if (!isGameOver) {
    createFallingItem();
  }
}, 800);
