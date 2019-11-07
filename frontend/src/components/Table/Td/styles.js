import styled from 'styled-components';

export const CustomTd = styled.td`
  text-align: ${props => props.align || `left`};
  color: #666666;
  border-bottom: #eee 1px solid;
  padding: 16px 0px;
`;
