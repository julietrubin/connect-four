import * as React from "react"
import Seo from "../components/seo"
import "./index.scss"

class IndexPage extends React.Component {
  constructor() {
    super();

    this.state = {
      clicked: true
    }
  }

  clickCircle() {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    return (
      <>
        <div className={`circle ${this.state.clicked ? "clicked" : ""}`} onClick={this.clickCircle.bind(this)}></div>
      </>
    );
  }
}
export const Head = () => <Seo />

export default IndexPage
