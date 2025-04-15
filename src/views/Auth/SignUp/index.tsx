import { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import AuthPage from 'src/types/aliases/auth-page.alias';
import { useCookies } from 'react-cookie';

interface Props {
    onPageChange: (page: AuthPage) => void;
}

export default function SignUp(props: Props){

    const { onPageChange } = props;

    const [cookies, _, removeCookie] = useCookies();

    return (
        <div id='auth-sign-up-container'>
            <div className='header'>
                <div className='logo'></div>
            </div>
            <div className='main'>
                <div className='form-group'>
                    <input type='text' placeholder='아이디'/>
                    <button>중복 확인</button>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='비밀번호'/>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='비밀번호 확인'/>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='이름'/>
                </div>
                <div className="gender-select">
                    <input type="radio" id="male" name="gender" value="남" hidden />
                    <label htmlFor="male" className="gender-btn">남</label>

                    <input type="radio" id="female" name="gender" value="여" hidden />
                    <label htmlFor="female" className="gender-btn">여</label>
                </div>
                <div className='form-group'>
                    <label>휴대전화 번호</label>
                    <input type='text' placeholder='- 제외한 11자리 숫자'/>
                    <button>인증</button>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='인증번호 입력'/>
                    <button>확인</button>
                </div>
                <button className='submit-button'>회원가입</button>
            </div>

        </div>
    )
}