import {takeLatest, call, put, all} from 'redux-saga/effects';
import {Alert} from 'react-native';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import {
  helpOrderListSuccess,
  helpOrderSuccess,
  orderAnswerSuccess,
  helpOrderFailure,
} from './actions';

export function* listHelpOrder({payload}) {
  try {
    const {id, page} = payload.data;

    const res = yield call(api.get, `students/${id}/help-orders?page=${page}`, {
      id,
    });

    const total = res.data.totalPages;

    const data = res.data.orders.map(helpOrder => ({
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

    yield put(helpOrderListSuccess({helpOrders: data, totalPages: total}));
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

export function* orderAnswer({payload}) {
  const data = yield {
    id: payload.id,
    answer: payload.answer,
    answer_at: payload.answer_at,
    dateFormattedAnswerAt: formatRelative(
      parseISO(payload.answer_at),
      new Date(),
      {
        locale: pt,
      }
    ),
    dateFormattedCreatedAt: formatRelative(
      parseISO(payload.createdAt),
      new Date(),
      {locale: pt}
    ),
  };
  yield put(orderAnswerSuccess(data));
}

export default all([
  takeLatest('@helpOrder/LIST_REQUEST', listHelpOrder),
  takeLatest('@helpOrder/NEW_REQUEST', newHelpOrder),
  takeLatest('@helpOrder/ORDER_ANSWER_REQUEST', orderAnswer),
]);
