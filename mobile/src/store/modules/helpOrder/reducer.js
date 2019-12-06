import produce from 'immer';

const INITIAL_STATE = {
  helpOrders: [],
  totalPages: 1,
  loading: false,
  refresh: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helpOrder/LIST_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@helpOrder/LIST_SUCCESS': {
        draft.helpOrders = [...draft.helpOrders, ...action.payload.helpOrders];
        draft.totalPages = action.payload.totalPages;
        draft.loading = false;
        break;
      }

      case '@helpOrder/NEW_REQUEST': {
        draft.loading = true;
        draft.refresh = true;
        break;
      }

      case '@helpOrder/NEW_SUCCESS': {
        // draft.helpOrders = [...state.helpOrders, action.payload];
        draft.helpOrders = [];
        draft.loading = false;
        draft.refresh = false;
        break;
      }

      case '@helpOrder/ORDER_ANSWER_SUCCESS': {
        const helpOrders = [];

        state.helpOrders.map(help => {
          if (help.id === action.payload.id) {
            helpOrders.push({
              ...help,
              answer_at: action.payload.answer_at,
              answer: action.payload.answer,
              dateFormattedAnswerAt: action.payload.dateFormattedAnswerAt,
              dateFormattedCreatedAt: action.payload.dateFormattedCreatedAt,
            });
          } else {
            helpOrders.push(help);
          }
        });

        draft.helpOrders = helpOrders;

        break;
      }

      case '@helpOrder/HELP_ORDER_FAILURE': {
        draft.loading = false;
        draft.refresh = false;
        break;
      }

      case '@helpOrder/HELP_ORDER_RESET': {
        draft.helpOrders = [];
        break;
      }

      default:
    }
  });
}
