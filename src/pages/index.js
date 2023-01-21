import "./index.scss"
import Circle from "../components/circle"
import Draggable, { DraggableCore } from 'react-draggable';
import React from 'react';
import { useState } from "react";
import styled from "@emotion/styled";

let ROW_LENGTH = 6;
let COLUMN_LENGTH = 7;

const DraggableCircle = styled.div`
    transition: ${props => props.isControlled ? `transform 0.9s` : `none`};
  `;

function IndexPage() {
  const [position, setPosition] = useState({ x: 200, y: 0 });
  const [isControlled, setIsControlled] = useState(true);
  const [board, setBoard] = useState(Array.from({ length: ROW_LENGTH }, () => Array.from({ length: COLUMN_LENGTH }, () => 0)));
  const [playerTurn, setPlayerTurn] = useState(1);
  const tableRef = React.createRef();


  const handleStart = () => {
    setIsControlled(false)
  }
  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const findColumn = (dropX) => {
    // TODO: move xArray
    var xArray = Array.from(tableRef.current.children[0].children[0].children).map((e) => e.getBoundingClientRect().x);
    for (var i = 0; i < xArray.length; i++) {
      if (dropX >= xArray[i] - 10 && dropX <= xArray[i] + 10) {
        return i;
      }
    }
  }

  const findRow = (x) => {
    for (var i = board.length - 1; i >= 0; i--) {
      if (board[i][x] == 0) {
        return i;
      }
    }
  }


  // returns an array with [x,y] coordinates of drop location if it exist 
  // TODO: rename dropX
  const findSpot = (dropX) => {
    var column = findColumn(dropX);
    if (column != null) {
      var row = findRow(column);
      if (row != null) {
        return [row, column];
      }
    }
    return [null, null];
  }


  const handleStop = async (e, data) => {
    setIsControlled(true)
    var yArray = Array.from(tableRef.current.children[0].children).map((e) => e.getBoundingClientRect().y);
    var xArray = Array.from(tableRef.current.children[0].children[0].children).map((e) => e.getBoundingClientRect().x);

    var [row, column] = findSpot(data.x);

    if (column != null) {
      setPosition({ x: xArray[column] - 4, y: yArray[row] - 4 });
      let copy = [...board];
      copy[row][column] = playerTurn;
      setBoard(copy);
      setTimeout(() => {
        // setPlayerTurn(playerTurn == 1 ? 2 : 1);
        setIsControlled(false);
        setPosition({ x: 200, y: 0 });
        setPlayerTurn(playerTurn == 1 ? 2 : 1);
        if (checkIfWon(row, column)) {
          console.log("won");
        }
      }, 1000);
    }
  }
    // todo: bounce
    // await delay(200);
    // setPosition({ x: data.x, y: y - 10 })
    // await delay(200);
    // setPosition({ x: data.x, y: y })


  const arrayContainsConnect4 = (array) => {
    return array.join('').includes(playerTurn == 1 ? '1111' : '2222');;
  }

  const checkRow = (rowIndex) => {
    return arrayContainsConnect4(board[rowIndex]);
  }

  const checkColumn = (columnIndex) => {
    return arrayContainsConnect4(board.map((row) => row[columnIndex]));
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
    return arrayContainsConnect4(array);
  }

  const checkIfWon = (rowIndex, columnIndex) => {
    return checkRow(rowIndex)
      || checkColumn(columnIndex)
      || checkDiagonalUp(rowIndex, columnIndex)
      || checkDiagonalDown(rowIndex, columnIndex);
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
          <DraggableCircle className={`draggable-circle ${playerTurn == 1 ? "player1" : "player2"}`} isControlled={isControlled}></DraggableCircle>
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