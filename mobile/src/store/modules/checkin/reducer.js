import produce from 'immer';

const INITIAL_STATE = {
  checkins: [],
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@checkin/LIST_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@checkin/LIST_SUCCESS': {
        draft.checkins = action.payload;
        draft.loading = false;
        break;
      }

      case '@checkin/LIST_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
