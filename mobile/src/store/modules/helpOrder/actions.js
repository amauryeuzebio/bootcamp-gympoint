export function helpOrderListRequest(data) {
  return {
    type: '@helpOrder/LIST_REQUEST',
    payload: {data},
  };
}

export function helpOrderListSuccess(helpOrder) {
  return {
    type: '@helpOrder/LIST_SUCCESS',
    payload: helpOrder,
  };
}

export function helpOrderRequest(data) {
  return {
    type: '@helpOrder/NEW_REQUEST',
    payload: data,
  };
}

export function helpOrderSuccess(helpOrder) {
  return {
    type: '@helpOrder/NEW_SUCCESS',
    payload: helpOrder,
  };
}

export function orderAnswerRequest(helpOrder) {
  return {
    type: '@helpOrder/ORDER_ANSWER_REQUEST',
    payload: helpOrder,
  };
}

export function orderAnswerSuccess(helpOrder) {
  return {
    type: '@helpOrder/ORDER_ANSWER_SUCCESS',
    payload: helpOrder,
  };
}

export function helpOrderFailure() {
  return {
    type: '@helpOrder/HELP_ORDER_FAILURE',
  };
}

export function helpOrderReset() {
  return {
    type: '@helpOrder/HELP_ORDER_RESET',
  };
}
