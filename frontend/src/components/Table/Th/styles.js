import styled from 'styled-components';

export const CustomTh = styled.th`
  text-align: ${props => props.align || `left`};
  font-size: 16px;
  color: #444444;
`;
