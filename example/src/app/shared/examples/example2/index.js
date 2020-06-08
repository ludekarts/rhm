import React from "react";

// Layout Components.
import Code from "components/layout/code";
import Color from "components/layout/color";
import Title from "components/layout/title";
import Button from "components/layout/button";
import Spacer from "components/layout/spacer";
import Content from "components/layout/content";

// Accordion Components.
import Accordion from "components/accordion";
import {AccordionOrange, AccordionGreen, AccordionMagenta} from "components/accordions";

// Example Introduction.
export const Intro2 = ({intro = true}) => (
  <Content>
    <Title color="#16174c">➁ Extending Components</Title>
    Reusing code is a game changer in terms of productivity. In this example we learn how to easily share,
    extend or alter Redux logic so it can be used with different components.
    <Spacer size="20px"/>
    {
      intro &&
      <div style={{textAlign: "right"}}>
        <Button to="/example2" color="#16174c">See the example</Button>
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
      <Intro2 intro={false}/>

      <Accordion title="Accordion Base">
        This example shows how easily you can extend components. Below accordions (Orange, Green and Manegnta) are
        extension of this <strong>Base Accordion</strong>. Click on other headlines to see more.
      </Accordion>

      <AccordionOrange title="Accordion Orange">
        To extend <em>Base Accordion</em> we need to use <strong>extendReduxUtils</strong> and <strong>createAccordion</strong> helper.

        At first we import <strong>Accordion</strong> and its <strong>Redux-utility object</strong> from the <em>Base Accordion</em>.
        <Code>{
          'import {Component as Accordion, accordion} from "components/accordion";'
        }</Code>

        Then we can extrend utiluty object with new <strong>color</strong> and <strong>open state</strong>.
        <Code>{
          'const acc_orange = extendReduxUtils("acc_orange", accordion, "ORANGE", {\n' +
          '  initState: {\n' +
          '   color: "#ffc107",\n'  +
          '   open: false\n' +
          '  }\n' +
          '});'
        }</Code>

        After that we use <strong>createAccordion</strong> helper to create <strong>connected component</strong>.
        <Code>{
          'export const AccordionOrange = createAccordion(Accordion, acc_orange);'
        }</Code>

        <strong>createAccordion</strong> helper is simply function that maps <strong>state </strong>
        and <strong>dispatch</strong> to <strong>props</strong> for given <strong>Component</strong>:
        <Code>{
          'import {connect} from "react-redux";\n' +
          'import {bindActionCreators} from "redux";\n' +
          '...\n\n'+
          'function createAccordion(Component, utils) {\n' +
          '  const {actions, selectors} = utils;\n\n' +
          '  const mapStateToProps = state => ({\n' +
          '    open: selectors.getState(state),\n' +
          '    color: selectors.getColor(state)\n' +
          '  });\n\n' +
          '  const mapDispatchToProps = dispatch =>\n' +
          '    bindActionCreators(actions, dispatch);\n\n' +
          '  return connect(mapStateToProps, mapDispatchToProps)(Component);\n' +
          '}'
        }</Code>
      </AccordionOrange>

      <AccordionGreen title="Accordion Green">
        Other two componnets shares same schema as the Orange Accordion. Check entire code here:
        <strong> example/src/app/shared/components/accordions/index.js</strong>
      </AccordionGreen>

      <AccordionMagenta title="Accordion Magenta">
        The final touch would be to use <strong>mergeReduxUtils</strong> and create a common
        <strong> export poin</strong> for all of the accordions we made.

        <Code>{
          '// accordions/index.js\n\n' +
          'export const accordions = mergeReduxUtils(acc_orange, acc_green, acc_magenta);'
        }</Code>

        This way in <strong>root reducer</strong> we can import all of the accordions once and don't care
        how the internal structure looks like. RHM will take care of that.
        <Code>{
          '// reducers.js\n\n' +
          'import {mountReducers} from "rhm";\n' +
          'import {combineReducers} from "redux";\n' +
          'import {accordions} from "components/accordions";\n' +
          '...\n\n' +
          '// Export Root Reducer.\n' +
          'export default combineReducers(mountReducers(accordions));'
        }</Code>

        Review accordions code to get the full picture of how it's made.
      </AccordionMagenta>
      <Spacer size="60px"/>
    </Content>
  );
};
