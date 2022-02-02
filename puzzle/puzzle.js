// get all tiles
const tiles = document.getElementsByClassName("tile")
// store all positions for tiles
const positions = [1, 2, 3, 4, 5, 6, 7, 8, 0]
const LargeTileWidth = 90;
const smallTileWidth = 50;
const breakpoint = 300;
// ration init based on screen height
let previewRatio = window.innerHeight > breakpoint ? LargeTileWidth / smallTileWidth : smallTileWidth / LargeTileWidth;

// function to init tiles
const renderTiles = function () {
  // loop each tiles
  for (let index = 0; index < tiles.length; index++) {
    const $li = tiles[index];
    const tileWidth = $li.offsetWidth;

    // calc left of tile based on index
    $li.style.left = (index % 3 * tileWidth) + 'px';
    // calc top of tile based on index
    $li.style.top = (parseInt(index / 3) * tileWidth) + 'px';
    // append click function to each tile
    $li.onclick = function(e) {
      moveTile(e, index, tileWidth);
    };
  }
};


// func to move tile
const moveTile = function (event, tileIndex, tileWidth) {
  const $li = tiles[tileIndex];
  let targetIndex = -1;
  // get position index from tile index
  const index = positions.indexOf(tileIndex + 1);

  // check left move
  if (index - 1 >= 0 && positions[index - 1] == 0) {
    targetIndex = index - 1;
    $li.style.left = parseInt($li.style.left) - tileWidth + 'px';
  // check right move
  } else if (index + 1 < positions.length && positions[index + 1] == 0) {
    targetIndex = index + 1;
    $li.style.left = parseInt($li.style.left) + tileWidth + 'px';
  //check up move
  } else if (index - 3 >= 0 && positions[index - 3] == 0) {
    targetIndex = index - 3;
    $li.style.top = parseInt($li.style.top) - tileWidth + 'px';
  // check down move
  } else if (index + 3 < positions.length && positions[index + 3] == 0) {
    targetIndex = index + 3;
    $li.style.top = parseInt($li.style.top) + tileWidth + 'px';
  }

  // swap tile position if available
  if (targetIndex != -1) {
    const temp = positions[targetIndex];
    positions[targetIndex] = positions[index];
    positions[index] = temp;
  }

  event.preventDefault();
};

renderTiles();


// re-calc left/top of all tiles on resize
// to keep styles on zoom in/out
window.addEventListener('resize', function(event) {
  let ratio = LargeTileWidth / smallTileWidth;
  if (window.innerHeight < breakpoint) {
    ratio = smallTileWidth / LargeTileWidth;
  }

  // if not resize tile width
  if (!previewRatio || previewRatio === ratio) return true;
  previewRatio = ratio;

  // re-calc left & top base on ratio
  for (let index = 0; index < tiles.length; index++) {
    const $li = tiles[index];
    const left = $li.offsetLeft;
    const top = $li.offsetTop;

    // calc left of tile based on ratio
    $li.style.left = parseInt(left  * ratio / 10) * 10 + 'px';
    // calc top of tile based on ratio
    $li.style.top = parseInt(top  * ratio / 10) * 10 + 'px';
    // append click function to each tile
    $li.onclick = function(e) {
      moveTile(e, index, ratio < 1 ? smallTileWidth : LargeTileWidth);
    };
  }
}, true);

