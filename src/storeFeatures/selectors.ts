import { RootState } from './store';

export const itemsSelector = (state: RootState ) => state.items;
export const activeItemSelector = (state: RootState ) => state.activeItem;
