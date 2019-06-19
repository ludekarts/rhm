import styled from "styled-components";

const Spacer = styled.div`
  width: 100%;
  display: block;
  margin-top: ${({size}) => size || "0px"};
`;

export default Spacer;
