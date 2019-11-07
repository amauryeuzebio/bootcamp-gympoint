import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  margin: 5px 0 0;
  height: 44px;
  background: ${props => (props.disabled ? '#999' : '#ee4d64')};
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${props =>
      props.disabled ? darken(0.03, '#999') : darken(0.03, '#EE4D64')};
  }
`;
