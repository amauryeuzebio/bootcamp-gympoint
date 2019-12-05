import {takeLatest, call, put, all} from 'redux-saga/effects';
import {Alert} from 'react-native';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import {
  helpOrderListSuccess,
  helpOrderSuccess,
  helpOrderFailure,
} from './actions';

export function* listHelpOrder({payload}) {
  try {
    const {id} = payload;

    const res = yield call(api.get, `students/${id}/help-orders`, {
      id,
    });

    const data = res.data.map(helpOrder => ({
      ...helpOrder,
      dateFormattedAnswerAt: helpOrder.answer_at
        ? formatRelative(parseISO(helpOrder.answer_at), new Date(), {
            locale: pt,
          })
        : null,
      dateFormattedCreatedAt: formatRelative(
        parseISO(helpOrder.createdAt),
        new Date(),
        {locale: pt}
      ),
    }));

    yield put(helpOrderListSuccess(data));
  } catch (error) {
    Alert.alert('Erro:', 'Erro ao listar pedido de ajuda');
    yield put(helpOrderFailure());
  }
}

export function* newHelpOrder({payload}) {
  try {
    const {id, question, navigation} = payload;

    if (question) {
      const res = yield call(api.post, `students/${id}/help-orders`, {
        question,
      });

      const help = res.data;

      yield put(helpOrderSuccess(help));

      navigation.navigate('HelpOrder');
    } else {
      Alert.alert('Error', 'Informe seu pedido de auxilio');

      yield put(helpOrderFailure());
    }
  } catch (error) {
    Alert.alert('Error', 'Falha ao solicitar ajuda!');
    yield put(helpOrderFailure());
  }
}

export default all([
  takeLatest('@helpOrder/LIST_REQUEST', listHelpOrder),
  takeLatest('@helpOrder/NEW_REQUEST', newHelpOrder),
]);
