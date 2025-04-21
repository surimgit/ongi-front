import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import './App.css';
import { ADDRESS_PATH, PAYMENTS_PATH, PRODUCT_PATH, PRODUCT_VIEW_PATH, SHOPPING_CART_PATH, WRITE_PATH } from './constants';
import { NEEDHELPER_PATH } from './constants';
import NeedHelper from './views/NeedHelper';
import { PRODUCT_PATH, PRODUCT_VIEW_PATH, SHOPPING_CART_PATH, WRITE_PATH } from './constants';
import ProductWrite from './views/Product/write';
import ProductMain from './views/Product';
import DetailProduct from './views/Product/detail';
import MyPage from './views/MyPage';
import Auth from './views/Auth';
import Inquiry from './views/MyPage/Inquiry';
import Others from './views/MyPage/Others';
import MyActivity from './views/MyPage/Activity';
import Setting from './views/MyPage/Setting';
import GroupBuying from './views/MyPage/GroupBuying';
import WishList from './views/MyPage/GroupBuying/WishList';
import Faq from './views/MyPage/Inquiry/Faq';
import Notice from './views/MyPage/Inquiry/Notice';
import MyReview from './views/MyPage/Activity/MyReview';
import NeedHelper from './views/MyPage/Activity/MyNeedHelper';
import MyNeedHelper from './views/MyPage/Activity/MyNeedHelper';
import MyCommunity from './views/MyPage/Activity/MyCommunity';
import './App.css';
import CommunityLayout from './layouts/Community';
import { COMMUNITY_COUNTYBOARD_PATH, COMMUNITY_HOTBOARD_PATH, COMMUNITY_INFOBOARD_PATH, COMMUNITY_PATH, COMMUNITY_VIEW_PATH, COMMUNITY_WRITE_PATH } from './constants';
import PostWrite from './views/Community/Write';
import HotBoard from './views/Community/HotBoard';
import InfoBoard from './views/Community/InfoBoard';
import CountyBoard from './views/Community/CountyBoard';
import SuccessPage from './views/TossPayment/SuccessPage';
import FailPage from './views/TossPayment/FailPage';
import CheckoutPage from './views/TossPayment/CheckoutPage';
import ShoppingCart from './views/ShoppingCart';
import CommunityMain from './views/Community';
import PostDetail from './views/Community/Detail';

function App() {
  
  return (
    <Routes>      
      <Route path='/auth' element={<Auth />} />
      
      <Route path={PAYMENTS_PATH} element={<CheckoutPage/>}/>
      <Route path='success' element={<SuccessPage/>}/>
      <Route path='fail' element={<FailPage/>}/>
   
      <Route element={<Layout />}>
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
        <Route path='/others'>
          <Route index element={<Others/>} />
        </Route>
        <Route path='/mypage'>
          <Route index element={<MyPage/>}/>
          <Route path='inquiry'>
            <Route index element={<Inquiry />} />
            <Route path='faq' element={<Faq/>} />
            <Route path='notice' element={<Notice/>}/>
          </Route>
          <Route path='activity'>
            <Route index element={<MyActivity/>} />
            <Route path='my-review' element={<MyReview/>} />
            <Route path='my-needHelper' element={<MyNeedHelper/>} />
            <Route path='my-community' element={<MyCommunity/>} />
          </Route>
          <Route path='setting' element={<Setting/>}/>
          <Route path='group-buying' element={<GroupBuying/>}/>
          <Route path='wish-list' element={<WishList/>}/>
        </Route> 
        <Route path='/mypage' element={<MyPage/>}/>
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
