import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import HomePage from './views/HomePage';
import './App.css';
import MyPage from './views/MyPage';
import InfoCommunityMain from './views/InfoCommunity';
import CommunityLayout from './layouts/Community';
import { COMMUNITY_PATH, COMMUNITY_VIEW_PATH } from './constants';
import InfoPostDetail from './views/InfoCommunity/Detail';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/main' element={<HomePage/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route index element={<HomePage />} />


        <Route path={COMMUNITY_PATH} element={<CommunityLayout />}>
          <Route index element={<InfoCommunityMain />} />
          <Route path={COMMUNITY_VIEW_PATH}>
            <Route index element={<InfoPostDetail />} />
          </Route>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
