const root = document.getElementById("root");

const player1 = { name: "Player 1 (Black)", symbol: "b" }
const player2 = { name: "Player 2 (White)", symbol: "w" }

const players = {
  [player1.name]: { ...player1, next: player2 },
  [player2.name]: { ...player2, next: player1 }
}

let state = {
  completed: false,
  board: Othello.createBoard(8, [player1, player2]),
  player: player1,
  winner: undefined
}

const playTurn = (state, coin) => {
  if (Othello.isInvalidTurn(state.board, coin)) return state;

  const board = Othello.placeCoin(state, coin);

  return {
    completed: Othello.areAllPositionsFilled(board),
    board,
    player: players[state.player.name].next,
    winner: Othello.findWinner(board, [player1, player2])
  }
}

const onCellClick = (rowIdx, cellIdx) => {
  state = playTurn(state, [rowIdx, cellIdx]);
  renderBoard(root, state, onCellClick)
};

renderBoard(root, state, onCellClick)
