import { Routes, Route } from 'react-router';
import Layout from './layouts/Layout';
import './App.css';
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
import MyCommunity from './views/MyPage/Activity/MyCommunity';import './App.css';
import InfoCommunityMain from './views/Community';
import CommunityLayout from './layouts/Community';
import { COMMUNITY_COUNTYBOARD_PATH, COMMUNITY_HOTBOARD_PATH, COMMUNITY_INFOBOARD_PATH, COMMUNITY_PATH, COMMUNITY_VIEW_PATH, COMMUNITY_WRITE_PATH } from './constants';
import InfoPostDetail from './views/Community/Detail';
import PostWrite from './views/Community/Write';
import HotBoard from './views/Community/HotBoard';
import InfoBoard from './views/Community/InfoBoard';
import CountyBoard from './views/Community/CountyBoard';
import SuccessPage from './views/TossPayment/SuccessPage';
import FailPage from './views/TossPayment/FailPage';
import CheckoutPage from './views/TossPayment/CheckoutPage';
import ShoppingCart from './views/ShoppingCart';

function App() {
  
  return (
    <Routes>      
      <Route path='/auth' element={<Auth />} />
      
      <Route path='/payments' element={<CheckoutPage/>}/>
      <Route path='success' element={<SuccessPage/>}/>
      <Route path='fail' element={<FailPage/>}/>
    
      

      <Route element={<Layout />}>
        <Route path={PRODUCT_PATH}>
          <Route index element={<ProductMain/>}/>
          <Route path={WRITE_PATH} element={<ProductWrite/>}/>
          <Route path={PRODUCT_VIEW_PATH} element={<DetailProduct/>}/>
        </Route>
        <Route path={SHOPPING_CART_PATH}>
          <Route index element={<ShoppingCart/>}></Route>
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
