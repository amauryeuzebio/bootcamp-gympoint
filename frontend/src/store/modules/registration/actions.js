export function registrationsSaveRequest(data) {
  return {
    type: '@registration/SAVE_REQUEST',
    payload: { data },
  };
}

export function registrationsSaveSuccess(data) {
  return {
    type: '@registration/SAVE_SUCCESS',
    payload: { data },
  };
}

export function registrationsGetRequest(id) {
  return {
    type: '@registration/GET_REQUEST',
    payload: { id },
  };
}

export function registrationsGetSuccess(data) {
  return {
    type: '@registration/GET_SUCCESS',
    payload: { data },
  };
}

export function registrationsDeleteRequest(id) {
  return {
    type: '@registration/DELETE_REQUEST',
    payload: { id },
  };
}

export function registrationsDeleteSuccess(id) {
  return {
    type: '@registration/DELETE_SUCCESS',
    id,
  };
}

export function registrationsFailure() {
  return {
    type: '@registration/ON_FAILURE',
  };
}

export function resetForm() {
  return {
    type: '@registration/RESET_FORM',
  };
}
