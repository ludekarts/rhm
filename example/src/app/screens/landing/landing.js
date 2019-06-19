import React, {Fragment} from "react";

// Layout Components.
import Header from "components/layout/header";
import Spacer from "components/layout/spacer";

// Example Intros.
import {Intro1} from "examples/example1";
import {Intro2} from "examples/example2";
import {Intro3} from "examples/example3";
import {Intro4} from "examples/example4";
import {Intro5} from "examples/example5";
import {Intro6} from "examples/example6";
import {Intro7} from "examples/example7";
import {Intro8} from "examples/example8";

// Landing.
export default class Landing extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <Header bg="#5ebdf9" color="#16174c">Welcome to RHM's Examples Page</Header>
        <Intro1/>
        <Intro2/>
        <Intro3/>
        <Intro4/>
        <Intro5/>
        <Intro6/>
        <Intro7/>
        <Intro8/>
        <Spacer size="90px"/>
      </Fragment>
    )
  }
}
