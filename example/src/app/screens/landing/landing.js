import React, {Fragment} from "react";

import Overview from "./screens/overview";

export default class Landing extends React.PureComponent {
  render() {
    return (
      <div>
        <div>Hello RHM {this.props.counter}</div>
        <button onClick={this.props.helloLanding}>Hello</button>
        <button onClick={this.props.extMe}>Hello Ext</button>
        <br/>
        <div>{this.props.ext}</div>
        <hr/>
        <div>MULTI: {this.props.multi}</div>
        <div>
          <button onClick={() => this.props.multiply(1)}>x1</button>
          <button onClick={() => this.props.multiply(2)}>x2</button>
        </div>
        <hr/>
        <Overview/>
      </div>
    )
  }
}
