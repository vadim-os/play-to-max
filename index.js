const rows = 8;
const cols = 7;
const symbols = ["♠", "♣", "♡", "♢"];
const fieldSize = rows * cols;

// helper functions for getting and setting

const getValue = index => {
  return document.getElementById(index).innerHTML;
};

const setValue = (index, value) => {
  return (document.getElementById(index).innerHTML = value);
};

// function for deleting groups of similar symbols

const deleteGroup = (index, item) => {
  if (!item) {
    return;
  }

  setValue(index, ""); // deleting symbol from cell

  // checking neigbour cells (left, rigth, top, bottom)

  if (
    index - 1 >= 0 && // checking if left cell is in range of field
    Math.floor(index / cols) === Math.floor((index - 1) / cols) && // if in the same row
    getValue(index - 1) === item // if it's value === symbol
  ) {
    deleteGroup(index - 1, item); // if all true - deleting symbols and check it's neigbours
  }
  if (
    index + 1 < fieldSize &&
    Math.floor(index / cols) === Math.floor((index + 1) / cols) &&
    getValue(index + 1) === item
  ) {
    deleteGroup(index + 1, item);
  }
  if (index - cols >= 0 && getValue(index - cols) === item) {
    deleteGroup(index - cols, item);
  }
  if (index + cols < fieldSize && getValue(index + cols) === item) {
    deleteGroup(index + cols, item);
  }
};

// creating container (filed )computed by number of cell&rows

const container = document.querySelector(".container");
container.style.width = `${cols * 50 + 2}px`;
container.style.heigth = `${rows * 50 + 2}px`;
container.addEventListener("click", event =>
  deleteGroup(+event.target.id, event.target.innerHTML)
);

// fill container with cell with symbols

for (i = 0; i < rows * cols; i++) {
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const cell = document.createElement("div");
  cell.innerHTML = symbol;
  cell.className = "cell";
  cell.id = i;
  container.insertAdjacentElement("beforeend", cell);
}
