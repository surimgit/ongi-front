import { Routes, Route, useNavigate, Outlet } from 'react-router';
import Layout from './layouts/Layout';
import './App.css';
import { ADDRESS_PATH, PAYMENTS_PATH, MAIN_ABSOLUTE_PATH, PRODUCT_PATH, PRODUCT_VIEW_PATH, 
    SHOPPING_CART_PATH, WRITE_PATH, MYPAGE_ACCOUNT_PATH, MYPAGE_PATH, OTHER_MYPAGE_PATH, OTHER_MYPAGE_VIEW_PATH, QUESTION_PATH, NEEDHELPER_PATH, 
    MAIN_PATH,
    MY_GROUPBUYING_PATH,
    MY_GROUPBUYING_WISH_LIST_PATH,
    MY_REVIEW_PATH,
    MY_NEEDHELLPER_PATH,
    MY_NEEDHELLPER_ASK_PATH,
    MY_NEEDHELLPER_LIKED_PATH,
    MY_NEEDHELLPER_APPLY_PATH,
    MY_COMMUNITY_PATH,
    FAQ_PATH,
    NOTICE_PATH,
    MY_GROUPBUYING_BUY_PATH} from './constants';
import NeedHelper from './views/NeedHelper';
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
import Faq from './views/MyPage/Faq';
import Notice from './views/MyPage/Notice';
import MyReview from './views/MyPage/Activity/MyReview';
// import NeedHelper from './views/MyPage/Activity/MyNeedHelper';
import MyNeedHelper from './views/MyPage/Activity/MyNeedHelper';
import MyCommunity from './views/MyPage/Activity/MyCommunity';
import './App.css';
import CommunityLayout from './layouts/Community';
import { COMMUNITY_COUNTYBOARD_PATH, COMMUNITY_HOTBOARD_PATH, COMMUNITY_INFOBOARD_PATH, COMMUNITY_PATH, COMMUNITY_VIEW_PATH, COMMUNITY_WRITE_PATH } from './constants';
import PostWrite from './views/Community/Write';
// import HotBoard from './views/Community/HotBoard';
// import InfoBoard from './views/Community/InfoBoard';
// import CountyBoard from './views/Community/CountyBoard';
import { useEffect } from 'react';
import Main from './views/Main';
import SuccessPage from './views/TossPayment/SuccessPage';
import FailPage from './views/TossPayment/FailPage';
import CheckoutPage from './views/TossPayment/CheckoutPage';
import ShoppingCart from './views/ShoppingCart';
import CommunityMain from './views/Community';
import PostDetail from './views/Community/Detail';
import ShoppingCartAddress from './views/ShoppingCart/Address';
import Question from './views/MyPage/Question';
import Account from './views/MyPage/Account';
import WishLists from './views/MyPage/GroupBuying/WishList';



function App() {
  return (
    <Routes>      
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
          <Route index element={<ProductMain />} />
          <Route path={WRITE_PATH} element={<ProductWrite />} />
          <Route path={PRODUCT_VIEW_PATH} element={<DetailProduct />} />
        </Route>

        <Route path={SHOPPING_CART_PATH}>
          <Route index element={<ShoppingCart/>}></Route>
          <Route path={ADDRESS_PATH} element={<ShoppingCartAddress/>}/>
        </Route>
        <Route path={OTHER_MYPAGE_PATH}>
          <Route path='user' element={<Others/>} />
        </Route>
        <Route path={MYPAGE_PATH}>          
          <Route index element={<MyPage/>}/>
          <Route path={MYPAGE_ACCOUNT_PATH} element={<Account/>}/>
          <Route path={MY_GROUPBUYING_PATH}>
            <Route path={MY_GROUPBUYING_BUY_PATH} element={<GroupBuying/>} />
            <Route path={MY_GROUPBUYING_WISH_LIST_PATH} element={<WishLists/>} />
            <Route path='my-needHelper' element={<MyNeedHelper/>} />
            <Route path='my-community' element={<MyCommunity/>} />
          </Route>
          <Route path={MY_REVIEW_PATH}>
            <Route index element={<MyReview/>} />
          </Route>
          <Route path={MY_NEEDHELLPER_PATH}>
            <Route path={MY_NEEDHELLPER_ASK_PATH} element={<MyNeedHelper/>} />
            <Route path={MY_NEEDHELLPER_APPLY_PATH} element={<MyNeedHelper/>} />
            <Route path={MY_NEEDHELLPER_LIKED_PATH} element={<MyNeedHelper/>} />
          </Route>
          <Route path={MY_COMMUNITY_PATH}>
            <Route path={MY_NEEDHELLPER_ASK_PATH} element={<MyCommunity/>} />
            <Route path={MY_NEEDHELLPER_APPLY_PATH} element={<MyCommunity/>} />
            <Route path={MY_NEEDHELLPER_LIKED_PATH} element={<MyCommunity/>} />
          </Route>
          <Route path={QUESTION_PATH} element={<Question/>}/>
          <Route path={FAQ_PATH} element={<Faq/>} />
          <Route path={NOTICE_PATH} element={<Notice/>}/>
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
