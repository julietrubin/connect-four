import * as React from "react"
import Seo from "../components/seo"
import "./index.scss"
import Circle from "../components/circle"

class IndexPage extends React.Component {
  constructor() {
    super();

    this.state = {
      circles: [[1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
    }
  }

  clickCircle() {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    return (
      <table>
        {this.state.circles.map((row) => {
          return <tr key={row.id}>
            {row.map((value, index) => {
              return <td><Circle value={value}></Circle></td>
            })}
          </tr>
        })}
        {/* {this.state.circles.map(x => x.map(y => <Circle clicked={true}></Circle>))} */}
        {/* <div className={`circle ${this.state.clicked ? "clicked" : ""}`} onClick={this.clickCircle.bind(this)}></div> */}
      </table>
    );
  }
}
export const Head = () => <Seo />

export default IndexPage
