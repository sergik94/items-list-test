import { Item } from "../../types/Item";
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from "../../storeFeatures/hooks";
import { actions as itemsActions } from '../../reducers/items';
import { actions as activeItemActions } from '../../reducers/activeItem';

type Props = {
  item: Item;
}

export default function ItemComponent({ item }: Props) {
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
      key={item.id}
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
}
