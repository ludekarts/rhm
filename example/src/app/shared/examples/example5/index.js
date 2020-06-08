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
export const Intro5 = ({intro = true}) => (
  <Content>
    <Title color="#16174c">➄ Constructing Redux Store bottom up</Title>
    <Spacer size="10px"/>
    Redux as a global state container is great pattern for building apps. However when the app grows in
    complexity it becomes more and more challenging to maintain its readability without even mentioning
    separation of concerns or state encapsulation for the components. RHM provides some utilities that
    may helps a bit in this area.
    <Spacer size="10px"/>
    Using <strong>mergeReduxUtils</strong> and <strong>mountReducers</strong> we can fairly easily create
    our state in the bottom up fashion. That means we create our Store from the states of our components.
    It's quite handy because you don't need to design your Store at the beginning or put too much thought
    to the normalization process upfront. You just build a component and plug it into Redux Store with
    RHM utilities. Thanks to that the state of your component will be part of the global state but in the
    same time it's decoupled enough to allow you for freely modification and relocation of the component*.
    <Spacer size="10px"/>
    <sub>*If you follow the rules 😉</sub>
    <Spacer size="20px"/>
    {
      intro &&
      <div style={{textAlign: "right"}}>
        <Button to="/example5" color="#16174c">See the example</Button>
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
      <Intro5 intro={false}/>
      ...
    </Content>
  );
};
