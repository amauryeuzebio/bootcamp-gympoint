import produce from 'immer';

const INITIAL_STATE = {
  modal: false,
  order: {},
  awswerId: 0,
};

export default function help(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@help/ANSWER_SUCCESS': {
        draft.modal = true;
        draft.order = action.payload.data;
        break;
      }
      case '@help/ANSWER_SAVE_SUCCESS': {
        draft.modal = false;
        draft.order = {};
        draft.awswerId = action.payload.data;
        break;
      }
      case '@help/RESET_FORM': {
        draft.modal = false;
        draft.order = {};
        draft.awswerId = 0;
        break;
      }
      default:
    }
  });
}
