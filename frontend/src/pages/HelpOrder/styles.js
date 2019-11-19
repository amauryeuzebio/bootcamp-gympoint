import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 700px;
  margin: auto;
`;

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

export const Body = styled.div`
  max-width: 700px;
  min-height: 550px;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
`;

export const Reply = styled.button`
  color: #4d85ee;
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  font-size: 15px;
`;

export const ModalContainer = styled.div`
  h1 {
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
    color: #444;
  }

  p {
    margin: 10px 0 10px 0;
    font-size: 16px;
    line-height: 26px;
    color: #666666;
  }

  form {
    display: flex;
    flex-direction: column;

    textarea {
      background: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      margin: 16px 0 0;
      height: 120px;
    }

    span {
      color: #ee4d64;
      align-self: flex-start;
      margin: 16px 0 0;
      font-weight: bold;
    }

    button {
      margin: 16px 0 0;
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
    }
  }
`;
