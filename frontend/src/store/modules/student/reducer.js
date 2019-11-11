import produce from 'immer';

const INITIAL_STATE = {
  form: {},
  delete: 0,
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/SAVE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/SAVE_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@student/GET_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      case '@student/DELETE_SUCCESS': {
        draft.delete = action.id;
        break;
      }
      case '@student/ON_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@student/RESET_FORM': {
        draft.form = {};
        break;
      }
      default:
    }
  });
}
