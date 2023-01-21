import "./index.scss"
import Circle from "../components/circle"
import Draggable, { DraggableCore } from 'react-draggable';
import React from 'react';
import { useState } from "react";
import styled from "@emotion/styled";

let ROW_LENGTH = 6;
let COLUMN_LENGTH = 7;

const DraggableCircle = styled.div`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    cursor: move;
    background-color: ${props => props.playerTurn == 1 ? `yellow` : `red`};
    transition: ${props => props.isControlled ? `transform 0.5s` : `none`};
  `;

function IndexPage() {
  const [position, setPosition] = useState({ x: 200, y: 0 });
  const [isControlled, setIsControlled] = useState(true);
  const [board, setBoard] = useState([[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]);
  const [playerTurn, setPlayerTurn] = useState(1);
  const tableRef = React.createRef();


  const handleStart = () => {
    setIsControlled(false)
  }
  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const handleStop = async (e, data) => {
    setIsControlled(true)
    var yArray = tableRef.current.children[0].children;
    var y = yArray[yArray.length - 1].getBoundingClientRect().y;

    var xArray = Array.from(tableRef.current.children[0].children[0].children).map((e) => e.getBoundingClientRect().x);
    console.log(data.x);

    var current = 0;
    for (var i = 0; i < xArray.length; i++) {
      if (data.x > current && data.x < xArray[i]) {
        setPosition({ x: xArray[i] - 4, y: y - 4 });
        setTimeout(() => { setIsControlled(false); setPosition({ x: 200, y: 0 }) }, 1000);
        break;
      }
      current = xArray[i];
    }




    // todo: bounce
    // await delay(200);
    // setPosition({ x: data.x, y: y - 10 })
    // await delay(200);
    // setPosition({ x: data.x, y: y })
  }

  const arrayContainsConnect4 = (array) => {
    return array.join('').includes(playerTurn == 1 ? '1111' : '2222');;
  }

  const checkRow = (rowIndex) => {
    return this.arrayContainsConnect4(board[rowIndex]);
  }

  const checkColumn = (columnIndex) => {
    return this.arrayContainsConnect4(board.map((row) => row[columnIndex]));
  }

  const checkDiagonalUp = (rowIndex, columnIndex) => {
    var x = columnIndex;
    var y = rowIndex;
    while (x > 0 && y > 0) {
      x--;
      y--;
    }
    var array = [];
    while (x < COLUMN_LENGTH && y < ROW_LENGTH) {
      array.push(board[y][x]);
      x++;
      y++;
    }
    return arrayContainsConnect4(array);
  }

  const checkDiagonalDown = (rowIndex, columnIndex) => {
    var x = columnIndex;
    var y = rowIndex;

    while (x > 0 && y < ROW_LENGTH - 1) {
      y++;
      x--;
    }
    var array = [];
    while (y >= 0 && x < COLUMN_LENGTH) {
      array.push(board[y][x]);
      y--;
      x++;
    }
    return this.arrayContainsConnect4(array);
  }

  const checkIfWon = (rowIndex, columnIndex) => {
    return checkRow(rowIndex)
      || checkColumn(columnIndex)
      || checkDiagonalUp(rowIndex, columnIndex)
      || checkDiagonalDown(rowIndex, columnIndex);
  }

  const clickColumn = (columnIndex) => {
    var foundSpot = false;
    var rowIndex = -1;
    // we reverse the rows because we need to check the bottom ones first
    // then reverse again to get correct order
    // this.setState(state => ({
    //   board: state.board.reverse().map((row, index) => {
    //     // TODO: separate the logic inside here
    //     if (!foundSpot && row[columnIndex] == 0) {
    //       foundSpot = true;
    //       row[columnIndex] = state.playerTurn;
    //       rowIndex = index;
    //       if (checkIfWon(rowIndex, columnIndex)) {
    //         console.log("won");
    //       }
    //     }
    //     return row;
    //   }).reverse(),
    //   playerTurn: state.playerTurn == 1 ? 2 : 1
    // }));
  }

    return (
      <>
        < Draggable
          bounds={{ top: 0, bottom: 100, }}
          position={position}
          onStart={handleStart}
          onDrag={handleDrag}
          onStop={handleStop}
        >
          <DraggableCircle isControlled={isControlled}></DraggableCircle>
        </Draggable >
        <table ref={tableRef}><tbody >
          {board.map((row, rowIndex) => {
            return <tr key={rowIndex} >
              {row.map((value, columnIndex) => {
                return <td key={columnIndex}><Circle key={columnIndex} value={value}></Circle></td>
              })}
            </tr>
          })}
        </tbody></table ></>
    );
}

export default IndexPage;