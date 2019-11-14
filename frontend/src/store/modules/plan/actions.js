export function plansSaveRequest(data) {
  return {
    type: '@plan/SAVE_REQUEST',
    payload: { data },
  };
}

export function plansSaveSuccess(data) {
  return {
    type: '@plan/SAVE_SUCCESS',
    payload: { data },
  };
}

export function plansGetRequest(id) {
  return {
    type: '@plan/GET_REQUEST',
    payload: { id },
  };
}

export function plansGetSuccess(data) {
  return {
    type: '@plan/GET_SUCCESS',
    payload: { data },
  };
}

export function plansDeleteRequest(id) {
  return {
    type: '@plan/DELETE_REQUEST',
    payload: { id },
  };
}

export function plansDeleteSuccess(id) {
  return {
    type: '@plan/DELETE_SUCCESS',
    id,
  };
}

export function plansFailure() {
  return {
    type: '@plan/ON_FAILURE',
  };
}

export function resetForm() {
  return {
    type: '@plan/RESET_FORM',
  };
}
