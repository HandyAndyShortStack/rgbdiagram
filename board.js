var nextPermutation = require('./next_permutation.js');

module.exports = Board;

function Board(squares) {
  this.squares = squares;
}
Board.prototype.rotate = function() {
  var self = this;
  var squares = [6, 3, 0, 7, 4, 1, 8, 5, 2].map(function(index) {
    return self.squares[index];
  });
  return new Board(squares);
};
Board.prototype.rotations = function() {
  return [this, this.rotate(), this.rotate().rotate(), this.rotate().rotate()];
};
Board.prototype.colorway = function(colors) {
  var squares = this.squares.map(function(square) {
    if (square === 'R') {
      return colors[0];
    } else if (square === 'G') {
      return colors[1];
    } else if (square === 'B') {
      return colors[2];
    }
  });
  return new Board(squares);
};
Board.prototype.colorways = function() {
  var self = this;
  return colorIndexPermutations.map(function(colors) {
    return self.colorway(colors);
  });
};
Board.prototype.allEquivalencies = function() {
  return Array.prototype.concat.apply([], this.rotations().map(function(board) {
    return board.colorways();
  }));
};
Board.prototype.toString = function() {
  return this.squares.slice(0, 3).toString().replace(/,/g, ' ') + '\n' +
      this.squares.slice(3, 6).toString().replace(/,/g, ' ') + '\n' +
      this.squares.slice(6, 9).toString().replace(/,/g, ' ');
};
Board.prototype.isEqualTo = function(board) {
  for (var i = 0; i < this.squares.length; i += 1) {
    if (this.squares[i] !== board.squares[i]) {
      return false;
    }
  }
  return true;
};
Board.prototype.isEquivalentTo = function(board) {
  var equivalencies = board.allEquivalencies();
  for(var i = 0; i < equivalencies.length; i += 1) {
    var equivalency = equivalencies[i];
    if (this.isEqualTo(equivalency)) {
      return true;
    }
  }
  return false;
};

var colorIndexPermutations = [];
(function() {
  var a = ['B', 'G', 'R'];
  var notDone = true;
  while (notDone) {
    colorIndexPermutations.push(a.slice(0));
    notDone = nextPermutation(a);
  }
})();
