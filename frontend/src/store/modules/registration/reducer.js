import produce from 'immer';

const INITIAL_STATE = {
  form: {},
  delete: 0,
  loading: false,
};

export default function registration(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registration/SAVE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@registration/SAVE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@registration/GET_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      case '@registration/DELETE_SUCCESS': {
        draft.delete = action.id;
        break;
      }
      case '@registration/ON_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@registration/RESET_FORM': {
        draft.form = {};
        break;
      }
      default:
    }
  });
}
