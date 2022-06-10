import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

function Circle(props) {
  //console.log(props.player);
  var color = "white";
  var cells = props.cells;
  if (cells[props.row][props.col] === 2) {
    color = "red";
  } else
  if (cells[props.row][props.col] === 1) {
    color = "black";
  }
  var style = {
    backgroundColor: color,
    border: "1px solid black",
    paddingTop: "98%",
    borderRadius: "100%" };

  return /*#__PURE__*/(
    React.createElement("div", { style: style }));

}

function Cell(props) {
  var style = {
    backgroundColor: "yellow",
    height: "50px",
    width: "50px",
    border: "1px solid black" };

  return /*#__PURE__*/(
    React.createElement("div", { style: style, onClick: () => props.clickHandler(props.row, props.col) }, /*#__PURE__*/
    React.createElement(Circle, { player: props.player, row: props.row, col: props.col, cells: props.cells })));


}

function Row(props) {
  var style = {
    display: "flex" };

  var cells = [];
  for (let i = 0; i < props.numberCol; i++) {
    cells.push( /*#__PURE__*/React.createElement(Cell, { clickHandler: props.clickHandler, row: props.row, col: i, player: props.player, cells: props.cells }));
  }
  return /*#__PURE__*/(
    React.createElement("div", { style: style },
    cells));


}

function Board(props) {
  var rows = [];
  for (let i = 0; i < props.numberRow; i++) {
    rows.push( /*#__PURE__*/React.createElement(Row, { numberCol: props.numberCol, clickHandler: props.clickHandler, row: i, player: props.player, cells: props.cells }));
  }
  return /*#__PURE__*/(
    React.createElement("div", null,
    rows));


}
class Game extends React.Component {
  constructor(props) {
    super(props);
    var numberCol = 9;
    var numberRow = 8;
    var cells = [];
    for (let i = 0; i < numberRow; i++) {
      cells.push(new Array(numberCol).fill(0));
    }

    this.state = {
      numberCol: numberCol,
      numberRow: numberRow,
      cells: cells,
      player: false,
      winner: 0 };

    this.clickHandler = this.clickHandler.bind(this);
    this.restart = this.restart.bind(this);
  }
  clickHandler(row, col) {
    if (this.state.winner || this.findAvailablePlace(row, col) === 0) {
      return 0;
    }
    console.log(row + " " + col);
    var temp = this.state.cells;
    temp[row][col] = this.state.player ? 1 : 2;
    this.setState({ cells: temp, player: !this.state.player }, function () {
      if (this.checkVictory(row, col) === 1) {
        if (this.state.player) {
          console.log("Red Win");
        } else
        if (!this.state.player) {
          console.log("Black Win");
        }
        this.setState({ winner: this.state.player ? 2 : 1 });
      }
    });
  }
  findAvailablePlace(row, col) {
    var c = this.state.cells;
    if (c[row][col] === 0) {
      return 1;
    }
    return 0;
  }
  findAvailableCell(row, col) {
    if (row < this.state.numberRow && col < this.state.numberCol && row >= 0 && col >= 0) {
      return 1;
    }
    return 0;
  }
  checkDiagonal(row, col) {
    var c = this.state.cells;
    var rR = row;
    var cR = col;
    var checkFlag = false;
    var val = this.state.player ? 2 : 1;
    while (rR > 0 && cR < this.state.numberCol - 1) {
      rR--;
      cR++;
    }
    while (rR <= this.state.numberRow - 4 && cR >= 3) {
      if (c[rR][cR] === val && c[rR + 1][cR - 1] === val && c[rR + 2][cR - 2] === val && c[rR + 3][cR - 3] === val) {
        checkFlag = true;
        break;
      }
      rR++;
      cR--;
    }

    /*if (checkFlag === true) {
      if (this.findAvailableCell(rR - 1, cR + 1) === 0) {
        if (this.findAvailableCell(rR + 4, cR - 4) === 0) {
          return 1;
        }
        if (this.findAvailableCell(rR + 4, cR - 4) === 1) {
          if (c[rR + 4][cR - 4] === 0 || c[rR + 4][cR - 4] === val) {
            return 1;
          }
         if (this.findAvailableCell(rR + 5, cR - 5) === 0) {
           if (c[rR + 4][cR - 4] === 0 || c[rR + 4][cR - 4] === val) {
             return 1;
           }
         }
         if (this.findAvailableCell(rR + 5, cR - 5) === 1) {
           if (c[rR + 5][cR - 5] !== 0 && c[rR + 5][cR - 5] !== val) {
             if (c[rR + 4][cR - 4] === val) {
               return 1;
             }
           }
         }
        }
      }
      else if (this.findAvailableCell(rR - 1, cR + 1) === 1) {
        if (c[rR - 1][cR + 1] === 0) {
          if (this.findAvailableCell(rR + 4, cR - 4) === 0) {
            return 1;
          }
          if (this.findAvailableCell(rR + 4, cR - 4) === 1) {
            if (c[rR + 4][cR - 4] === 0 || c[rR + 4][cR - 4] === val) {
              return 1;
            }
          }
          if (this.findAvailableCell(rR + 5, cR - 5) === 1) {
            if (c[rR + 5][cR - 5] !== 0 && c[rR + 5][cR - 5] !== val) {
              if (c[rR + 4][cR - 4] === val) {
                return 1;
              }
            }
          }
        }
        else if (c[rR - 1][cR + 1] !== 0 && c[rR - 1][cR + 1] !== val) {
          if (this.findAvailableCell(rR + 4, cR - 4) === 1 && c[rR + 4][cR - 4] === val) {
            return 1;
          }
        }
      }
    }*/
    if (checkFlag === true) {
      if (this.findAvailableCell(rR - 1, cR + 1) === 0) {
        if (this.findAvailableCell(rR + 4, cR - 4) === 0 || c[rR + 4][cR - 4] === 0 || c[rR + 4][cR - 4] === val) {
          return 1;
        }
        if (this.findAvailableCell(rR + 5, cR - 5) === 1) {
          if (c[rR + 5][cR - 5] !== 0 && c[rR + 5][cR - 5] !== val && c[rR + 4][cR - 4] === val) {
            return 1;
          }
        }
      } else
      if (this.findAvailableCell(rR - 1, cR + 1) === 1) {
        if (c[rR - 1][cR + 1] === 0) {
          if (this.findAvailableCell(rR + 4, cR - 4) === 0 || c[rR + 4][cR - 4] === 0 || c[rR + 4][cR - 4] === val) {
            return 1;
          } else
          if (this.findAvailableCell(rR + 5, cR - 5) === 1) {
            if (c[rR + 5][cR - 5] !== 0 && c[rR + 5][cR - 5] !== val && c[rR + 4][cR - 4] === val) {
              return 1;
            }
          }
        } else
        if (c[rR - 1][cR + 1] !== 0 && c[rR - 1][cR + 1] !== val) {
          if (this.findAvailableCell(rR + 4, cR - 4) === 1 && c[rR + 4][cR - 4] === val) {
            return 1;
          }
        }
      }
    }
    checkFlag = false;

    var rL = row;
    var cL = col;
    while (rL > 0 && cL > 0) {
      rL--;
      cL--;
    }
    while (rL <= this.state.numberRow - 4 && cL <= this.state.numberCol - 4) {
      if (c[rL][cL] === val && c[rL + 1][cL + 1] === val && c[rL + 2][cL + 2] === val && c[rL + 3][cL + 3] === val) {
        checkFlag = true;
        break;
      }
      rL++;
      cL++;
    }
    if (checkFlag === true) {
      if (this.findAvailableCell(rL - 1, cL - 1) === 0) {
        if (this.findAvailableCell(rL + 4, cL + 4) === 0 || c[rL + 4][cL + 4] === 0 || c[rL + 4][cL + 4] === val) {
          return 1;
        }
        if (this.findAvailableCell(rL + 5, cL + 5) === 1) {
          if (c[rL + 5][cL + 5] !== 0 && c[rL + 5][cL + 5] !== val && c[rL + 4][cL + 4] === val) {
            return 1;
          }
        }
      } else
      if (this.findAvailableCell(rL - 1, cL - 1) === 1) {
        if (c[rL - 1][cL - 1] === 0) {
          if (this.findAvailableCell(rL + 4, cL + 4) === 0 || c[rL + 4][cL + 4] === 0 || c[rL + 4][cL + 4] === val) {
            return 1;
          } else
          if (this.findAvailableCell(rL + 5, cL + 5) === 1) {
            if (c[rL + 5][cL + 5] !== 0 && c[rL + 5][cL + 5] !== val && c[rL + 4][cL + 4] === val) {
              return 1;
            }
          }
        } else
        if (c[rL - 1][cL - 1] !== 0 && c[rL - 1][cL - 1] !== val) {
          if (this.findAvailableCell(rL + 4, cL + 4) === 1 && c[rL + 4][cL + 4] === val) {
            return 1;
          }
        }
      }
    }
    return 0;
  }
  checkHorizontal(row, col) {
    var c = this.state.cells;
    var val = this.state.player ? 2 : 1;
    var i = col;
    var checkFlag = false;
    while (i > 0) {
      i--;
    }
    while (i <= this.state.numberCol - 4) {
      if (c[row][i] === val && c[row][i + 1] === val && c[row][i + 2] === val && c[row][i + 3] === val) {
        checkFlag = true;
        break;
      }
      i++;
    }
    if (checkFlag === true) {
      if (i === 0) {
        if (i + 4 > this.state.numberCol - 1 || c[row][i + 4] === 0 || c[row][i + 4] === val) {
          return 1;
        }
      } else
      if (i > 0) {
        if (c[row][i - 1] === 0) {
          if (i + 4 > this.state.numberCol - 1 || c[row][i + 4] === 0 || c[row][i + 4] === val) {
            return 1;
          }
        } else
        if (c[row][i - 1] !== 0 && c[row][i - 1] !== val) {
          if (i + 4 <= this.state.numberCol - 1 && c[row][i + 4] === val) {
            return 1;
          }
        }
      }
    }
    return 0;
  }
  checkVertical(row, col) {
    var c = this.state.cells;
    var val = this.state.player ? 2 : 1;
    var checkFlag = false;
    var i = row;
    while (i > 0) {
      i--;
    }
    while (i <= this.state.numberRow - 4) {
      if (c[i][col] === val && c[i + 1][col] === val && c[i + 2][col] === val && c[i + 3][col] === val) {
        checkFlag = true;
        break;
      }
      i++;
    }
    if (checkFlag === true) {
      if (i === 0) {
        if (i + 4 > this.state.numberRow - 1 || c[i + 4][col] === 0 || c[i + 4][col] === val) {
          return 1;
        }
      } else
      if (i > 0) {
        if (c[i - 1][col] === 0) {
          if (i + 4 > this.state.numberRow - 1 || c[i + 4][col] === 0 || c[i + 4][col] === val) {
            return 1;
          }
        } else
        if (c[i - 1][col] !== 0 && c[i - 1][col] !== val) {
          if (i + 4 <= this.state.numberRow - 1 && c[i + 4][col] === val) {
            return 1;
          }
        }
      }
    }

    return 0;
  }
  checkVictory(row, col) {
    if (this.checkDiagonal(row, col) === 1 || this.checkHorizontal(row, col) === 1 || this.checkVertical(row, col) === 1) {
      return 1;
    }
    return 0;
  }
  restart() {
    var numberCol = this.state.numberCol;
    var numberRow = this.state.numberRow;
    var cells = [];
    for (let i = 0; i < numberRow; i++) {
      cells.push(new Array(numberCol).fill(0));
    }
    this.setState({
      numberCol: numberCol,
      numberRow: numberRow,
      cells: cells,
      player: false,
      winner: 0 });

    console.log(this);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", null, this.state.winner ? this.state.winner === 1 ? "Black Win" : "Red Win" : this.state.player ? "Black Turn" : "Red Turn"), /*#__PURE__*/
      React.createElement(Board, { numberRow: this.state.numberRow, numberCol: this.state.numberCol, clickHandler: this.clickHandler, player: this.state.player, cells: this.state.cells }), /*#__PURE__*/
      React.createElement("button", { onClick: this.restart }, "Restart")));


  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(Game, null),
document.getElementById("root"));


/*var cells = [];
for(let i = 0; i < 6; i++) {
  cells.push(new Array(7).fill(0));
}

console.log(cells);*/