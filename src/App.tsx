import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import HomePage from './views/HomePage';
import './App.css';
import MyPage from './views/MyPage';
import InfoCommunityMain from './views/Community';
import CommunityLayout from './layouts/Community';
import { COMMUNITY_COUNTYBOARD_PATH, COMMUNITY_HOTBOARD_PATH, COMMUNITY_INFOBOARD_PATH, COMMUNITY_PATH, COMMUNITY_VIEW_PATH, COMMUNITY_WRITE_PATH } from './constants';
import InfoPostDetail from './views/Community/Detail';
import PostWrite from './views/Community/Write';
import HotBoard from './views/Community/HotBoard';
import InfoBoard from './views/Community/InfoBoard';
import CountyBoard from './views/Community/CountyBoard';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/main' element={<HomePage/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route index element={<HomePage />} />


        <Route path={COMMUNITY_PATH} element={<CommunityLayout />}>
          <Route index element={<InfoCommunityMain />} />

          <Route path={COMMUNITY_HOTBOARD_PATH}>
            <Route index element={<HotBoard />} />
          </Route>
          <Route path={COMMUNITY_INFOBOARD_PATH}>
            <Route index element={<InfoBoard />} />
          </Route>
          <Route path={COMMUNITY_COUNTYBOARD_PATH}>
            <Route index element={<CountyBoard />} />
          </Route>

          <Route path={COMMUNITY_VIEW_PATH}>
            <Route index element={<InfoPostDetail />} />
          </Route>
          <Route path={COMMUNITY_WRITE_PATH}>
            <Route index element={<PostWrite />} />
          </Route>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
