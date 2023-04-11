import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  background-color: black;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding-left: 50px;
`;

export const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

export const Li = styled.li`
  margin-right: 20px;
`;

export const A = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
`;
