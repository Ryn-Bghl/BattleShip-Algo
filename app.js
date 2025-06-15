class PrettyTable {
  constructor() {
    this.rows = [];
  }

  addRow(row) {
    this.rows.push(row);
  }

  display() {
    console.log(this.rows.map((row) => row.join(" ")).join("\n") + "\n\n");
  }
}

function displayGrid(grid) {
  const table = new PrettyTable();
  grid.forEach((row) => {
    table.addRow(row.map((cell) => String(cell).padEnd(2)));
  });
  table.display();
}

function rotateBoat(boat) {
  return boat[0].map((_, colIndex) =>
    boat.map((row) => row[colIndex]).reverse()
  );
}

function getStats(boat, grid) {
  for (let n = 0; n < 4; n++) {
    for (let i = 0; i <= grid.length - boat.length; i++) {
      for (let j = 0; j <= grid[i].length - boat[0].length; j++) {
        let canPlace = true;
        outer: for (let k = 0; k < boat.length; k++) {
          for (let l = 0; l < boat[k].length; l++) {
            if (typeof grid[i + k][j + l] === "string" && boat[k][l] !== 0) {
              canPlace = false;
              break outer;
            }
          }
        }
        if (canPlace) {
          for (let k = 0; k < boat.length; k++) {
            for (let l = 0; l < boat[k].length; l++) {
              if (boat[k][l] !== 0) {
                grid[i + k][j + l] += boat[k][l];
              }
            }
          }
        }
      }
    }
    boat = rotateBoat(boat);
  }
  return grid;
}

let grid = [
  [0, 0, 0, 0],
  [0, 0, "x", 0],
  [0, 0, 0, 0],
];

let boat = [
  [1, 1],
  [1, 0],
  [1, 1],
];

grid = getStats(boat, grid);
displayGrid(grid);
