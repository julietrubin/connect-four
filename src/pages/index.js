import * as React from "react"
import Seo from "../components/seo"
import "./index.scss"
import Circle from "../components/circle"

class IndexPage extends React.Component {
  constructor() {
    super();

    this.state = {
      board: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      playerTurn: 1,
    }
  }

  clickColumn(columnIndex) {
    var foundSpot = false;
    // we reverse the rows because we need to check the bottom ones first
    // then reverse again to get in correct order
    this.setState(state => ({
      board: state.board.reverse().map((row, index) => {
        if (!foundSpot && row[columnIndex] == 0) {
          foundSpot = true;
          row[columnIndex] = state.playerTurn;
        }    
        return row;
      }).reverse(),
      playerTurn: state.playerTurn == 1 ? 2 : 1
    }));
  }

  render() {
    return (
      <table><tbody>
        {this.state.board.map((row, rowIndex) => {
          return <tr key={rowIndex} >
            {row.map((value, columnIndex) => {
              return <td key={columnIndex} onClick={() => this.clickColumn(columnIndex)}><Circle key={columnIndex} value={value}></Circle></td>
            })}
          </tr>
        })}
        {/* {this.state.circles.map(x => x.map(y => <Circle clicked={true}></Circle>))} */}
        {/* <div className={`circle ${this.state.clicked ? "clicked" : ""}`} onClick={this.clickCircle.bind(this)}></div> */}
      </tbody></table >
    );
  }
}
export const Head = () => <Seo />

export default IndexPage
