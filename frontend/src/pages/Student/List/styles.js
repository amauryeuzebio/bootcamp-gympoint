import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 86px;

  strong {
    font-size: 24px;
    color: #444444;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    background: #fff;
    border: 1px solid #dddddd;
    border-radius: 4px;
    height: 36px;
    padding: 0 30px;
    margin: 0 0 0 16px;
    &::placeholder {
      color: #999999;
    }
  }

  button {
    margin: 0;
    padding: 0;
    background: #ee4d64;
    color: #fff;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.05, '#ee4d64')};
    }
  }
`;

export const Body = styled.div`
  max-width: 1200px;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Edit = styled(Link)`
  color: #4d85ee;
  margin-right: 23px;
  font-size: 15px;
`;

export const Del = styled.button`
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  color: #de3b3b;
  font-size: 15px;
`;
