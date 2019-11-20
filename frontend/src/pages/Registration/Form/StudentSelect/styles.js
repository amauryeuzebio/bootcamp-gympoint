import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: #444444;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  span {
    color: #ee4d64;
    align-self: flex-start;
    margin: 10px 0px;
    font-weight: bold;
  }

  input {
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 4px;
    height: 20px;
    padding: 0 15px;
    color: #999999;
    margin: 0 0 10px;

    &::placeholder {
      color: #999999;
    }
  }
`;
