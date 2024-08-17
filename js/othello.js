const createBoard = () => {
  const BOARD_SIZE = 8;

  const board = [];

  for (let rowIdx = 0; rowIdx < BOARD_SIZE; rowIdx++) {
    const row = [];
    for (let cellIdx = 0; cellIdx < BOARD_SIZE; cellIdx++) {
      row[cellIdx] = undefined;
    }
    board[rowIdx] = row;
  }

  return board;
}

