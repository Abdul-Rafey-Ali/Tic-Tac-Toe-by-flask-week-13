let currentPlayer = "X";
let gameActive = true;
let board = new Array(9).fill("");
let movesCount = 0;

const statusEl = document.getElementById("status");
const cells = Array.from(document.querySelectorAll(".cell"));

const IMAGES = {
  X: "/static/images/x.jpg",
  O: "/static/images/o.jpg",
  // If you replace these JPGs with real images, the UI will render them automatically.
};

function setStatus(text) {
  if (statusEl) statusEl.textContent = text;
}

function setCellMark(cell, player) {
  cell.classList.remove("is-x", "is-o");
  cell.classList.add(player === "X" ? "is-x" : "is-o");

  // Professional look: keep text + show image badge if available.
  cell.innerHTML = "";

  const text = document.createElement("div");
  text.className = "mark-text";
  text.textContent = player;

  const img = document.createElement("img");
  img.className = "mark-img";
  img.alt = player;
  img.loading = "lazy";
  img.src = IMAGES[player];

  // If the image 404s, the text still remains.
  img.onerror = () => {
    img.remove();
  };

  cell.appendChild(img);
  cell.appendChild(text);
}

function makeMove(cell) {
  const index = Array.from(cell.parentNode.children).indexOf(cell);
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  movesCount += 1;
  setCellMark(cell, currentPlayer);

  if (checkWinner()) {
    setStatus(`${currentPlayer} Wins!`);
    gameActive = false;
  } else if (!board.includes("")) {
    setStatus("It's a Draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    setStatus(`Turn: ${currentPlayer}`);
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

function resetGame() {
  board = new Array(9).fill("");
  movesCount = 0;
  currentPlayer = "X";
  gameActive = true;

  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove("is-x", "is-o");
  });

  setStatus(`Turn: ${currentPlayer}`);
}

function handleKey(event, cell) {
  // Allow keyboard play with Enter/Space
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    makeMove(cell);
  }
}

// Initialize UI state
setStatus(`Turn: ${currentPlayer}`);

