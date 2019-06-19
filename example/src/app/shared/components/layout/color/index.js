import styled from "styled-components";

const Color = styled.span`
  font-weight: bold;
  color: ${({hex = "#333"}) => hex};
`;

export default Color;
