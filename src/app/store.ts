import { createStore, combineReducers } from 'redux';
import activeItemReducer from '../features/activeItem';
import ItemsReducer from '../features/items';

const rootReducer = combineReducers({
  activeItem: activeItemReducer,
  items: ItemsReducer,
});

export const store = createStore(
  rootReducer,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;