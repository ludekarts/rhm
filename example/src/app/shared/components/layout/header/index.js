import styled from "styled-components";

const Header = styled.h1`
  margin: 0;
  padding: 20px;
  text-align: center;
  ${({color = "#333", bg = "transparent"}) => `
    color:${color};
    background:${bg};
  `};  
`;

export default Header;
