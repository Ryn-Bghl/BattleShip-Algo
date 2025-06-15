const root = document.documentElement;
const gridContainer = document.getElementById("grid_container");
const generateBoardBtn = document.getElementById("generate_board_btn");

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

function generateGridHTML(rows, columns) {
  const gridHTML = document.createElement("div");
  gridHTML.classList.add("grid");

  for (let i = 0; i < rows; i++) {
    const rowHTML = document.createElement("div");
    rowHTML.classList.add("grid-row");

    for (let j = 0; j < columns; j++) {
      const cellHTML = document.createElement("div");
      cellHTML.classList.add("grid-cell");
      rowHTML.appendChild(cellHTML);
    }

    gridHTML.appendChild(rowHTML);
  }

  root.style.setProperty("--rows", rows);
  root.style.setProperty("--columns", columns);

  return gridHTML;
}

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
      const cell = gridHTML[i + j];
      row.push(cell.innerText === "x" ? "x" : 0);
    }
    gridMatrix.push(row);
  }
  return gridMatrix;
}

displayGrid(getGridMatrix());

generateBoardBtn.addEventListener("click", () => {
  const sizes = document.querySelectorAll("#size");
  const rows = sizes[0].value;
  const columns = sizes[1].value;
  gridContainer.innerHTML = "";
  gridContainer.appendChild(generateGridHTML(rows, columns));
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("grid-cell")) {
    // Add your logic for what should happen when a grid cell is clicked
    // event.target.style.backgroundColor = "red";
    event.target.innerText = "x";
    event.target.style.color = "#262624";
    event.target.style.fontSize = "2rem";
    event.target.style.backgroundColor = "#ef4444";
  }
});

document.addEventListener("contextmenu", (event) => {
  if (event.target.classList.contains("grid-cell")) {
    // Add your logic for what should happen when a grid cell is clicked
    event.preventDefault();
    event.target.innerText = "";
    event.target.style.backgroundColor = "";
  }
});
