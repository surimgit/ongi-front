import { Routes, Route, useNavigate } from 'react-router';
import Layout from './layouts/Layout';

import './App.css';
import { ADDRESS_PATH, PAYMENTS_PATH, PRODUCT_PATH, PRODUCT_VIEW_PATH, SHOPPING_CART_PATH, WRITE_PATH } from './constants';
import { MYPAGE_ACCOUNT_PATH, MYPAGE_PATH, OTHER_MYPAGE_PATH, OTHER_MYPAGE_VIEW_PATH, QUESTION_PATH } from './constants';
import { COMMUNITY_EDIT_PATH, REPORT_PATH } from './constants';
import { NEEDHELPER_PATH } from './constants';
import NeedHelper from './views/NeedHelper';
import { MAIN_ABSOLUTE_PATH, MAIN_PATH, PRODUCT_VIEW_PATH, SHOPPING_CART_PATH } from './constants';
import ProductWrite from './views/Product/write';
import ProductMain from './views/Product';
import DetailProduct from './views/Product/detail';
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
import { COMMUNITY_PATH, COMMUNITY_VIEW_PATH, COMMUNITY_WRITE_PATH } from './constants';
import PostWrite from './views/Community/Write';
import { useEffect } from 'react';
import Main from './views/Main';
import SuccessPage from './views/TossPayment/SuccessPage';
import FailPage from './views/TossPayment/FailPage';
import CheckoutPage from './views/TossPayment/CheckoutPage';
import ShoppingCart from './views/ShoppingCart';
import CommunityMain from './views/Community';
import PostDetail from './views/Community/Detail';
import Question from './views/MyPage/Question';
import Account from './views/MyPage/Account';
import PostEdit from './views/Community/Edit';
import ReportBoard from './views/Report';


function App() {
  
  return (
    <Routes> 
      <Route index element={<Index />} />     
      <Route path='/auth' element={<Auth />} />
      
      <Route path={PAYMENTS_PATH} element={<CheckoutPage/>}/>
      <Route path='success' element={<SuccessPage/>}/>
      <Route path='fail' element={<FailPage/>}/>
   
      <Route element={<Layout />}>
        <Route path={MAIN_PATH}>
            <Route index element={<Main />}/>
        </Route>
        <Route path={NEEDHELPER_PATH}>
          <Route index element={<NeedHelper />} />
        </Route>
        <Route path={PRODUCT_PATH}>
          <Route index element={<ProductMain/>}/>
          <Route path={WRITE_PATH} element={<ProductWrite/>}/>
          <Route path={PRODUCT_VIEW_PATH} element={<DetailProduct/>}/>
        </Route>
        <Route path={SHOPPING_CART_PATH}>
          <Route index element={<ShoppingCart/>}></Route>
          <Route path={ADDRESS_PATH} element={<ShoppingCartAddress/>}/>
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
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path={COMMUNITY_PATH} element={<CommunityLayout />}>
          <Route index element={<CommunityMain />} />
          <Route path={COMMUNITY_VIEW_PATH}>
            <Route index element={<PostDetail />} />
            <Route path={COMMUNITY_EDIT_PATH}>
              <Route index element={<PostEdit />} />
            </Route>
          </Route>
          <Route path={COMMUNITY_WRITE_PATH}>
            <Route index element={<PostWrite />} />
          </Route>
        </Route>
        <Route path={REPORT_PATH} element={<CommunityLayout />}>
          <Route index element={<ReportBoard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

// component: Root 경로 컴포넌트 //
function Index() {

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 컴포넌트가 렌더링될 때 실행할 함수 //
  useEffect(()=> {
    navigator(MAIN_ABSOLUTE_PATH);
  }, []);

  return null;
}
