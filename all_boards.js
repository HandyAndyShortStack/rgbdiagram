var Board = require('./board.js');
var nextPermutation = require('./next_permutation.js');

module.exports = allBoards

function allBoards() {
  var a = [0, 0, 0, 1, 1, 1, 2, 2, 2];
  var allBoards = [a];
  var notDone = nextPermutation(a);
  while (notDone) {
    allBoards.push(a.slice(0));
    notDone = nextPermutation(a);
  }
  allBoards = allBoards.map(function(arr) {
    return new Board(arr.map(function(num) {
      if (num === 0) {
        return 'R';
      } else if (num === 1) {
        return 'G';
      } else if (num === 2) {
        return 'B';
      }
    }));
  });
  var boards = [];
  for (var i = 0; i < allBoards.length; i += 1) {
    var board = allBoards[i];
    var isEquivalent = boards.reduce(function(accum, current) {
      return accum || board.isEquivalentTo(current);
    }, false);
    if (!isEquivalent) {
      boards.push(board);
    }
  }
  return boards;
}
