import { Outlet, useNavigate } from 'react-router';
import './style.css';
import { AUTH_ABSOLUTE_PATH } from 'src/constants';


// component: 공통 레이아웃 컴포넌트 //
export default function Layout() {

  // function: 내비게이터 //
  const navigator = useNavigate();

  // event handler: 로그인/회원가입 버튼 클릭 이벤트 처리 //
  const onSignInUpClickHandler = () => {
    navigator(AUTH_ABSOLUTE_PATH);
  };

  // render: 공통 레이아웃 컴포넌트 렌더링 //
  return (
    <div id='layout-wrapper'>
      <div id='top-bar'>
        <div className='navigation'>
          <div className='logo'></div>
          <div className='navigation-list'>
            <div className='navigation-list-item'>커뮤니티</div>
            <div className='navigation-list-item'>공구</div>
            <div className='navigation-list-item'>도우미</div>
            <div className='navigation-list-item'>청년달력</div>
            <div className='navigation-list-item'>마이페이지</div>
          </div>
        </div>
        <div className='my-content'>
          <div className='my-content-chat'></div>
          <div className='my-content-alert'></div>
          <div className='my-content-shopping-cart'></div>
          <div className='login-container'>
            <div className='login-icon'></div>
            <div className='login-content' onClick={onSignInUpClickHandler}>로그인/회원가입</div>
          </div>
        </div>
      </div>
      <div id='main'>
        <Outlet />
      </div>
    </div>
  )
}
