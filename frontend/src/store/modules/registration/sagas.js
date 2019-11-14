import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  registrationsGetSuccess,
  registrationsSaveSuccess,
  registrationsDeleteSuccess,
  registrationsFailure,
} from './actions';

function* getRegistration({ payload }) {
  try {
    const response = yield call(api.get, `/registrations/${payload.id}`);
    yield put(registrationsGetSuccess(response.data));
  } catch (error) {
    toast.error('Matricula não localizada!');
  }
}

function* addRegistration(data) {
  try {
    const response = yield call(api.post, 'registrations', data);

    history.push('/registration');

    toast.success('Matricula cadastrado com sucesso');
    yield put(registrationsSaveSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao cadastrar matricula!');
    yield put(registrationsFailure());
  }
}

function* updateRegistration(data) {
  try {
    const response = yield call(api.put, `registrations/${data.id}`, data);

    history.push('/registration');

    toast.success('Matricula Atualizada com sucesso');
    yield put(registrationsSaveSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao atualizar matricula!');
    yield put(registrationsFailure());
  }
}

function* saveRegistration({ payload }) {
  const id = payload.data.id ? payload.data.id : '';

  if (id) {
    yield updateRegistration(payload.data);
  } else {
    yield addRegistration(payload.data);
  }
}

function* deleteRegistration({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `registrations/${id}`);

    history.push('/registration');

    toast.success('matricula removida com sucesso');
    yield put(registrationsDeleteSuccess(id));
  } catch (error) {
    toast.error('Erro ao remover matricula!');
    yield put(registrationsFailure());
  }
}

export default all([
  takeLatest('@registration/SAVE_REQUEST', saveRegistration),
  takeLatest('@registration/GET_REQUEST', getRegistration),
  takeLatest('@registration/DELETE_REQUEST', deleteRegistration),
]);
