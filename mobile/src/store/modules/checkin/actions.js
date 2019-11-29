export function checkinListRequest(id) {
  return {
    type: '@checkin/LIST_REQUEST',
    payload: {id},
  };
}

export function checkinListSuccess(checkin) {
  return {
    type: '@checkin/LIST_SUCCESS',
    payload: checkin,
  };
}

export function checkinListFailure() {
  return {
    type: '@checkin/LIST_FAILURE',
  };
}
