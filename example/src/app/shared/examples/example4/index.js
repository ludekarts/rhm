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
export const Intro4 = ({intro = true}) => (
  <Content>
    <Title color="#16174c">➃ Deal with Async Actions</Title>
    <Spacer size="10px"/>
    Async actions are bread and butter of most of the Redux apps. In this example we learn how to handle them
    using <strong>RHM's Middleware</strong>.
    <Spacer size="20px"/>
    {
      intro &&
      <div style={{textAlign: "right"}}>
        <Button to="/example4" color="#16174c">See the example</Button>
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
      <Intro4 intro={false}/>
      ...
    </Content>
  );
};
