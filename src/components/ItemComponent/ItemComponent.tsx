import { memo } from 'react';
import { Item } from '../../types/Item';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as itemsActions } from '../../features/items';
import { actions as activeItemActions } from '../../features/activeItem';

import './Item.scss';

type Props = {
  item: Item;
};

export const ItemComponent = memo(function ItemComponent({ item }: Props) {
  const activeItem = useAppSelector(state => state.activeItem);
  const items = useAppSelector(state => state.items);
  
  const dispatch = useAppDispatch();

  const setActiveItem = (item: Item) => {
    dispatch(activeItemActions.setItem(item));
  }

  const removeItem = (item: Item) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (item.id === activeItem?.id) {
      const activeItemIndex = items.findIndex(elem => elem.id === item.id);

      if (items.length === 1) {
        dispatch(activeItemActions.setItem(null));

        return;
      }

      activeItemIndex === 0
        ? dispatch(activeItemActions.setItem(items[1]))
        : dispatch(activeItemActions.setItem(items[activeItemIndex - 1]));
    }

    dispatch(itemsActions.remove(item));
  }

  return (
    <li
      className={classNames(
        'card__item',
        'item',
        { 'item--active': item.id === activeItem?.id }
      )}
      onClick={() => setActiveItem(item)}
    >
      {item.name}

      <span className="item__total">
        {item.comments.length}
      </span>

      <button
        type="button"
        className="item__delete"
        onClick={removeItem(item)}
      >
        Delete
      </button>
    </li>
  )
}, arePropsEqual);

function arePropsEqual(oldProps: Props, newProps: Props) {
  return (
    oldProps.item.comments.length === newProps.item.comments.length
  );
}