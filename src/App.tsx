import { useEffect } from 'react';
import './App.scss';
import { CommentsCard } from './components/CommentsCard/CommentsCard';
import ItemsCard from './components/ItemsCard/ItemsCard';
import Sidebar from './components/Sidebar/Sidebar';
import { Item } from './types/Item';
import { actions as itemsActions } from './features/items';
import { actions as activeItemActions } from './features/activeItem';
import { useAppDispatch } from './app/hooks';
import { generateItemId } from './functions/generateItemId';

function App() {
  const dispatch = useAppDispatch();

  const getItemsFromStorage = () => {
    if (!window.localStorage.getItem('items')) {
      const id = generateItemId();

      console.log(id)
      const initItem: Item = {
        id,
        name: 'Initial Item',
        comments: [{
          id: id + '-0',
          text: 'Initial Comment',
          color: '#000000',
        }]
      };

      dispatch(itemsActions.add(initItem));
      dispatch(activeItemActions.setItem(initItem))
    } else {
      const storagedItems = JSON.parse(window.localStorage
        .getItem('items') || '[]') as Item[];
      const activeItem = JSON.parse(window.localStorage
        .getItem('activeItem') || '') as Item | null;

      dispatch(itemsActions.load(storagedItems));
      dispatch(activeItemActions.setItem(activeItem));
    }
  }

  useEffect(() => {
    getItemsFromStorage();
  }, []);

  return (
    <div className="app container">
      <div className="app__contant">
        <Sidebar />

        <main className="app__main main">
          <ItemsCard />

          <CommentsCard />
        </main>
      </div>
    </div>
  );
}

export default App;
