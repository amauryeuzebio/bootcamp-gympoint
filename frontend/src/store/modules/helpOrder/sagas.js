import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { answerSuccess, answerSaveSuccess, answerFailure } from './actions';

function* getAnswer({ id }) {
  try {
    const response = yield call(api.get, `help-orders/${id}`);
    yield put(answerSuccess(response.data));
  } catch (error) {
    toast.error('Pedido de ajuda não localizado!');
  }
}

function* saveAnswer({ payload }) {
  try {
    const response = yield call(
      api.put,
      `help-orders/${payload.data.id}/answer`,
      {
        answer: payload.data.answer,
      }
    );

    toast.success('Pedido de ajuda repondido com sucesso!');
    yield put(answerSaveSuccess(response.data.id));
  } catch (error) {
    toast.error('Erro ao ao responder pedido de ajuda!');
    yield put(answerFailure());
  }
}

export default all([
  takeLatest('@help/ANSWER_REQUEST', getAnswer),
  takeLatest('@help/ANSWER_SAVE_REQUEST', saveAnswer),
]);
