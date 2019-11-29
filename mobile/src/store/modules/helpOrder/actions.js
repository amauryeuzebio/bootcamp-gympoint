export function helpOrderListRequest(id) {
  return {
    type: '@helpOrder/LIST_REQUEST',
    payload: {id},
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

export function helpOrderFailure() {
  return {
    type: '@helpOrder/HELP_ORDER_FAILURE',
  };
}
