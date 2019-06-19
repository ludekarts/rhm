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
export const Intro3 = ({intro = true}) => (
  <Content>
    <Title color="#16174c">➂ Creating Complex Components</Title>
    <Spacer size="10px"/>
    Complex components fully leverage <strong>RHM's Component Pattern</strong>.
    It allows to separate different parts of the Redux component like: reducer, actions, selectors etc.
    into separate files to maintain readability as well as logical hierarchy.
    <Spacer size="20px"/>
    {
      intro &&
      <div style={{textAlign: "right"}}>
        <Button to="/example3" color="#16174c">See the example</Button>
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
      <Intro3 intro={false}/>
      ...
    </Content>
  );
};
