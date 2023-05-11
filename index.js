const game = {
  points: 0,
  map: { sizex: 10, sizey: 10, point: { px: 2, py: 2 } },
  snake: {
    heading: { hx: 0, hy: -1 },
    parts: [
      { px: 5, py: 5 },
      { px: 4, py: 5 },
      { px: 4, py: 6 },
    ],
  },
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function renderMap() {
  const root = document.getElementById("root");
  root.innerHTML = `<div id="map" style="height:${
    game.map.sizey * 50
  }px; width:${game.map.sizex * 50}px"></div>`;
}

function renderSnake() {
  const map = document.getElementById("map");
  const renderedParts = game.snake.parts.map(
    (part, index) =>
      `<div class="snakePart ${index === 0 ? "snakeHead" : ""}" style="top:${
        part.py * 50
      }px; left:${part.px * 50}px;"></div>`
  );
  map.innerHTML =
    renderedParts.join("") +
    `<div class="point" style="top:${game.map.point.py * 50}px; left:${
      game.map.point.px * 50
    }px;"></div>`;
}Ё

function gameChanges() {
  const head = game.snake.parts[0];
  const isSnakeEatPoint =
    head.px === game.map.point.px && head.py === game.map.point.py;
  game.snake.parts = [
    {
      px: head.px + game.snake.heading.hx,
      py: head.py + game.snake.heading.hy,
    },
    ...game.snake.parts.slice(
      0,
      game.snake.parts.length - (isSnakeEatPoint ? 0 : 1)
    ),
  ];

  if (isSnakeEatPoint) {
    game.map.point = { px: getRandomInt(1, 9), py: getRandomInt(1, 9) };
    game.points += 100;
  }
}

function renderPoints() {
  const pointsNode = document.getElementById("pointCounter");
  pointsNode.innerHTML = `${game.points}`;
}

function gameCycle() {
  renderMap();
  renderSnake();
  renderPoints();
  gameChanges();
}

setInterval(() => {
  gameCycle();
}, 200);

addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      game.snake.heading = { hx: 0, hy: -1 };
      break;
    case "ArrowLeft":
      game.snake.heading = { hx: -1, hy: 0 };
      break;
    case "ArrowRight":
      game.snake.heading = { hx: 1, hy: 0 };
      break;
    case "ArrowDown":
      game.snake.heading = { hx: 0, hy: 1 };
      break;
  }
});
