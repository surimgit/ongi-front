import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import HomePage from './views/HomePage';
import './App.css';
import { GROUP_PURCHASE_PATH } from './constants';
import GroupPurchaseMain from './views/GroupPurchase';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path={GROUP_PURCHASE_PATH}>
          <Route index element={<GroupPurchaseMain/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
