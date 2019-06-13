class Box {
  constructor(row, col, location) {
    this.row = row;
    this.col = col;
    this.controlled = "no";
    this.id = "r" + row + "c" + col;
    this.location = location;
  }

  playerSelected() {
    this.controlled = "player";
    $("." + this.id).text("X");
    $(".r0c0").text("D");
    turnNumber++;
  }

  computerSelected() {
    this.controlled = "computer";
    $("." + this.id).text("O");
    turnNumber++;
  }
}

let grid = [[], [], []];

let turnNumber = 0;

for (let r = 0; r < 3; r++) {
  let rcenter = true;
  if (r !== 1) rcenter = false;
  for (let c = 0; c < 3; c++) {
    let ccenter = true;
    if (c !== 1) ccenter = false;
    if (rcenter && ccenter) grid[r][c] = new Box(r, c, "center");
    else if (!rcenter && !ccenter) grid[r][c] = new Box(r, c, "corner");
    else grid[r][c] = new Box(r, c, "edge");
  }
}

console.log(grid);

$(".box").on("click", function() {
  if (turnNumber % 2 === 0) {
    grid.forEach(row => {
      row.forEach(box => {
        if (box.id === $(this).attr("id")) {
          box.playerSelected();
          computerTurn();
          console.log("IT HAPPENED!!");
        } else console.log($(this).attr("id") + " vs " + box.id);
      });
    });
    console.log("Error: ID of box clicked does not exist");
  } else alert("It is the computer's turn.");
});

function computerTurn() {
  do {
    let r = Math.floor(Math.random() * 3);
    let c = Math.floor(Math.random() * 3);
    if (grid[r][c].controlled === "no") grid[r][c].computerSelected();
  } while (turnNumber % 2 === 1);
}
