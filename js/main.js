const root = document.getElementById("root");

const PLAYER1 = "player1";
const PLYAER2 = "player2";

const players = {
  [PLAYER1]: "Player 1",
  [PLYAER2]: "Player 2"
}

let state = {
  completed: false,
  board: createBoard(),
  player: "player1"
}

const playTurn = (state, coin) => {
  const completed = false;
  const nextPlayer = state.player === PLAYER1 ? PLYAER2 : PLAYER1
  return {
    completed,
    board: state.board,
    player: completed ? state.player : nextPlayer
  }
}

const onCellClick = (rowIdx, cellIdx) => {
  state = playTurn(state, { rowIdx, cellIdx });
  renderBoard(root, { ...state, player: players[state.player] }, onCellClick)
};

renderBoard(root, { ...state, player: players[state.player] }, onCellClick)
