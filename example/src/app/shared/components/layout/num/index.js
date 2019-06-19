import styled from "styled-components";

const Num = styled.span`
  color: #d81b60;
  position: relative;

  &::before {
    left: 5px;
    top: -25px;
    width: 20px;
    height: 20px;
    color: white;
    display: flex;
    font-size: 12px;
    font-weight: bold;
    line-height: 12px;
    border-radius: 50%;
    position: absolute;
    background: #d81b60;
    align-items: center;
    content: attr(value);
    justify-content: center;

    box-shadow: 2px 1px 5px 0px rgba(0,0,0,0.5);
  }
`;

export default Num;
