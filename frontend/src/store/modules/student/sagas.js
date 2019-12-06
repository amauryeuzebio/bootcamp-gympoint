import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  studentsGetSuccess,
  studentsSaveSuccess,
  studentsDeleteSuccess,
  studentsFailure,
} from './actions';

function* getStudent({ payload }) {
  try {
    const response = yield call(api.get, `/student/${payload.id}`);
    yield put(studentsGetSuccess(response.data));
  } catch (error) {
    toast.error('Aluno não localizado!');
  }
}

function* addStudent(data) {
  try {
    const response = yield call(api.post, 'students', data);

    history.push('/student');

    toast.success('Aluno cadastrado com sucesso');
    yield put(studentsSaveSuccess(response.data));
  } catch (error) {
    toast.error('Erro cadastrar aluno!');
    yield put(studentsFailure());
  }
}

function* updateStudent(data) {
  try {
    const response = yield call(api.put, `students/${data.id}`, data);

    history.push('/student');

    toast.success('Aluno Atualizado com sucesso');
    yield put(studentsSaveSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao atualizar aluno!');
    yield put(studentsFailure());
  }
}

function* saveStudent({ payload }) {
  const id = payload.data.id ? payload.data.id : '';

  if (id) {
    yield updateStudent(payload.data);
  } else {
    yield addStudent(payload.data);
  }
}

function* deleteStudent({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `students/${id}`);

    history.push('/student');

    toast.success('Aluno removido com sucesso');
    yield put(studentsDeleteSuccess(id));
  } catch (error) {
    toast.error('Erro ao remover o aluno!');
    yield put(studentsFailure());
  }
}

export default all([
  takeLatest('@student/SAVE_REQUEST', saveStudent),
  takeLatest('@student/GET_REQUEST', getStudent),
  takeLatest('@student/DELETE_REQUEST', deleteStudent),
]);
