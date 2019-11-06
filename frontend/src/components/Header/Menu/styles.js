import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.nav``;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  font-size: 15px;
  color: #999999;
  margin-left: 20px;
`;

export const MenuItem = styled.li`
  padding: 10px;
`;

export const MenuLink = styled(NavLink)`
  color: #999999;
  transition: color 0.5s;

  &:hover {
    color: #ee4d64;
  }
`;
