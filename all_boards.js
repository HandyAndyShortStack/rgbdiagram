var Board = require('./board.js');
var nextPermutation = require('./next_permutation.js');

module.exports = {
  all: allBoards,
  unique: uniqueBoards,
  getUnique: getUniqueEntry,
  equivalencyHash: equivalencyHash,
  reverseEquivalencyHash: reverseEquivalencyHash,
  uniqueBoardHash: uniqueBoardHash,
  graph: graph
};

var cache = {};

function allBoards() {
  if (cache.allBoards) {
    return cache.allBoards;
  }
  var a = [0, 0, 0, 1, 1, 1, 2, 2, 2];
  var boards = [a];
  var notDone = nextPermutation(a);
  while (notDone) {
    boards.push(a.slice(0));
    notDone = nextPermutation(a);
  }
  boards = boards.map(function(arr) {
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
  cache.allBoards = boards;
  return boards
}

function uniqueBoards() {
  if (cache.uniqueBoards) {
    return cache.uniqueBoards;
  }
  var memo = null;
  var _allBoards = allBoards();
  var boards = [];
  for (var i = 0; i < _allBoards.length; i += 1) {
    var board = _allBoards[i];
    var isEquivalent = boards.reduce(function(accum, current) {
      return accum || board.isEquivalentTo(current);
    }, false);
    if (!isEquivalent) {
      boards.push(board);
    }
  }
  cache.uniqueBoards = boards;
  return boards;
}

function equivalencyHash() {
  if (cache.equivalencyHash) {
    return cache.equivalencyHash;
  }
  var _uniqueBoards = uniqueBoards();
  var hsh = {};
  for (var i = 0; i < _uniqueBoards.length; i += 1) {
    var board = _uniqueBoards[i];
    hsh[board.toString()] = board.allEquivalencies();
  }
  cache.equivalencyHash = hsh;
  return hsh;
}

function reverseEquivalencyHash() {
  if (cache.reverseEquivalencyHash) {
    return cache.reverseEquivalencyHash;
  }
  var _equivalencyHash = equivalencyHash();
  var hsh = {};
  for (var key in _equivalencyHash) {
    var boardlist = _equivalencyHash[key];
    for (var i = 0; i < boardlist.length; i += 1) {
      var board = boardlist[i];
      hsh[board.toString()] = key;
    }
  }
  cache.reverseEquivalencyHash = hsh;
  return hsh;
}

function uniqueBoardHash() {
  if (cache.uniqueBoardHash) {
    return cache.uniqueBoardHash;
  }
  var _uniqueBoards = uniqueBoards();
  var hsh = {}
  for (var i = 0; i < _uniqueBoards.length; i += 1) {
    var board = _uniqueBoards[i];
    hsh[board.toString()] = board;
  }
  cache.uniqueBoardHash = hsh;
  return hsh;
}

function getUniqueEntry(board) {
  return uniqueBoardHash()[reverseEquivalencyHash()[board.toString()]]
}

function graph() {
  var _uniqueBoards = uniqueBoards();
  var hsh = {};
  hsh.nodes = _uniqueBoards.map(function(board) {
    return {
      name: board.toString(),
      squares: board.squares.map(function(square) {
        return getColor(square);
      })
    };
  });
  hsh.links = [];
  var edgeHash = {}
  _uniqueBoards.forEach(function(uniqueBoard) {
    uniqueBoard.allMoves().forEach(function(move) {
      var uniqueTarget = getUniqueEntry(move);
      var edgeHashKey = uniqueBoard.toString() + uniqueTarget.toString();
      if (!edgeHash[edgeHashKey] && uniqueBoard !== uniqueTarget) {
        edgeHash[edgeHashKey] = true;
        hsh.links.push({
          source: _uniqueBoards.indexOf(uniqueBoard),
          target: _uniqueBoards.indexOf(uniqueTarget)
        });
      }
    });
  });
  return hsh;
}

function getColor(abbreviation) {
  if (abbreviation === 'R') {
    return 'red';
  } else if (abbreviation === 'G') {
    return 'green';
  } else if (abbreviation === 'B') {
    return 'blue';
  }
}
