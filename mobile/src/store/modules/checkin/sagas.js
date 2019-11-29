import {takeLatest, call, put, all} from 'redux-saga/effects';
import {Alert} from 'react-native';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import {checkinListSuccess, checkinSuccess, checkinFailure} from './actions';

export function* listCheckin({payload}) {
  try {
    const {id} = payload;

    const res = yield call(api.get, `students/${id}/checkins`, {
      id,
    });

    const data = res.data.map(checkin => ({
      ...checkin,
      dateFormatted: formatRelative(parseISO(checkin.createdAt), new Date(), {
        locale: pt,
      }),
    }));

    yield put(checkinListSuccess(data));
  } catch (error) {
    Alert.alert('Erro:', 'Erro ao listar checkins');
    yield put(checkinFailure());
  }
}

export function* newCheckin({payload}) {
  try {
    const {id} = payload;

    const res = yield call(api.post, `students/${id}/checkins`, {
      id,
    });

    const checkin = res.data;

    const data = {
      ...checkin.checkin,
      dateFormatted: formatRelative(
        parseISO(checkin.checkin.createdAt),
        new Date(),
        {
          locale: pt,
        }
      ),
    };
    yield put(checkinSuccess(data));
  } catch (error) {
    Alert.alert('Error', 'Você já realizou o limite máximo de checkins');
    yield put(checkinFailure());
  }
}

export default all([
  takeLatest('@checkin/LIST_REQUEST', listCheckin),
  takeLatest('@checkin/NEW_REQUEST', newCheckin),
]);
