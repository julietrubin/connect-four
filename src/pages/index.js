import * as React from "react"
import Seo from "../components/seo"
import "./index.scss"
import Circle from "../components/circle"
import Draggable, { DraggableCore } from 'react-draggable';


let ROW_LENGTH = 6;
let COLUMN_LENGTH = 7;
class IndexPage extends React.Component {
  constructor() {

    super();

    this.myRef = React.createRef();
    this.state = {
      board: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      playerTurn: 1,
    }
  }

  arrayContainsConnect4(array) {
    return array.join('').includes(this.state.playerTurn == 1 ? '1111' : '2222');;
  }

  checkRow(rowIndex) {
    return this.arrayContainsConnect4(this.state.board[rowIndex]);
  }

  checkColumn(columnIndex) {
    return this.arrayContainsConnect4(this.state.board.map((row) => row[columnIndex]));
  }

  checkDiagonalUp(rowIndex, columnIndex) {
    var x = columnIndex;
    var y = rowIndex;
    while (x > 0 && y > 0) {
      x--;
      y--;
    }
    var array = [];
    while (x < COLUMN_LENGTH && y < ROW_LENGTH) {
      array.push(this.state.board[y][x]);
      x++;
      y++;
    }
    return this.arrayContainsConnect4(array);
  }

  checkDiagonalDown(rowIndex, columnIndex) {
    var x = columnIndex;
    var y = rowIndex;

    while (x > 0 && y < ROW_LENGTH - 1) {
      y++;
      x--;
    }
    var array = [];
    while (y >= 0 && x < COLUMN_LENGTH) {
      array.push(this.state.board[y][x]);
      y--;
      x++;
    }
    return this.arrayContainsConnect4(array);
  }

  checkIfWon(rowIndex, columnIndex) {
    return this.checkRow(rowIndex)
      || this.checkColumn(columnIndex)
      || this.checkDiagonalUp(rowIndex, columnIndex)
      || this.checkDiagonalDown(rowIndex, columnIndex);
  }

  clickColumn(columnIndex) {
    var foundSpot = false;
    var rowIndex = -1;
    // we reverse the rows because we need to check the bottom ones first
    // then reverse again to get correct order
    this.setState(state => ({
      board: state.board.reverse().map((row, index) => {
        // TODO: separate the logic inside here
        if (!foundSpot && row[columnIndex] == 0) {
          foundSpot = true;
          row[columnIndex] = state.playerTurn;
          rowIndex = index;
          if (this.checkIfWon(rowIndex, columnIndex)) {
            console.log("won");
          }
        } 
        return row;
      }).reverse(),
      playerTurn: state.playerTurn == 1 ? 2 : 1
    }));

  }

  dragStart = (e, position) => {
    // this.myRef.current = position;
    console.log("start");

    // console.log(e.target.innerHTML);
  };

  dragEnter = (e, position) => {
    // this.myRef.current = position;
    console.log("enter");
    // console.log(e.target.innerHTML);
  };

  drop = (e) => {
    console.log("drop");
    // const copyListItems = [...list];
    // const dragItemContent = copyListItems[dragItem.current];
    // copyListItems.splice(dragItem.current, 1);
    // copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    // dragItem.current = null;
    // dragOverItem.current = null;
    // setList(copyListItems);
  };
  render() {
    return (
      <>
        <div ref={this.myRef} className="circle player1" draggable
          onDragStart={(e) => this.dragStart(e)}
          onDragEnter={(e) => this.dragEnter(e)}
          onDragEnd={this.drop}></div>
      <table><tbody>
        {this.state.board.map((row, rowIndex) => {
          return <tr key={rowIndex} >
            {row.map((value, columnIndex) => {
              return <td key={columnIndex} onClick={() => this.clickColumn(columnIndex)}><Circle key={columnIndex} value={value}></Circle></td>
            })}
          </tr>
        })}
        </tbody></table ></>
    );
  }
}
export const Head = () => <Seo />

export default IndexPage
