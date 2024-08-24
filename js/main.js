const root = document.getElementById("root");

const player1 = { name: "Player 1 (Black)", symbol: "b" }
const player2 = { name: "Player 2 (White)", symbol: "w" }

const players = {
  [player1.name]: { ...player1, next: player2 },
  [player2.name]: { ...player2, next: player1 }
}

let state = {
  completed: false,
  board: createBoard({ players: { player1, player2 } }),
  player: players[player1.name],
  winner: undefined
}

const playTurn = (state, coin) => {
  if (isInvalidTurn(state, coin)) return state;

  const board = placeCoin(state, coin);

  return {
    completed: areAllCoinsUsed(board),
    board,
    player: players[state.player.name].next,
    winner: findWinner({ state, board }, players)
  }
}

const onCellClick = (rowIdx, cellIdx) => {
  state = playTurn(state, [rowIdx, cellIdx]);
  renderBoard(root, state, onCellClick)
};

renderBoard(root, state, onCellClick)
