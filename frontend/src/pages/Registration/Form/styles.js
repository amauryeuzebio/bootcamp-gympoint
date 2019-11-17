import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
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
  max-width: 1200px;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 112px;
    margin-left: 16px;
    font-weight: bold;
    font-size: 14px;
  }
`;

export const CustomInput = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    color: #444444;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  span {
    color: #ee4d64;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  input {
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: #999999;
    margin: 0 0 10px;

    &::placeholder {
      color: #999999;
    }
  }
`;

export const ReadInput = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    color: #444444;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  input {
    background: #f5f5f5;
    border: 1px solid #dddddd;
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: #999999;
    margin: 0 0 10px;
  }
`;
