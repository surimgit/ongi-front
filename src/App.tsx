import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import HomePage from './views/HomePage';
import './App.css';
import MyPage from './views/MyPage';
import Inquiry from './views/MyPage/Inquiry';
import Others from './views/MyPage/Others';
import MyActivity from './views/MyPage/Activity';
import Setting from './views/MyPage/Setting';
import GroupBuying from './views/MyPage/GroupBuying';
import WishList from './views/MyPage/GroupBuying/WishList';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/main' element={<HomePage/>}/>
        <Route path='/others'>
          <Route index element={<Others/>} />
        </Route>
        <Route path='/mypage'>
          <Route index element={<MyPage/>}/>
          <Route path='inquiry' element={<Inquiry/>}/>
          <Route path='activity' element={<MyActivity/>}/>
          <Route path='setting' element={<Setting/>}/>
          <Route path='group-buying' element={<GroupBuying/>}/>
          <Route path='wish-list' element={<WishList/>}/>
        </Route> 
      </Route>
    </Routes>
  );
}

export default App;
