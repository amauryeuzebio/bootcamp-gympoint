import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const QuestionInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
  paddingLeft: '10px',
})`
  font-size: 15px;
  color: #333;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dddddd;
  padding-left: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;
