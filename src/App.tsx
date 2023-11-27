import { useEffect } from 'react';
import './App.scss';
import { CommentsCard } from './components/CommentsCard/CommentsCard';
import ItemsCard from './components/ItemsCard/ItemsCard';
import Sidebar from './components/Sidebar/Sidebar';
import { Item } from './types/Item';
import { actions as itemsActions } from './reducers/items';
import { actions as activeItemActions } from './reducers/activeItem';
import { useAppDispatch } from './storeFeatures/hooks';
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

  const doTestRequest = async () => {
    const BASE_URL = 'http://ec2-34-192-33-253.compute-1.amazonaws.com/api/';
    const res = await fetch(BASE_URL + 'masters/men').then((res) => res.json())

    console.log(res);
  }

  useEffect(() => {
    getItemsFromStorage();
    doTestRequest();
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
