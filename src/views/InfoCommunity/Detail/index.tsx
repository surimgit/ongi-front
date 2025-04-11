import React, { useEffect } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';

// component: 커뮤니티 글 상세 화면 컴포넌트 //
export default function InfoPostDetail() {

    // state: 경로 변수 상태 //
    const { postNumber } = useParams();

    // function: 내비게이터 함수 //
    const navigator = useNavigate();

    // effect: 컴포넌트 로드 시 실행할 함수 //
    useEffect(() => {
        if (!postNumber) {
            navigator(`http://localhost:3000/community`);
            return;
        }
        
    }, []);

    // render: 커뮤니티 글 상세 화면 컴포넌트 렌더링 //
    return (
        <div id='post-detail-wrapper'>
            <div className='detail-container'>
                <div className='title-container'>
                    <div className='upper-title-bar'></div>
                    <div className='title'>제모옥</div>
                    <div className='post-info'> 
                    </div>
                </div>
                <div className='divider'></div>
                <div className='contents-container'>내요오옹</div>
            </div>
        </div>
    )
}
