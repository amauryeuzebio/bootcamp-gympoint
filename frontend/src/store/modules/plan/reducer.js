import produce from 'immer';

const INITIAL_STATE = {
  form: {},
  delete: 0,
  loading: false,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/SAVE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/SAVE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@plan/GET_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      case '@plan/DELETE_SUCCESS': {
        draft.delete = action.id;
        break;
      }
      case '@plan/ON_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@plan/RESET_FORM': {
        draft.form = {};
        break;
      }
      default:
    }
  });
}
