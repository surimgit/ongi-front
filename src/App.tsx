import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import HomePage from './views/HomePage';
import './App.css';
import InfoCommunityMain from './views/InfoCommunity';
import CommunityLayout from './layouts/Community';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />


        <Route path='/info-community-main' element={<CommunityLayout />}>
          <Route index element={<InfoCommunityMain />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
