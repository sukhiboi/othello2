const renderBoard = (root, { board, player, completed }, onCellClick) => {
  root.innerHTML = ""

  if (completed) {
    const completedEl = document.createElement("div");
    completedEl.className = "completed";
    completedEl.innerText = `${player} wins`
    root.append(completedEl);
    return
  }

  const boardEl = document.createElement("div");
  boardEl.className = "board";

  board.forEach((row, rowIdx) => {
    const rowEl = document.createElement("div");
    rowEl.className = "row"

    row.forEach((cell, cellIdx) => {
      const cellEl = document.createElement("div");
      cellEl.className = "cell";
      rowEl.append(cellEl);
      cellEl.addEventListener("click", () => onCellClick(rowIdx, cellIdx))
    })

    boardEl.append(rowEl)
  })

  const playerEl = document.createElement("div");
  playerEl.innerText = `Current turn: ${player}`;
  playerEl.className = "player"

  root.append(playerEl)
  root.append(boardEl);
}
