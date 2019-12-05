import {takeLatest, call, put, all} from 'redux-saga/effects';

import {Alert} from 'react-native';
import api from '~/services/api';
import {signInSucess, signFailure} from './actions';

export function* singIn({payload}) {
  try {
    const {id = -1} = payload;

    const res = yield call(api.get, `students/${id}`, {
      id,
    });

    const student = res.data;

    if (student.id) {
      yield put(signInSucess(student));
    } else {
      Alert.alert('Falha na autenticação', 'Verifique com a administração');
      yield put(signFailure());
    }
  } catch (error) {
    Alert.alert('Falha na autenticação', 'Verifique com a administração');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', singIn)]);
