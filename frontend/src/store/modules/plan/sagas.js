import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  plansGetSuccess,
  plansSaveSuccess,
  plansDeleteSuccess,
  plansFailure,
} from './actions';

function* getPlan({ payload }) {
  try {
    const response = yield call(api.get, `/plans/${payload.id}`);
    yield put(plansGetSuccess(response.data));
  } catch (error) {
    toast.error('Plano não localizado!');
  }
}

function* addPlan(data) {
  try {
    const response = yield call(api.post, 'plans', data);

    history.push('/plan');

    toast.success('Plano cadastrado com sucesso');
    yield put(plansSaveSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao cadastrar plano!');
    yield put(plansFailure());
  }
}

function* updatePlan(data) {
  try {
    const response = yield call(api.put, `plans/${data.id}`, data);

    history.push('/plan');

    toast.success('Plano Atualizado com sucesso');
    yield put(plansSaveSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao atualizar plano!');
    yield put(plansFailure());
  }
}

function* savePlan({ payload }) {
  const id = payload.data.id ? payload.data.id : '';

  if (id) {
    yield updatePlan(payload.data);
  } else {
    yield addPlan(payload.data);
  }
}

function* deletePlan({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `plans/${id}`);

    history.push('/plan');

    toast.success('Plano removido com sucesso');
    yield put(plansDeleteSuccess(id));
  } catch (error) {
    toast.error('Erro ao remover o plano!');
    yield put(plansFailure());
  }
}

export default all([
  takeLatest('@plan/SAVE_REQUEST', savePlan),
  takeLatest('@plan/GET_REQUEST', getPlan),
  takeLatest('@plan/DELETE_REQUEST', deletePlan),
]);
