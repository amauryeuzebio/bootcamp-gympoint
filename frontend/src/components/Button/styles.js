import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  height: 36px;
  width: 142px;
  border: 0;
  background: ${props => props.color};
  border-radius: 4px;
  font-weight: bold;
  color: #fff;
  transition: background 0.2s;

  &:hover {
    background: ${props => darken(0.05, props.color)};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    margin-right: 2px;
  }
`;
