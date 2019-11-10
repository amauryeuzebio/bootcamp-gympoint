import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const ButtonAction = styled.button`
  padding: 0.5rem 0.75rem;
  min-width: 3.5rem;
  text-align: center;
  box-shadow: none !important;
  border: 1px solid #dee2e6;
  background: none;
  color: #ee4d64;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background: #ee4d64;
    color: #fff;
  }
`;

export const ButtonPage = styled.button`
  padding: 0.5rem 0.75rem;
  min-width: 3.5rem;
  text-align: center;
  box-shadow: none !important;
  border: 1px solid #dee2e6;
  background: ${props => (props.active ? '#ee4d64' : 'none')};
  color: ${props => (props.active ? '#fff' : '#ee4d64')};
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background: #ee4d64;
    color: #fff;
  }
`;
