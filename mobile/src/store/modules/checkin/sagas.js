import {takeLatest, call, put, all} from 'redux-saga/effects';

import {Alert} from 'react-native';
import api from '~/services/api';
import {checkinListSuccess, checkinListFailure} from './actions';

export function* listCheckin({payload}) {
  try {
    const {id} = payload;

    const res = yield call(api.get, `students/${id}/checkins`, {
      id,
    });

    const checkin = res.data;

    yield put(checkinListSuccess(checkin));
  } catch (error) {
    Alert.alert('Erro:', 'Erro ao listar checkins');
    yield put(checkinListFailure());
  }
}

export default all([takeLatest('@checkin/LIST_REQUEST', listCheckin)]);
