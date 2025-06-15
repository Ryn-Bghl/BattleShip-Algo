class PrettyTable {
  constructor() {
    this._rows = [];
  }

  addRow(rowData) {
    this._rows.push(rowData);
  }

  display() {
    const rowStrings = this._rows.map((row) => row.join(" "));
    console.log(rowStrings.join("\n") + "\n");
  }
}

function displayGrid(grid) {
  const table = new PrettyTable();

  grid.forEach((row) => {
    table.addRow(row.map((cell) => String(cell).padEnd(2)));
  });

  table.display();
}

function rotateBoat(boatMatrix) {
  const rotatedMatrix = [];
  for (let colIndex = 0; colIndex < boatMatrix[0].length; colIndex++) {
    const row = boatMatrix.map((row) => row[colIndex]);
    rotatedMatrix.push(row.reverse());
  }

  return rotatedMatrix;
}

function getStats(boat, grid) {
  for (let rotations = 0; rotations < 4; rotations++) {
    for (let rowIndex = 0; rowIndex <= grid.length - boat.length; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex <= grid[rowIndex].length - boat[0].length;
        columnIndex++
      ) {
        let canPlace = true;
        for (let rowOffset = 0; rowOffset < boat.length; rowOffset++) {
          for (
            let columnOffset = 0;
            columnOffset < boat[rowOffset].length;
            columnOffset++
          ) {
            const cell = grid[rowIndex + rowOffset][columnIndex + columnOffset];
            if (
              typeof cell === "string" &&
              boat[rowOffset][columnOffset] !== 0
            ) {
              canPlace = false;
              break;
            }
          }
          if (!canPlace) {
            break;
          }
        }
        if (canPlace) {
          for (let rowOffset = 0; rowOffset < boat.length; rowOffset++) {
            for (
              let columnOffset = 0;
              columnOffset < boat[rowOffset].length;
              columnOffset++
            ) {
              if (boat[rowOffset][columnOffset] !== 0) {
                grid[rowIndex + rowOffset][columnIndex + columnOffset] +=
                  boat[rowOffset][columnOffset];
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
