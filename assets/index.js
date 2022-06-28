var diffEls = document.querySelectorAll(".diff__btn");
var diffEl = document.querySelector(".diff__btn.active").innerHTML;
var n = diffEl;
var colorsEl = document.querySelector(".colors");
var colorsBlocks;
var rgbEl = document.querySelector(".rgb");
var statusEl = document.querySelector(".status");
var colors = [];
createBlocks(n);
resetGame();

//checked if color of clicked tile is same as target color 
function checkColors(e) {
  if (colors[pickedColor] === e.target.style.backgroundColor) 
  {
    statusEl.innerHTML = "Good job!<br>A new game will start right now.";
    document.body.style.color = colors[pickedColor];
    // all tile colors change to picked color if successful
    for (var i=0; i<colorsBlocks.length; i++) {
      colorsBlocks[i].style.backgroundColor = colors[pickedColor];
    }
    resetGame();
  }

  // if not successfull picked tile dissapears(becomes transparent)
  else {
    e.target.style.backgroundColor = "transparent";
    statusEl.innerHTML = "Try again!";
  }
}

// reset game function clears colors and sets new colors after 1000 miliseconds
function resetGame() {
  setTimeout(function() {
  createBlocks(n);
  document.body.style.color = "black";
  colors = [];
  pickColors();
  pickedColor = random(n);
  rgbEl.innerHTML = colors[pickedColor];
  setColors();
  statusEl.innerHTML =
    "Try to guess the right color based on the RGB value by clicking on the blocks.";
},1000);
}


//set color on each tile
function setColors() {
  for (var i = 0; i < colorsBlocks.length; i++) {
    // loop through created divs and set the background color from colors array

    colorsBlocks[i].style.backgroundColor = colors[i];
  }
}

// push three rgb values into colors array n number of times 
// n is number of tiles 6 or 9
function pickColors() {
  for (var i = 0; i < n; i++) {
    colors.push(randomColor());
  }
}

//return three RGB values
function randomColor() {
  return "rgb(" + random(255) + ", " + random(255) + ", " + random(255) + ")";
}

//generate random multiplied by r
function random(r) {
  return Math.floor(Math.random() * r);
}

// set click event listener for the buttons for 6 and 9 setting off setNumberOfTiles function
for (var i=0; i<diffEls.length; i++) {
  diffEls[i].addEventListener("click", setNumberOfTiles);
}


function setNumberOfTiles(e) {
  for (var i=0; i<diffEls.length; i++) {
    // deactivate both buttons
    diffEls[i].classList.remove("active");
  }
  // and set the clicked button to active
  e.target.classList.add("active");

  // this gets the number on the clicked button set the tile number
  diffEl = document.querySelector(".diff__btn.active").innerHTML;
  n = diffEl;
  resetGame();
 
}

// createBlocks function to create the tiles depending on the number chosen
function createBlocks(num) {
  colorsEl.innerHTML = "";

  // here is an example of a loop that is used to create the blocks of color depending on you choice ie 6 or 9, however you need to add event listeners
  for (var i = 0; i < num; i++) {
    var block = document.createElement("div");
    block.classList.add("colors__block");
    // creates n number of divs with classname "colors__block" 
    colorsEl.appendChild(block);
    //append
  }
  colorsBlocks = document.querySelectorAll(".colors__block");
  for (var i = 0; i < colorsBlocks.length; i++) {
    colorsBlocks[i].addEventListener("click", checkColors);
        //loop all created tiles adding eventlisteners for click
  }
}
