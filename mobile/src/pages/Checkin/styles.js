import styled from 'styled-components/native';
import {FlatList} from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const CheckinButton = styled(Button)``;

export const CheckinList = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
  inverted: true,
})`
  margin-top: 20px;
  width: 100%;
`;

export const CheckinInfo = styled.View`
  background-color: #fff;
  padding: 15px 20px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
`;
export const Label = styled.Text`
  color: #444444;
  font-weight: bold;
  font-size: 14px;
`;
export const Time = styled.Text`
  color: #666666;
  font-size: 12px;
`;

export const List = styled.View`
  align-items: flex-start;
`;
