import produce from 'immer';

const INITIAL_STATE = {
  helpOrders: [],
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helpOrder/LIST_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@helpOrder/LIST_SUCCESS': {
        draft.helpOrders = action.payload;
        draft.loading = false;
        break;
      }

      case '@helpOrder/NEW_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@checkin/NEW_SUCCESS': {
        draft.helpOrders = [...state.helpOrders, action.payload];
        draft.loading = false;
        break;
      }

      case '@helpOrder/HELP_ORDER_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
