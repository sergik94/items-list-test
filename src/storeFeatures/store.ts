import { createStore, combineReducers } from 'redux';
import activeItemReducer from '../reducers/activeItem';
import ItemsReducer from '../reducers/items';

const rootReducer = combineReducers({
  activeItem: activeItemReducer,
  items: ItemsReducer,
});

export const store = createStore(
  rootReducer,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;