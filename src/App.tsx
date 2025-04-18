import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import { MYPAGE_ACCOUNT_PATH, MYPAGE_PATH, OTHER_MYPAGE_PATH, OTHER_MYPAGE_VIEW_PATH, PRODUCT_PATH, QUESTION_PATH, WRITE_PATH } from './constants';
import ProductWrite from './views/Product/write';
import ProductMain from './views/Product';
import MyPage from './views/MyPage';
import Auth from './views/Auth';
import Inquiry from './views/MyPage/Question';
import Others from './views/MyPage/Others';
import MyActivity from './views/MyPage/Activity';
import GroupBuying from './views/MyPage/GroupBuying';
import WishList from './views/MyPage/GroupBuying/WishList';
import Faq from './views/MyPage/Question/Faq';
import Notice from './views/MyPage/Question/Notice';
import MyReview from './views/MyPage/Activity/MyReview';
import MyNeedHelper from './views/MyPage/Activity/MyNeedHelper';
import MyCommunity from './views/MyPage/Activity/MyCommunity';
import './App.css';
import CommunityLayout from './layouts/Community';
import { COMMUNITY_COUNTYBOARD_PATH, COMMUNITY_HOTBOARD_PATH, COMMUNITY_INFOBOARD_PATH, COMMUNITY_PATH, COMMUNITY_VIEW_PATH, COMMUNITY_WRITE_PATH } from './constants';
import PostWrite from './views/Community/Write';
import CommunityMain from './views/Community';
import PostDetail from './views/Community/Detail';
import Question from './views/MyPage/Question';
import Account from './views/MyPage/Account';

function App() {
  return (
    <Routes>      
      <Route path='/auth' element={<Auth />} />
      <Route element={<Layout />}>
        <Route path={PRODUCT_PATH}>
          <Route index element={<ProductMain/>}/>
          <Route path={WRITE_PATH} element={<ProductWrite/>}/>
        </Route>
        <Route path={OTHER_MYPAGE_PATH}>
          <Route path={OTHER_MYPAGE_VIEW_PATH} index element={<Others/>} />
        </Route>
        <Route path={MYPAGE_PATH}>
          <Route index element={<MyPage/>}/>
          <Route path={MYPAGE_ACCOUNT_PATH} element={<Account/>}/>
          <Route path={QUESTION_PATH}>
            <Route index element={<Question />} />
            <Route path='faq' element={<Faq/>} />
            <Route path='notice' element={<Notice/>}/>
          </Route>
          <Route path='activity'>
            <Route index element={<MyActivity/>} />
            <Route path='my-review' element={<MyReview/>} />
            <Route path='my-needHelper' element={<MyNeedHelper/>} />
            <Route path='my-community' element={<MyCommunity/>} />
          </Route>
          <Route path={QUESTION_PATH} element={<Question/>}/>
          <Route path='group-buying' element={<GroupBuying/>}/>
          <Route path='wish-list' element={<WishList/>}/>
        </Route> 

        <Route path={COMMUNITY_PATH} element={<CommunityLayout />}>
          <Route index element={<CommunityMain />} />

          <Route path={COMMUNITY_VIEW_PATH}>
            <Route index element={<PostDetail />} />
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
