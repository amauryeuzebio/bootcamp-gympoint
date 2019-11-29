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

export function checkinRequest(id) {
  return {
    type: '@checkin/NEW_REQUEST',
    payload: {id},
  };
}

export function checkinSuccess(checkin) {
  return {
    type: '@checkin/NEW_SUCCESS',
    payload: checkin,
  };
}

export function checkinFailure() {
  return {
    type: '@checkin/CHECKIN_FAILURE',
  };
}
