import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 50px 30px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: ##999999;
      margin: 0 0 10px;

      &::placeholder {
        color: #999999;
      }
    }

    span {
      color: #ee4d64;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      font-size: 14px;
    }

    strong {
      color: #444444;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      font-size: 14px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#EE4D64')};
      }
    }
  }
`;
