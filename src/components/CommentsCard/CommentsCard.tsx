import { useState } from 'react';
import { useAppSelector, useAppDispatch } from "../../storeFeatures/hooks";
import { actions as itemsActions } from '../../reducers/items';
import { actions as activeItemActions } from '../../reducers/activeItem';
import { Comment } from '../../types/Comment';
import { CommentComponent } from '../CommentComponent/CommentComponent';
import { activeItemSelector } from '../../storeFeatures/selectors';

export function CommentsCard() {
  const activeItem = useAppSelector(activeItemSelector);
  const dispatch = useAppDispatch();
  const [color, setColor] = useState('#000000');
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newComment: Comment = {
      id: activeItem?.id + '-' + activeItem?.comments.length,
      text,
      color,
    };

    if (activeItem) {
      const updatedItem = {
        ...activeItem,
        comments: [...activeItem.comments, newComment]
      }
      dispatch(itemsActions.addComment(activeItem.id, newComment));
      dispatch(activeItemActions.setItem(updatedItem));
    }

    setText('');
    setColor('#000000');
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.currentTarget.value)
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value)
  };

  return (
    <div className="main__card card">
      <h1 className="card__title main__comments-title">
        Comments #{activeItem?.id}
      </h1>

      <ul className="card__list">
        {activeItem?.comments.map(comment => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </ul>

      <form className="card__comments-form form" onSubmit={handleSubmit}>
        <input
          type="color"
          className="card__input form__color"
          value={color}
          onChange={handleColorChange}
        />

        <textarea
          className="card__input form__textarea"
          placeholder="Type comment here..."
          required
          spellCheck="false"
          value={text}
          onChange={handleTextChange}
        />
        <button
          type="submit"
          className="card__input card__comments-button form__button"
        >
          Add New
        </button>
      </form>
    </div>
  )
}
