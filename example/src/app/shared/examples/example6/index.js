import React from "react";

// Layout Components.
import Num from "components/layout/num";
import Code from "components/layout/code";
import List from "components/layout/list";
import Color from "components/layout/color";
import Title from "components/layout/title";
import Button from "components/layout/button";
import Spacer from "components/layout/spacer";
import Content from "components/layout/content";

// Example Introduction.
export const Intro6 = ({intro = true}) => (
  <Content>
    <Title color="#16174c">➅ Sharing state between components</Title>
    <Spacer size="10px"/>
    In traditional Redux app our components share common state via accessing Redux Store.
    This means that all components have access to whole app state. We use <strong>selectors</strong> to
    slice this hudge state to the part that the component actually need.
    <Spacer size="10px"/>
    RHM kind of flips that out by creating encapsulated portions of global state for each component.
    This doesn't means that you don't have access to global state in your component. So how to make
    it possible?
    <Spacer size="20px"/>
    {
      intro &&
      <div style={{textAlign: "right"}}>
        <Button to="/example6" color="#16174c">See the example</Button>
      </div>
    }
  </Content>
);


// Example Content.
export default function Example() {
  return (
    <Content>
      <Spacer size="10px"/>
      <Button to="/" color="#16174c">👈 Back to Index </Button>
      <Intr61 intro={false}/>
    </Content>
  );
};
