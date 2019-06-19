import styled from "styled-components";
import {Link} from "react-router-dom";

const Button = styled(Link)`
  font-size: 18px;
  font-weight: 500;
  padding: 6px 10px;
  align-items: center;
  display: inline-flex;
  text-decoration: none;
  justify-content: center;
  transition: background .3s ease, color .3s ease, border .3s ease;
  border-bottom: 2px solid #ccc;
  ${({color = "#333"}) => `
    color: ${color};
    &:hover {
      border-bottom: 2px solid ${color};      
    }
  `}
`;

export default Button;
