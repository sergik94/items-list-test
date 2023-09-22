import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../storeFeatures/hooks";
import { actions as itemsActions } from '../../reducers/items';
import { actions as activeItemActions } from '../../reducers/activeItem';
import { generateItemId } from '../../functions/generateItemId';
import { ItemComponent } from '../ItemComponent/ItemComponent';
import { itemsSelector } from '../../storeFeatures/selectors';

export default function ItemsCard() {
  const items = useAppSelector(itemsSelector);
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [existingIds, setExistingIds] = useState(
    items.map(item => item.id)
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const id = generateItemId(existingIds);
    const newItem = { name, id, comments: [] };

    dispatch(itemsActions.add(newItem));
    setName('');
    setExistingIds(currIds => [...currIds, id]);

    if (items.length === 0) {
      dispatch(activeItemActions.setItem(newItem));
    }
  }

  return (
    <div className="main__card card">
      <h1 className="card__title main__items-title">
        Items
      </h1>

      <form className="card__item-form form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="card__input form__textline"
          placeholder="Type name here..."
          required
          onChange={handleInputChange}
          value={name}
        />
        <button
          className="card__input card__item-button form__button"
          type="submit"
        >
          Add New
        </button>
      </form>

      <ul className="card__list">
        {items.map(item => (
          <ItemComponent key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}
