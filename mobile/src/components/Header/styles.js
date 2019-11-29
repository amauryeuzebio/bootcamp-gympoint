import styled from 'styled-components/native';
import {Image, TouchableOpacity} from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  height: 64px;
  border: 0 solid #ddd;
  border-bottom-width: 1px;
  padding: 0 20px;
`;

export const GoBack = styled(TouchableOpacity)``;

export const Logout = styled(TouchableOpacity)``;

export const Logo = styled(Image)``;
