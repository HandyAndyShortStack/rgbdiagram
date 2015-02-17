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
  return [this, this.rotate(), this.rotate().rotate(), this.rotate().rotate().rotate()];
};
Board.prototype.colorway = function() {
  var squares = this.squares.map(function(square) {
    if (square === 'R') {
      return 'G';
    } else if (square === 'G') {
      return 'B';
    } else if (square === 'B') {
      return 'R';
    }
  });
  return new Board(squares);
};
Board.prototype.colorways = function() {
  return [this, this.colorway(), this.colorway().colorway()];
};
Board.prototype.toString = function() {
  return this.squares.slice(0, 3).toString().replace(/,/g, ' ') + '\n' +
      this.squares.slice(3, 6).toString().replace(/,/g, ' ') + '\n' +
      this.squares.slice(6, 9).toString().replace(/,/g, ' ');
}
