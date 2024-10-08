const renderBoard = (root, { board, player, completed, winner }, onCellClick) => {
  root.innerHTML = ""

  if (completed) {
    const completedEl = document.createElement("div");
    completedEl.className = "completed";
    completedEl.innerText = winner.length === 1 ? `${winner[0].name} wins` : "It's a tie",
      root.append(completedEl);
    return
  }

  const boardEl = document.createElement("div");
  boardEl.className = "board";

  board.places.forEach((row, rowIdx) => {
    const rowEl = document.createElement("div");
    rowEl.className = "row"

    row.forEach((cell, cellIdx) => {
      const cellEl = document.createElement("div");
      cellEl.classList.add(...["cell"]);
      rowEl.append(cellEl);
      cellEl.addEventListener("click", () => onCellClick(rowIdx, cellIdx))

      if (cell) {
        const coin = document.createElement("div");
        coin.classList.add(...["coin", `coin-${cell}`])
        cellEl.appendChild(coin)
      }
    })

    boardEl.append(rowEl)
  })

  const playerEl = document.createElement("div");
  playerEl.innerText = `Current turn: ${player.name}`;
  playerEl.className = "player"

  root.append(playerEl)
  root.append(boardEl);
}
