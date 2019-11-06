import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    flex-direction: row;

    img {
      padding-right: 20px;
      border-right: 1px solid #dddddd;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;

  div {
    text-align: right;

    strong {
      display: block;
      color: #666666;
      font-weight: bold;
    }
  }

  button {
    display: block;
    margin-top: 2px;
    font-size: 14px;
    background: none;
    color: #de3b3b;
    border: 0;
    text-align: right;
  }
`;
