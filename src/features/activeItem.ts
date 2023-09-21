import { Item } from "../types/Item";

type SetItemAction = {
  type: 'activeItem/SET';
  payload: Item | null;
};

const setItem = (item: Item | null): SetItemAction => ({
  type: 'activeItem/SET',
  payload: item,
});

export const actions = { setItem };

type State = Item | null;
type Action = SetItemAction;

const activeItemReducer = (
  state: State = null,
  action: Action,
): State => {
  if (action.type === 'activeItem/SET') {
    window.localStorage.setItem('activeItem', JSON.stringify(action.payload));

    return action.payload;
  }

  return state;
};

export default activeItemReducer;
