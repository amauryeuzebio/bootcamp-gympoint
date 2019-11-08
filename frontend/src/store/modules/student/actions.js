export function studentsSaveRequest(data) {
  return {
    type: '@student/SAVE_REQUEST',
    payload: { data },
  };
}

export function studentsSaveSuccess(data) {
  return {
    type: '@student/SAVE_SUCCESS',
    payload: { data },
  };
}

export function studentsGetRequest(id) {
  return {
    type: '@student/GET_REQUEST',
    payload: { id },
  };
}

export function studentsGetSuccess(data) {
  return {
    type: '@student/GET_SUCCESS',
    payload: { data },
  };
}

export function studentsDeleteRequest(id) {
  return {
    type: '@student/DELETE_REQUEST',
    payload: { id },
  };
}

export function studentsDeleteSuccess(id) {
  return {
    type: '@student/DELETE_SUCCESS',
    id,
  };
}

export function studentsFailure() {
  return {
    type: '@student/ON_FAILURE',
  };
}

export function resetForm() {
  return {
    type: '@student/RESET_FORM',
  };
}
