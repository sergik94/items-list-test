import { Comment } from './Comment';

export interface Item {
  name: string;
  id: string;
  comments: Comment[];
}
