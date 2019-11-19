export function answerRequest(id) {
  return {
    type: '@help/ANSWER_REQUEST',
    id,
  };
}

export function answerSuccess(data) {
  return {
    type: '@help/ANSWER_SUCCESS',
    payload: { data },
  };
}

export function answerSaveRequest(data) {
  return {
    type: '@help/ANSWER_SAVE_REQUEST',
    payload: { data },
  };
}

export function answerSaveSuccess(data) {
  return {
    type: '@help/ANSWER_SAVE_SUCCESS',
    payload: { data },
  };
}

export function answerFailure() {
  return {
    type: '@help/ON_FAILURE',
  };
}

export function resetForm() {
  return {
    type: '@help/RESET_FORM',
  };
}
