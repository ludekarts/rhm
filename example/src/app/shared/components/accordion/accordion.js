import React from "react";
import styled from "styled-components";

const TitleBar = styled.div`
  opacity: 1;
  padding: 10px;
  color: #16174C;
  cursor: pointer;
  font-weight: 500;
  transition: opacity .3s ease;
  background: ${({color}) => color};

  font-size: 16px;
  font-weight: 500;
  font-family: "Dosis", sans-serif;

  &:hover {
    opacity: 0.9;
  }
`;

const Container = styled.div`
  height: 0;
  padding: 0;
  overflow: hidden;

  ${({open, color = "#333"}) => open && `
    height: auto;
    padding: 20px 10px;
    & strong {
      color: ${color};
    }
  `}
`;

export default class Accordion extends React.PureComponent {
  render() {
    return (
      <div>
        <TitleBar color={this.props.color} onClick={this.props.accordionToggle}>
          {this.props.title}
        </TitleBar>
        <Container open={this.props.open} color={this.props.color}>
          {this.props.children}
        </Container>
      </div>
    );
  }
};
