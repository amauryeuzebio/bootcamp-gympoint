import styled from 'styled-components';

export const CustomGrid = styled.div`
  max-width: 1360px;
  padding-right: 15px;
  padding-left: 15px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  &:before,
  &:after {
    content: ' ';
    display: table;
  }
  &:after {
    clear: both;
  }
`;
