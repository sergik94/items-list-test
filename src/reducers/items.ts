import { Comment } from '../types/Comment';
import { Item } from '../types/Item';

type LoadItems = {
  type: 'items/LOAD';
  payload: Item[];
};

type AddItem = {
  type: 'items/ADD';
  payload: Item;
};

type RemoveItem = {
  type: 'items/REMOVE';
  payload: Item;
};

type AddComment = {
  type: 'items-comment/ADD';
  payload: {
    activeItemId: string;
    comment: Comment;
  };
};

type Actions = LoadItems | AddItem | RemoveItem | AddComment;

export const actions = {
  load: (items: Item[]): LoadItems => ({ type: 'items/LOAD', payload: items }),
  add: (item: Item): AddItem => ({ type: 'items/ADD', payload: item }),
  addComment: (activeItemId: string, comment: Comment): AddComment => (
    { type: 'items-comment/ADD', payload: { activeItemId, comment } }
  ),
  remove:(item: Item): RemoveItem => ({ type: 'items/REMOVE', payload: item })
};

const ItemsReducer = (
  items: Item[] = [], action: Actions,
): Item[] => {
  let updatedItems = items;

  switch (action.type) {
    case 'items/LOAD':
      return action.payload;
    
    case 'items/ADD': {
      updatedItems = [...items, action.payload];

      break;
    }

    case 'items-comment/ADD': {
      updatedItems = items.map(item => {
        if (item.id === action.payload.activeItemId) {
          return {
            ...item,
            comments: [...item.comments, action.payload.comment]
          }
        }

        return item;
      });

      break;
    }

    case 'items/REMOVE':{
      updatedItems = items.filter(item => item.id !== action.payload.id);

      break;
    }

    default:
      return items;
  }

  window.localStorage.setItem('items', JSON.stringify(updatedItems));

  return updatedItems;
};

export default ItemsReducer;
