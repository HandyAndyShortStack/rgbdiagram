var nextPermutation = require('./next_permutation.js');

module.exports = Board;

function Board(squares) {
  this.squares = squares;
}
Board.prototype.cw = function() {
  var self = this;
  return new Board([3, 0, 1, 6, 4, 2, 7, 8, 5].map(function(index) {
    return self.squares[index];
  }));
}
Board.prototype.ccw = function() {
  var self = this;
  return new Board([1, 2, 5, 0, 4, 8, 3, 6, 7].map(function(index) {
    return self.squares[index];
  }));
}
Board.prototype.right = function() {
  var self = this;
  return new Board([2, 0, 1, 5, 3, 4, 8, 6, 7].map(function(index) {
    return self.squares[index];
  }));
}
Board.prototype.down = function() {
  var self = this;
  return new Board([6, 7, 8, 0, 1, 2, 3, 4, 5].map(function(index) {
    return self.squares[index];
  }));
}
Board.prototype.left = function() {
  var self = this;
  return new Board([1, 2, 0, 4, 5, 3, 7, 8, 6].map(function(index) {
    return self.squares[index];
  }));
}
Board.prototype.up = function() {
  var self = this;
  return new Board([3, 4, 5, 6, 7, 8, 0, 1, 2].map(function(index) {
    return self.squares[index];
  }));
}
Board.prototype.allMoves = function() {
  var self = this;
  return ['cw', 'ccw', 'right', 'down', 'left', 'up'].map(function(key) {
    return self[key]();
  });
}
Board.prototype.rotate = function() {
  var self = this;
  return new Board([6, 3, 0, 7, 4, 1, 8, 5, 2].map(function(index) {
    return self.squares[index];
  }));
};
Board.prototype.rotations = function() {
  return [
    this,
    this.rotate(),
    this.rotate().rotate(),
    this.rotate().rotate().rotate()
  ];
};
Board.prototype.reflections = function() {
  var self = this;
  var arr = [];
  var indexArrays = [
    [6, 7, 8, 3, 4, 5, 0, 1, 2],
    [2, 1, 0, 5, 4, 3, 8, 7, 6],
    [8, 5, 2, 7, 4, 1, 6, 3, 0],
    [0, 3, 6, 1, 4, 7, 2, 5, 8]
  ]
  for (var i = 0; i < indexArrays.length; i += 1) {
    var indicies = indexArrays[i];
    arr.push(new Board(indicies.map(function(index) {
      return self.squares[index];
    })));
  }
  return arr;
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
  return Array.prototype.concat.apply([], this.rotations().concat(this.reflections()).map(function(board) {
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
Board.prototype.isSolved = function() {
  var self = this;
  var rowsSolved = true;
  var columnsSolved = true;
  for (var i = 0; i < rows.length && rowsSolved; i += 1) {
    rowsSolved = !!rows[i].reduce(function(accum, current) {
      return self.squares[accum] === self.squares[current] && current;
    });
  }
  for (var i = 0; i < columns.length && columnsSolved; i += 1) {
    columnsSolved = !!columns[i].reduce(function(accum, current) {
      return self.squares[accum] === self.squares[current] && current;
    });
  }
  return rowsSolved || columnsSolved;
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

var rows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
];
var columns = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];
