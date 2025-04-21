import { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import AuthPage from 'src/types/aliases/auth-page.alias';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'src/apis/dto/response';
import { IdCheckRequestDto, SendVerificationRequestDto, SignUpRequestDto, VerificationRequestDto, ResignedCheckRequestDto } from 'src/apis/dto/request/auth';
import { idCheckRequest, sendVerifyCodeRequest, signUpRequest, verifyCodeRequest, resignedCheckRequest } from 'src/apis';
import axios from 'axios';
import { useNavigate } from 'react-router';

interface Props {
    onPageChange: (page: AuthPage) => void;
}

export default function SignUp(props: Props){

    // state: cookie 상태 //
    const [cookies, _, removeCookie] = useCookies();

    // state: 페이지 상태 //
    const { onPageChange } = props;

    // state: navigate 상태 //
    const navigator = useNavigate();

    // state: 필수입력값 상태 //
    const [userId, setUserId] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [telNumber, setTelNumber] = useState<string>('');

    // state: 필수입력값 메시지 상태 //
    const [userIdMessage, setUserIdMessage] = useState<string>('');
    const [userPasswordMessage, setUserPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    const [nicknameMessage, setNicknameMessage] = useState<string>('');
    const [telNumberMessage, setTelNumberMessage] = useState<string>('');
    const [verificationMessage, setVerificationMessage] = useState<string>('');

    // state: 사용자 아이디 메세지 에러 상태 //
    const [userIdMessageError, setUserIdMessageError] = useState<boolean>(false);
    // state: 인증번호 확인 메세지 에러 상태 //
    const [verificationMessageError, setVerificationMessageError] = useState<boolean>(false);

    // state: 사용자 아이디 중복 확인 상태//
    const [isUserIdChecked, setUserIdChecked] = useState<boolean>(false);
    // state: 사용자 비밀번호 확인 상태 //
    const [userPasswordCheck, setUserPasswordCheck] = useState<string>('');
    // state: 사용자 비밀번호 패턴 일치 상태 //
    const [isUserPasswordChecked, setUserPasswordChecked] = useState<boolean>(false);
    
    // state: 휴대전화 번호 인증 요청 상태//
    const [isCodeSended, setCodeSended] = useState<boolean>(false);
    // state: 휴대전화 번호 인증 확인 상태//
    const [verificationCheck, setVerificationCheck] = useState<string>('');

    // state: 인증번호 유효시간 상태 //
    const [timeLeft, setTimeLeft] = useState<number>(0); // 남은 시간 (초 단위)
    const [timerActive, setTimerActive] = useState<boolean>(false); // 타이머 실행 여부

    
    // variable: 중복 확인 버튼 활성화 //
    const isUserIdCheckButtonActive = userId !== '';
    // variable: 회원가입 버튼 활성화 //
    const isSignUpButtonActive = 
    userId && userPassword && userPasswordCheck && nickname && gender && telNumber && 
    isUserIdChecked && isUserPasswordChecked && verificationCheck;
    // variable: 회원가입 버튼 클래스 //
    const signUpButtonClass = `button ${isSignUpButtonActive ? 'primary' : 'disable'} fullwidth`;

    // function: timeLeft mm:SS 표시 함수 //
    const formatTime = (second: number): string => {
        const min = Math.floor(second/60).toString().padStart(2,'0');
        const sec = (second % 60).toString().padStart(2,'0');
        return `${min}:${sec}`;
    }

    // variable: 인증버튼 변화 //
    const isResend = timeLeft === 0 && isCodeSended;
    const verificationButtonText = isResend ? '재인증' : (timeLeft > 0 ? formatTime(timeLeft) : '인증');


    // function: id check response 처리 함수 //
    const idCheckResponse = (responseBody: ResponseDto | null) => {
        const message= 
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.':
        responseBody.code === 'VF' ? '아이디를 입력하세요':
        responseBody.code === 'EU' ? '이미 존재하는 아이디입니다.' :
        '사용 가능한 아이디입니다.';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';

        setUserIdMessage(message);
        setUserIdMessageError(!isSuccess);
        setUserIdChecked(isSuccess);
    };

    // function: sign up response 처리 함수 //
    const signUpResponse = (responseBody: ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
            responseBody.code === 'EU' ? '이미 사용중인 아이디입니다.' :
            responseBody.code === 'VF' ? '모두 입력해주세요.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            if(responseBody && responseBody.code === 'EU') {
                setUserIdMessage(message);
                return;
            } alert(message);
            return;
        }

        onPageChange('sign-in');
    };

    // event handler: 로고 클릭 이벤트 처리 //
    const onLogoClickHandler = () => {
        navigator('/main');
    };

    // event handler: 사용자 아이디 변경 이벤트 처리 //
    const onUserIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setUserId(value);

        const regexp = /^[a-zA-Z0-9]{6,20}$/;
        const isMatch = regexp.test(value);
        const message = isMatch ? '' : '영문, 숫자를 사용하여 6 ~ 20자 입력해주세요';
        setUserIdChecked(false);
        setUserIdMessage(message);
        setUserIdMessageError(true);
    };
        
    // event handler: 비밀번호 유효성 검사 이벤트 처리 //
    const onUserPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserPassword(value);

        const regexp = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,13}$/;
        const isMatch = regexp.test(value);
        const message = isMatch ? '' : '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요';
        setUserPasswordMessage(message);
        setUserPasswordChecked(isMatch);
    };

    // event handler: 사용자 비밀번호 확인 변경 이벤트 처리 //
    const onUserPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserPasswordCheck(value);

        if(value !== userPassword) {
            setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordCheckMessage('');
        }
    };

    // event handler: 사용자 이름 변경 이벤트 처리 //
    const onUserNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNickname(value);

        setNicknameMessage('');
    }

    // event handler: 사용자 휴대전화 번호 변경 이벤트 처리 //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTelNumber(value);

        setTelNumberMessage('');
    }

    // event handler: 사용자 인증번호 변경 이벤트 처리 //
    const onVerificationCodeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setVerificationCheck(value);
        
        setVerificationMessage('');
    }

    // event handler: 중복 확인 버튼 클릭 이벤트 처리 //
    const onCheckUserIdClickHandler = () => {
        if (!isUserIdCheckButtonActive) return;
        
        const requestBody: IdCheckRequestDto = { userId };
        idCheckRequest(requestBody).then(idCheckResponse);
    };

    // event handler: 휴대전화 번호 인증 버튼 클릭 이벤트 처리 //
    const onVerificationClickHandler = async () => {
        if (!telNumber) {
          setTelNumberMessage('전화번호를 입력해주세요.');
          return;
        }
      
        try {
          const requestBody: ResignedCheckRequestDto = { telNumber };
          await resignedCheckRequest(requestBody)

          const VerificationRequest: SendVerificationRequestDto = { telNumber };
          await sendVerifyCodeRequest(VerificationRequest.telNumber);
      
          setTimeLeft(180);
          setTimerActive(true);
          setCodeSended(true);
          setVerificationMessage('');
        } catch (error: any) {
          if (error.message === 'RESIGNED_USER') {
            setTelNumberMessage('강제 탈퇴자입니다.');
            return;
          }
      
          console.error("인증 요청 실패:", error);
          setTelNumberMessage('알 수 없는 오류가 발생했습니다.');
        }
      };
      
    

    // event handler: 인증 확인 버튼 클릭 이벤트 처리 //
    const onCheckVerificationClickHandler = async () => {
        if(!verificationCheck) setVerificationMessage('인증번호를 입력해주세요.');

        const requestBody: VerificationRequestDto = {
            telNumber: telNumber, 
            code: verificationCheck
        };

        try{
            const isValid = await verifyCodeRequest(requestBody);

            if(isValid) {
                setVerificationMessage('인증되었습니다.');
                setVerificationMessageError(false);
            } else {
                setVerificationMessage('인증 번호를 확인해주세요.');
                setVerificationMessageError(true);
            }
        } catch(error){
            console.error("인증 요청 실패:", error);
        }
        
    }
    
    // event handler: 회원가입 버튼 클릭 이벤트 처리 //
    const onSignUpClickHandler = () => {
        if(!userId) setUserIdMessage('아이디를 입력해주세요.');
        if(!userPassword) setUserPasswordMessage('비밀번호를 입력해주세요.');
        if(!nickname) setNicknameMessage('별명을 입력해주세요.');
        if(!telNumber) setTelNumberMessage('전화번호를 입력해주세요.');
        if(!verificationCheck) setVerificationMessage('인증번호를 확인해주세요.');
        if(!isUserIdChecked) setUserIdMessage('아이디 중복 여부를 확인해주세요.');
        if(!isSignUpButtonActive) return;

        const requestBody: SignUpRequestDto = {
            userId, userPassword, nickname, gender, telNumber
        };
        signUpRequest(requestBody).then(signUpResponse);
    };

    // effect: 인증버튼 클릭 시 타이머 기능 //
    useEffect(()=>{
        if(!timerActive || timeLeft <= 0) return;

        const timer = setInterval(()=> {
            setTimeLeft((prev) => {
                if(prev <= 1) {
                    clearInterval(timer);
                    setTimerActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timerActive, timeLeft]);

    return (
        <div id='auth-sign-up-container'>
            <div className='header'>
                <div className='logo' onClick={onLogoClickHandler}></div>
            </div>
            <div className='main'>
                
                <div className="signup-input-wrapper">
                    <div className="signup-input-group-oneline">
                    <input type="text" className="id-input" placeholder="아이디"
                            value={userId as string}
                            onChange={onUserIdChangeHandler} />
                    <button className="check-button" onClick={onCheckUserIdClickHandler}>중복 확인</button>
                    </div>
                    {userIdMessage && (
                        <div className={userIdMessageError ? 'error-message' : 'success-message'}>
                        {userIdMessage}
                        </div>
                    )}
                </div>

                <div className="signup-input-wrapper">
                    <div className='signup-input-group'>
                    <input type='password' placeholder='비밀번호'
                            value={userPassword as string}
                            onChange={onUserPasswordChangeHandler} />
                    </div>
                    {userPasswordMessage && <div className='error-message'>{userPasswordMessage}</div>}
                </div>

                <div className="signup-input-wrapper">
                    <div className='signup-input-group'>
                    <input type='text' placeholder='비밀번호 확인'
                            value={userPasswordCheck as string}
                            onChange={onUserPasswordCheckChangeHandler} />
                    </div>
                    {passwordCheckMessage && <div className='error-message'>{passwordCheckMessage}</div>}
                </div>

                <div className="signup-input-wrapper">
                    <div className='signup-input-group'>
                    <input type='text' placeholder='닉네임'
                            value={nickname as string}
                            onChange={onUserNicknameChangeHandler} />
                    </div>
                    {nicknameMessage && <div className='error-message'>{nicknameMessage}</div>}
                </div>

                <div className="gender-select">
                    <label className='gender-label'>성별</label>
                    <input type="radio" id="male" name="gender" value="남" hidden onChange={(e) => setGender(e.target.value)}/>
                    <label htmlFor="male" className="gender-btn">남</label>

                    <input type="radio" id="female" name="gender" value="여" hidden onChange={(e) => setGender(e.target.value)}/>
                    <label htmlFor="female" className="gender-btn">여</label>
                </div>

                <div className="signup-input-wrapper">
                <div style={{ fontWeight: 700, marginBottom: '10px' }}>휴대전화 번호</div>
                    <div className='signup-input-group-oneline'>
                    <input type="text" className="tel-number-input" placeholder="-, 공백 제외한 11자리 숫자"
                            value={telNumber}
                            onChange={onTelNumberChangeHandler} />
                    <button className="check-button" onClick={onVerificationClickHandler}>{verificationButtonText}</button>
                    </div>
                    {telNumberMessage && <div className='error-message'>{telNumberMessage}</div>}
                </div>

                <div className="signup-input-wrapper">
                    <div className='signup-input-group-oneline'>
                    <input type='text' placeholder='인증번호 입력'
                            value={verificationCheck}
                            onChange={onVerificationCodeChangeHandler} />
                    <button className='check-button' onClick={onCheckVerificationClickHandler}>확인</button>
                    </div>
                    {verificationMessage && (
                        <div className={verificationMessageError ? 'error-message' : 'success-message'}>
                        {verificationMessage}
                        </div>
                    )}
                </div>

                <button className='submit-button' onClick={onSignUpClickHandler}>회원가입</button>
                </div>
            </div>
    )
}