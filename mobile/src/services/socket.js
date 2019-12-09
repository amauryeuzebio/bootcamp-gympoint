import { Platform } from 'react-native';

const socket = {
  baseURL: Platform.OS === 'ios'
    ? 'http://localhost:3333'
    : 'http://10.0.2.2:3333',
};

export default socket;
