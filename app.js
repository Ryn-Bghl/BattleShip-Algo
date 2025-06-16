const root = document.documentElement;
const gridContainer = document.getElementById("grid_container");
const boatContainer = document.getElementById("boat_container");
const generateBoatBtn = document.getElementById("generate_boat_btn");
const generateBoardBtn = document.getElementById("generate_board_btn");

let boats = [
  [[1, 1]],
  [[1, 1]],
  [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  [
    [1, 0],
    [1, 1],
  ],
];

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

/**
 * Displays the grid using a PrettyTable.
 * @param {Array<Array<number|string>>} grid - The grid to be displayed.
 */
function displayGrid(grid) {
  const table = new PrettyTable();

  // Add each row to the table, formatting each cell with padding
  grid.forEach((row) => {
    table.addRow(row.map((cell) => String(cell).padEnd(2)));
  });

  // Display the formatted table
  table.display();
}

/**
 * Generates the HTML for a grid with the given number of rows and columns.
 * @param {number} rows - The number of rows in the grid.
 * @param {number} columns - The number of columns in the grid.
 * @returns {HTMLElement} - The HTML element representing the grid.
 */
function generateGridHTML(rows, columns) {
  const gridHTML = document.createElement("div");
  gridHTML.classList.add("grid");

  // Create the grid structure
  for (let i = 0; i < rows; i++) {
    const rowHTML = document.createElement("div");
    rowHTML.classList.add("grid-row");

    // Create the cells in the row
    for (let j = 0; j < columns; j++) {
      const cellHTML = document.createElement("div");
      cellHTML.classList.add("grid-cell");
      rowHTML.appendChild(cellHTML);
    }

    // Add the row to the grid
    gridHTML.appendChild(rowHTML);
  }

  // Set the CSS variables based on the grid size
  root.style.setProperty("--rows", rows);
  root.style.setProperty("--columns", columns);

  return gridHTML;
}

function generateBoatHTML(rows, columns) {
  const boatHTML = document.createElement("div");
  boatHTML.classList.add("boat");
  for (let i = 0; i < rows; i++) {
    const rowHTML = document.createElement("div");
    rowHTML.classList.add("boat-row");
    for (let j = 0; j < columns; j++) {
      const cellHTML = document.createElement("div");
      cellHTML.classList.add("boat-cell");
      rowHTML.appendChild(cellHTML);
    }
    boatHTML.appendChild(rowHTML);
  }

  // Set the CSS variables based on the boat size
  root.style.setProperty("--boat-rows", rows);
  root.style.setProperty("--boat-columns", columns);

  return boatHTML;
}

/**
 * Gets the grid matrix from the grid HTML.
 * @returns {Array<Array<number|string>>} - The grid matrix.
 */
function getGridMatrix() {
  const gridHTML = document.getElementsByClassName("grid-cell");
  const gridMatrix = [];
  for (
    let i = 0;
    i < gridHTML.length;
    i += parseInt(root.style.getPropertyValue("--columns"), 10)
  ) {
    const row = [];
    for (let j = 0; j < root.style.getPropertyValue("--columns"); j++) {
      // Get the cell element at the current position
      const cell = gridHTML[i + j];

      // If the cell has an "x" in it, represent it as the string "x";
      // otherwise, represent it as 0.
      row.push(cell.innerText === "x" ? "x" : 0);
    }
    // Add the row to the grid matrix
    gridMatrix.push(row);
  }
  return gridMatrix;
}

/**
 * Displays the grid matrix in the grid cells.
 *
 * @param {Array<Array<number|string>>} gridMatrix - The grid matrix.
 * It is a 2D array of numbers and strings. The numbers represent the
 * number of times the cell has been clicked, and the strings represent
 * a cell that has been marked with an "x".
 */
function showGridMatrix(gridMatrix) {
  const max = Math.max(...gridMatrix.flat().map((x) => (x === "x" ? 0 : x)));
  const scale = chroma
    .scale(["white", "orange", "red", "black"])
    .domain([0, max]);
  const gridHTML = document.getElementsByClassName("grid-cell");
  for (let i = 0; i < gridHTML.length; i++) {
    const row = Math.floor(
      i / parseInt(root.style.getPropertyValue("--columns"), 10)
    );
    const column = i % parseInt(root.style.getPropertyValue("--columns"), 10);
    // If the cell in the grid matrix is 0, clear the cell; otherwise,
    // mark the cell with an "x".
    gridHTML[i].innerText =
      typeof gridMatrix[row][column] === "number"
        ? gridMatrix[row][column].toString()
        : "x";
    if (gridMatrix[row][column] === max) {
      gridHTML[i].style.backgroundColor = "green";
    } else if (gridMatrix[row][column] != "x") {
      gridHTML[i].style.backgroundColor = scale(gridMatrix[row][column]).hex();
    }
  }
}

/**
 * Rotates the given boat matrix by 90 degrees clockwise.
 * @param {Array<Array<number>>} boatMatrix - The boat matrix to be rotated.
 * @returns {Array<Array<number>>} - The rotated boat matrix.
 */
function rotateBoat(boatMatrix) {
  const rotatedMatrix = [];
  // Iterate over each column in the boat matrix
  for (let colIndex = 0; colIndex < boatMatrix[0].length; colIndex++) {
    const row = boatMatrix.map((row) => row[colIndex]);
    // Reverse the row and add it to the rotated matrix
    rotatedMatrix.push(row.reverse());
  }

  return rotatedMatrix;
}

function getStats(boats, grid) {
  boats.forEach((boat) => {
    for (let rotations = 0; rotations < 4; rotations++) {
      for (
        let rowIndex = 0;
        rowIndex <= grid.length - boat.length;
        rowIndex++
      ) {
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
              const cell =
                grid[rowIndex + rowOffset][columnIndex + columnOffset];
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
  });
  return grid;
}

generateBoardBtn.addEventListener("click", () => {
  const sizes = document.querySelectorAll(".size");
  const rows = sizes[0].value;
  const columns = sizes[1].value;
  gridContainer.innerHTML = "";
  gridContainer.appendChild(generateGridHTML(rows, columns));
  showGridMatrix(getStats(boats, getGridMatrix()));
});

generateBoatBtn.addEventListener("click", () => {
  const sizes = document.querySelectorAll(".size");
  const rows = sizes[2].value;
  const columns = sizes[3].value;
  boatContainer.innerHTML = "";
  boatContainer.appendChild(generateBoatHTML(rows, columns));
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("grid-cell")) {
    // Add your logic for what should happen when a grid cell is clicked
    // event.target.style.backgroundColor = "red";
    event.target.innerText = "x";
    event.target.style.color = "#262624";
    event.target.style.fontSize = "2rem";
    event.target.style.backgroundColor = "white";
    console.clear();
    displayGrid(getStats(boats, getGridMatrix()));
    showGridMatrix(getStats(boats, getGridMatrix()));
  }
});

document.addEventListener("contextmenu", (event) => {
  if (event.target.classList.contains("grid-cell")) {
    // Add your logic for what should happen when a grid cell is clicked
    event.preventDefault();
    event.target.innerText = "";
    event.target.style.fontSize = "";
    event.target.style.backgroundColor = "";
    event.target.style.color = "";
    console.clear();
    displayGrid(getStats(boats, getGridMatrix()));
    showGridMatrix(getStats(boats, getGridMatrix()));
  }
});
