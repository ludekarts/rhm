import styled from "styled-components";

const Title = styled.h2`
  margin: 0;
  padding: 20px 0px 15px;
  color: ${({color = "#333"}) => color};
`;

export default Title;
