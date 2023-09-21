import { memo } from 'react';
import { Comment } from '../types/Comment';

import './Comment.scss';

type Props = {
  comment: Comment;
};

export const CommentComponent = memo(function CommentComponent({ comment }: Props) {

  console.log(comment.id);

  return (
    <li className="card__comment comment">
      <div
        className="comment__color"
        style={{
          backgroundColor: `${comment.color}`
        }}
      />

      <p className="comment__text">
        {comment.text}
      </p>
    </li>
  )
});
