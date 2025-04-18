import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import './style.css';
import { ACCESS_TOKEN, AUTH_ABSOLUTE_PATH, COMMUNITY_BOARD_ABSOLUTE_PATH } from 'src/constants';
import { Board } from 'src/types/aliases';
import useSignInUser from 'src/hooks/sign-in-user.hook';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';


// component: 공통 레이아웃 컴포넌트 //
export default function Layout() {

  // state: cookie 상태 //
  const [cookies, _, removeCookie] = useCookies();

  // state: 경로 상태 //
  const { pathname } = useLocation();

  // function: 내비게이터 //
  const navigator = useNavigate();

  // function: 로그인 유저 정보 불러오기 함수 //
  const getSignInUser = useSignInUser();

  // event handler: 로그인/회원가입 버튼 클릭 이벤트 처리 //
  const onSignInUpClickHandler = () => {
    navigator(AUTH_ABSOLUTE_PATH);
  };

  // event handler: 게시판 클릭 이벤트 처리 //
  const onBoardClickHandler = (targetBoard: Board) => {
    navigator(COMMUNITY_BOARD_ABSOLUTE_PATH(targetBoard));
  };

  // effect: cookie의 accessToken이 변경될 시 실행할 함수 //
  useEffect(() => {
    if (!cookies[ACCESS_TOKEN]) return;
    getSignInUser();
  }, [cookies[ACCESS_TOKEN]]);

  // effect: cookie의 accessToken과 경로가 변경될 시 실행할 함수 //
  useEffect(() => {
    if (!cookies[ACCESS_TOKEN]) {
      navigator(AUTH_ABSOLUTE_PATH);
      return;
    }
    getSignInUser();
  }, [cookies[ACCESS_TOKEN], pathname]);

  // render: 공통 레이아웃 컴포넌트 렌더링 //
  return (
    <div id='layout-wrapper'>
      <div id='top-bar'>
        <div className='navigation'>
          <div className='logo'></div>
          <div className='navigation-list'>
            <div className='navigation-list-item' onClick={() => onBoardClickHandler('전체 글')}>커뮤니티</div>
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
