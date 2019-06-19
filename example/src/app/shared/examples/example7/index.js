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
export const Intro7 = ({intro = true}) => (
  <Content>
    <Title color="#16174c">➆ Code splitting</Title>
    <Spacer size="10px"/>
    When your app is growing big you certainly reach the point you would like to chunk it into smaller
    pieces. In this example we learn how we can do it with <strong>RHM</strong> and <strong>react-loadable</strong>.
    <Spacer size="20px"/>
    {
      intro &&
      <div style={{textAlign: "right"}}>
        <Button to="/example7" color="#16174c">See the example</Button>
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
      <Intro7 intro={false}/>
      ...
    </Content>
  );
};
