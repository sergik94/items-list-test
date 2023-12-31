import { memo } from 'react';
import { Item } from '../../types/Item';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../storeFeatures/hooks';
import { actions as itemsActions } from '../../reducers/items';
import { actions as activeItemActions } from '../../reducers/activeItem';
import { itemsSelector, activeItemSelector } from '../../storeFeatures/selectors';

import './Item.scss';

type Props = {
  item: Item;
};

export const ItemComponent = memo(function ItemComponent({ item }: Props) {
  const activeItem = useAppSelector(activeItemSelector);
  const items = useAppSelector(itemsSelector);
  
  const dispatch = useAppDispatch();

  const setActiveItem = () => {
    dispatch(activeItemActions.setItem(item));
  }

  const removeItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    dispatch(itemsActions.remove(item));

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
  }

  return (
    <li
      className={classNames(
        'card__item',
        'item',
        { 'item--active': item.id === activeItem?.id }
      )}
      onClick={setActiveItem}
    >
      {item.name}

      <span className="item__total">
        {item.comments.length}
      </span>

      <button
        type="button"
        className="item__delete"
        onClick={removeItem}
      >
        Delete
      </button>
    </li>
  )
});
