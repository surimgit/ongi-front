import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import './style.css';
import { ACCESS_TOKEN, AUTH_ABSOLUTE_PATH, CALENDAR_ABSOLUTE_PATH, COMMUNITY_BOARD_ABSOLUTE_PATH, COMMUNITY_VIEW_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MYPAGE_ABSOLUTE_PATH, NEEDHELPER_ABSOLUTE_PATH, NEEDHELPER_VIEW_ABSOLUTE_PATH, PRODUCT_ABSOLUTE_PATH, ROOT_PATH } from 'src/constants';
import { Board } from 'src/types/aliases';
import useSignInUser from 'src/hooks/sign-in-user.hook';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { deleteAlertRequest, getAlertRequest, patchAlertReadRequest } from 'src/apis';
import GetAlertResponseDto from 'src/apis/dto/response/alert/get-alert.response.dto';
import { ResponseDto } from 'src/apis/dto/response';
import Alert from 'src/types/interfaces/Alert.interface';
import { useSignInUserStore } from 'src/stores';

// interface: 알림 레코드 컴포넌트 속성 //
interface AlertItemProps {
  alertItem: Alert;
}

// component: 알림 테이블 레코드 컴포넌트 //
function AlertItem({ alertItem }: AlertItemProps) {
  const { alertSequence, alertContent, alertEntitySequence, alertType, readPara } = alertItem;

  // state: cookie 상태 //
  const [cookies, setCookie, removeCookie] = useCookies();

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: 내비게이터 함수 //
  const navigator = useNavigate();

  // function: patch alert read response 처리 함수 //
  const patchAlertReadResponse = (responseBody: ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }
  };

  // function: delete alert response 처리 함수 //
  const deleteAlertResponse = (responseBody: ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }
  };

  // event handler: 알림 클릭 시 이벤트 처리 //
  const onAlertClickHandler = () => {
    if (!alertEntitySequence) return;

    patchAlertReadRequest(alertSequence, accessToken).then(patchAlertReadResponse);

    switch (alertType) {
      case 'community_comment':
      case 'report_alerted':
        navigator(COMMUNITY_VIEW_ABSOLUTE_PATH(alertEntitySequence));
        break;
      case 'helper_comment':
        navigator(NEEDHELPER_VIEW_ABSOLUTE_PATH(alertEntitySequence));
        break;
      case 'helper_apply':
        navigator(NEEDHELPER_VIEW_ABSOLUTE_PATH(alertEntitySequence));
        break;
      default:
        break;
    }
  };

  // event handler: 알림 삭제 클릭 시 이벤트 처리 //
  const onAlertDeleteClickHandler = () => {
    if (!alertEntitySequence) return;

    deleteAlertRequest(alertSequence, accessToken).then(deleteAlertResponse);
  };

  // render: 알림 테이블 레코드 컴포넌트 렌더링 //
  return (
    <div className='alert-container'>
      <div className={`alert-content ${readPara ? 'read' : ''}`} onClick={onAlertClickHandler}>{alertContent}</div>
      <div className='alert-delete' onClick={onAlertDeleteClickHandler}>X</div>
    </div>
    
  )
}

// component: 공통 레이아웃 컴포넌트 //
export default function Layout() {

  // state: cookie 상태 //
  const [cookies, _, removeCookie] = useCookies();

  // state: 로그인 사용자 아이디 상태 //
  const { userId, resetSignInUser } = useSignInUserStore();

  // state: 경로 상태 //
  const { pathname } = useLocation();

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

  // function: delete all alert response 처리 함수 //
  const deleteAlertResponse = (responseBody: ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.'
    : responseBody.code === 'NP' ? '권한이 없습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }
  };

  // event handler: 로그인/회원가입 버튼 클릭 이벤트 처리 //
  const onSignInUpClickHandler = () => {
    if(!accessToken) navigator(MAIN_ABSOLUTE_PATH);
    navigator(AUTH_ABSOLUTE_PATH);
  };

  // event handler: user nickname 버튼 클릭 이벤트 처리 //
  const onNicknameClickHandler = () => {
    navigator('/mypage');
  };

  // event handler: 로그아웃 버튼 클릭 이벤트 처리 //
  const onLogoutClickHandler = () => {
    removeCookie(ACCESS_TOKEN, { path: ROOT_PATH });
    resetSignInUser();
  };

  // event handler: 게시판 클릭 이벤트 처리 //
  const onBoardClickHandler = (targetBoard: Board) => {
    navigator(COMMUNITY_BOARD_ABSOLUTE_PATH(targetBoard));
  };

  // event handler: 공구 클릭 이벤트 처리 //
  const onGroupBuyingClickHandler = () => {
    navigator(PRODUCT_ABSOLUTE_PATH);
  }

  // event handler: 도우미 클릭 이벤트 처리 //
  const onHelperClickHandler = () => {
    navigator(NEEDHELPER_ABSOLUTE_PATH);
  }

  // event handler: 알림 아이콘 클릭 이벤트 처리 //
  const onMyAlertClickHandler = () => {
    setShowMyAlert(!showMyAlert);
    getAlertRequest(accessToken).then(getAlertResponse);
  }

  // event handler: 청년달력 클릭 이벤트 처리 //
  const onCalendarClickHandler = () => {
    navigator(CALENDAR_ABSOLUTE_PATH);
  };

  // event handler: 마이페이지 버튼 클릭 이벤트 처리 //
  const onMyPageClickHandler = () => {
    navigator(MYPAGE_ABSOLUTE_PATH);
  }

  // event handler: 알림 전체 삭제 버튼 클릭 이벤트 처리 //
  const onDeleteAlertClickHandler = () => {
    deleteAlertRequest('', accessToken).then(deleteAlertResponse);
  };

  // event handler: 로고 이미지 클릭 이벤트 처리 //
  const onLogoClickHandler = () => {
    navigator(MAIN_ABSOLUTE_PATH);
  }

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
          <div className='logo' onClick={onLogoClickHandler}></div>
          <div className='navigation-list'>
            <div className='navigation-list-item' onClick={() => onBoardClickHandler('전체 글')}>커뮤니티</div>
            <div className='navigation-list-item' onClick={onGroupBuyingClickHandler}>공구</div>
            <div className='navigation-list-item' onClick={onHelperClickHandler}>도우미</div>
            <div className='navigation-list-item' onClick={onCalendarClickHandler}>청년달력</div>
            <div className='navigation-list-item' onClick={onMyPageClickHandler}>마이페이지</div>
          </div>
        </div>
        <div className='my-content'>
          <div className='my-content-chat'></div>
          <div className='my-content-alert' onClick={onMyAlertClickHandler}>
            {showMyAlert &&
              <div ref={myAlertListRef} className='my-alert-list'>
                {alerts.length > 0 &&
                  alerts.map((alert, index) =>
                  <AlertItem key={index} alertItem={alert} />)
                }
                {alerts.length > 0 &&
                  <div className='all-alert-delete' onClick={onDeleteAlertClickHandler}>전체 알림 삭제</div>
                }
                {alerts.length === 0 &&
                  <div className='no-alert'>받은 알림이 없습니다.</div>
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
      <div className='footer' onClick={onLogoutClickHandler}>로그아웃</div>
    </div>
  )
}
