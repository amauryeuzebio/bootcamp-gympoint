import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -30px;
  svg {
    position: relative;
    left: 46px;
    color: #999999;
  }
`;

export const Search = styled.input`
  background: #fff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  height: 44px;
  padding: 0px 15px 0px 30px;
  margin: 0 0 10px;
  &::placeholder {
    color: #999999;
  }
`;
