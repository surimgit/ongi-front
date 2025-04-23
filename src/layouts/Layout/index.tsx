import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import './style.css';
import { ACCESS_TOKEN, AUTH_ABSOLUTE_PATH, CALENDAR_ABSOLUTE_PATH, COMMUNITY_BOARD_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH } from 'src/constants';
import { Board } from 'src/types/aliases';
import useSignInUser from 'src/hooks/sign-in-user.hook';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getAlertRequest } from 'src/apis';
import GetAlertResponseDto from 'src/apis/dto/response/alert/get-alert.response.dto';
import { ResponseDto } from 'src/apis/dto/response';
import Alert from 'src/types/interfaces/Alert.interface';
import { useSignInUserStore } from 'src/stores';

// interface: 알림 레코드 컴포넌트 속성 //
interface AlertItemProps {
  alert: Alert;
}

// component: 알림 테이블 레코드 컴포넌트 //
function AlertItem({ alert }: AlertItemProps) {
  const { alertContent, alertEntitySequence } = alert;

  return (
    <div>{alertContent}</div>
  )
}

// component: 공통 레이아웃 컴포넌트 //
export default function Layout() {

  // state: 경로 상태 //
  const { pathname } = useLocation();
  const [cookies] = useCookies();

  // state: nickname 상태 //
  const { nickname } = useSignInUserStore();

  // state: My Alert List 요소 참조 //
  const myAlertListRef = useRef<HTMLDivElement | null>(null);

  // state: My Alert 드롭다운 상태 //
  const [showMyAlert, setShowMyAlert] = useState<boolean>(false);

  // state: 알림 리스트 상태 //
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: 내비게이터 //
  const navigator = useNavigate();

  // function: 로그인 유저 정보 불러오기 함수 //
  const getSignInUser = useSignInUser();

  // function: get alert response 처리 함수 //
  const getAlertResponse = (responseBody: GetAlertResponseDto | ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { alerts } = responseBody as GetAlertResponseDto;
    setAlerts(alerts);
  }

  // event handler: 로그인/회원가입 버튼 클릭 이벤트 처리 //
  const onSignInUpClickHandler = () => {
    if(!accessToken) navigator(MAIN_ABSOLUTE_PATH);
    navigator(AUTH_ABSOLUTE_PATH);
  };

  // event handler: user nickname 버튼 클릭 이벤트 처리 //
  const onNicknameClickHandler = () => {
    navigator('/mypage');
  };

  // event handler: 게시판 클릭 이벤트 처리 //
  const onBoardClickHandler = (targetBoard: Board) => {
    navigator(COMMUNITY_BOARD_ABSOLUTE_PATH(targetBoard));
  };

  // event handler: 알림 아이콘 클릭 이벤트 처리 //
  const onMyAlertClickHandler = () => {
    setShowMyAlert(!showMyAlert);
    getAlertRequest(accessToken).then(getAlertResponse);
  }

  // event handler: 청년달력 클릭 이벤트 처리 //
  const onCalendarClickHandler = () => {
    navigator(CALENDAR_ABSOLUTE_PATH);
  };

  // effect: cookie의 accessToken이 변경될 시 실행할 함수 //
  useEffect(() => {
    if (!cookies[ACCESS_TOKEN]) return;
    getSignInUser();
  }, [cookies[ACCESS_TOKEN]]);

  // effect: cookie의 accessToken과 경로가 변경될 시 실행할 함수 //
  useEffect(() => {
    if (!cookies[ACCESS_TOKEN] && pathname !== MAIN_ABSOLUTE_PATH) {
      navigator(AUTH_ABSOLUTE_PATH);
      return;
    }
    getSignInUser();
  }, [cookies[ACCESS_TOKEN], pathname]);

  // effect: 알림 드롭다운 상태가 변경될 시 실행할 함수 //
  useEffect(() => {
    const onAlertDropdownHandler = (event: MouseEvent) => {
      if (myAlertListRef.current && !myAlertListRef.current.contains(event.target as Node)) {
        setShowMyAlert(false);
      }
    };
    if (!showMyAlert) return;

    document.addEventListener('mousedown', onAlertDropdownHandler);
  }, [showMyAlert]);

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
            <div className='navigation-list-item' onClick={onCalendarClickHandler}>청년달력</div>
            <div className='navigation-list-item'>마이페이지</div>
          </div>
        </div>
        <div className='my-content'>
          <div className='my-content-chat'></div>
          <div className='my-content-alert' onClick={onMyAlertClickHandler}>
            {showMyAlert &&
              <div ref={myAlertListRef} className='my-alert-list'>
                {
                  alerts.map((alert, index) =>
                  <AlertItem key={index} alert={alert} />)
                }
              </div>
            }
          </div>
          <div className='my-content-shopping-cart'></div>
          <div className='login-container'>
            <div className='login-icon'></div>
            {accessToken ? (
              <div className='login-content login' onClick={onNicknameClickHandler}>{nickname}</div>
            ) : (
              <div className='login-content logout' onClick={onSignInUpClickHandler}>로그인/회원가입</div>
            )}
          </div>
        </div>
      </div>
      <div id='main'>
        <Outlet />
      </div>
    </div>
  )
}
