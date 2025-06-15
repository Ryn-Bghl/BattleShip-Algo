const root = document.documentElement;
const gridContainer = document.getElementById("grid_container");
const generateBoardBtn = document.getElementById("generate_board_btn");

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

generateBoardBtn.addEventListener("click", () => {
  const sizes = document.querySelectorAll("#size");
  const rows = sizes[0].value;
  const columns = sizes[1].value;
  gridContainer.innerHTML = "";
  gridContainer.appendChild(generateGridHTML(rows, columns));
});

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});
