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
export const Intro1 = ({intro = true}) => (
  <Content>
    <Title color="#16174c">➀ Creating Compact Components</Title>
    <Spacer size="10px"/>
     Compact Component are the simplest version of Redux component. This sollution is most suitable for
     small components with simple logic. In this example we'll create a basic accordion that keeps info
     about its open state and color in Redux Store. We'll skip the code of Styled-Components as it's not
     relevent to this exercise.
     <Spacer size="20px"/>
     {
       intro &&
       <div style={{textAlign: "right"}}>
         <Button to="/example1" color="#16174c">See the example</Button>
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
      <Intro1 intro={false}/>
      To be able to freely follow this tutorial you should be familiar with <a href="#">RHM's Component Pattern</a>.
      
      <h4>File structure</h4>
      Our accordion will be located in <strong>shared/components/</strong> catalog to make it available
      on each level of the application. File structure for this Compact Component will looks something
      like this:
      <Code>{
        '|- accordion\n' +
        '  |- accordion.js   // Component + UI \n' +
        '  |- index.js       // Interface \n' +
        '  |- redux.js       // Redux logic'
      }</Code>

      <h4>Component + UI (accordion.js)</h4>
      Below we can see standard presentational component.
      Props highlighted in <Color hex="#ffc107">yellow</Color> are ones came from the Redux Store. The <Color hex="#8bc34a">green</Color> ones are Component's props.
      <Code>{
        'export default class Accordion extends React.PureComponent {\n' +
        '  render() {\n' +
        '    return (\n' +
        '      <div>\n' +
        '        <TitleBar color={'}<Color hex="#ffc107">this.props.color</Color>{'} onClick={'}<Color hex="#ffc107">this.props.accordionToggle</Color>{'}>\n' +
        '          {'}<Color hex="#8bc34a">this.props.title</Color>{'}\n' +
        '        </TitleBar>\n' +
        '        <Container open={'}<Color hex="#ffc107">this.props.open</Color>{'} color={'}<Color hex="#ffc107">this.props.color</Color>{'}>\n' +
        '          {'}<Color hex="#8bc34a">this.props.children</Color>{'}\n' +
        '        </Container>\n' +
        '      </div>\n' +
        '    );\n' +
        '  }\n' +
        '};'
      }</Code>

      <h4>Redux logic (redux.js)</h4>
      Whole logic for the accordion component is contained it this file:
      <Code>{
        'import {createCompactUtils} from "rhm";\n\n\n' +
        'export default createCompactUtils("'}<Num value="1">accordion</Num>{'", {\n\n\n' +
        '  '}<Num value="2">initState</Num>{': {\n' +
        '    open: true,\n' +
        '    color: "#5c6bc0"\n' +
        '  },\n\n\n' +
        '  '}<Num value="3">reducer</Num>{': {\n' +
        '    TOGGLE_ACCORDION: ({state}) => ({open: !state.open})\n' +
        '  },\n\n\n' +
        '  '}<Num value="4">actions</Num>{': {\n' +
        '    accordionToggle: ["TOGGLE_ACCORDION"]\n' +
        '  },\n\n\n' +
        '  '}<Num value="5">selectors</Num>{': {\n' +
        '    getState: state => state.open,\n' +
        '    getColor: state => state.color\n' +
        '  }\n' +
        '});'
      }</Code>
      <Spacer size="15px"/>
      <List>
        <li>Name the utility - under this name component will be registered in Redux Store.</li>
        <li>Set initial state - default values for the component. Here: color and open state.</li>
        <li>Provide reducing functions - this allows to update Redux Store accordingly to the dispatched actions</li>
        <li>Define actions - list of actions that can be dispatched.</li>
        <li>Add selsctors - allows to derived values or certain pieces of state for global state.</li>
      </List>
    </Content>
  );
};
