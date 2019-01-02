import React from "react"

export default class Overview extends React.PureComponent {
  render() {
    return (
      <div>Overview <button onClick={this.props.helloOverview}>Hit</button> {this.props.hits}</div>
    )
  }
}
