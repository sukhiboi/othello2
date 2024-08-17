const BOARD_SIZE = 8;

const createBoard = () => {
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

const isInvalidTurn = ({ board }, { rowIdx, cellIdx }) => {
  const invalidConditions = [
    board[rowIdx][cellIdx]
  ];

  return invalidConditions.some(cond => cond)
}

const areAllCoinsUsed = (board) => {
  for (rowIdx = 0; rowIdx < BOARD_SIZE; rowIdx++) {
    for (cellIdx = 0; cellIdx < BOARD_SIZE; cellIdx++) {
      if (board[rowIdx][cellIdx] === undefined) return false
    }
  }

  return true
}

const placeCoin = ({ board, player: { symbol } }, { rowIdx, cellIdx }) => {
  board[rowIdx][cellIdx] = symbol;
  return board;
}

const findWinner = ({ board }, players) => {
  if (!areAllCoinsUsed(board)) return undefined;

  const initialTotal = Object.fromEntries(
    Object.values(players)
      .map(player => player.symbol)
      .map(symbol => ([symbol, 0]))
  )

  const coinCount = board.reduce((total, row) => {
    const rowReduce = row.reduce((rowTotal, cell) => ({
      ...rowTotal,
      [cell]: rowTotal[cell] + 1
    }), initialTotal);

    return Object.fromEntries(
      Object.keys(total)
        .map(symbol => ([
          symbol,
          total[symbol] + rowReduce[symbol]
        ]))
    )
  }, initialTotal)

  const [player1, player2] = Object.values(players);

  const player1CoinCount = coinCount[player1.symbol]
  const player2CoinCount = coinCount[player2.symbol]

  if (player1CoinCount === player2CoinCount) return [player1, player2];
  return player1CoinCount > player2CoinCount ? [player1] : [player2];
}
