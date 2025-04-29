import React from 'react'
import './style.css'
import MypageSidebar from 'src/layouts/MypageSidebar'
import { useNavigate } from 'react-router'
import { MYPAGE_ABSOLUTE_PATH } from 'src/constants';

export default function Activity() {

  // function: 네비게이터 함수 //
  const navigator = useNavigate();


  // event handler: 내 정보 버튼 클릭 이벤트 처리 //
    const onMyInfoButtonClickHandler = () => {
      navigator(MYPAGE_ABSOLUTE_PATH);
    }

  return (
    <div id='my-activity-main-wrapper'>
      <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='title-area'>
          <div className='title'>마이페이지</div>
          <div className='current' onClick={onMyInfoButtonClickHandler}>내 정보</div>
          <div className='current active'>내 활동</div>
        </div>  
        <div className='body'>
          <div className='my-container'>
            <div className='title'>내가 받은 후기</div>
            <div className='category-container'>
              <div className='category-box'>
                <div className='category'>• 도우미 후기</div>
                <div className='category-number'>13개</div>
              </div>
              <div className='category-box'>
                <div className='category'>• 도움 받은 후기</div>
                <div className='category-number'>5개</div>
              </div>
            </div>
          </div>
          <div className='my-container'>
            <div className='title'>내 공동구매</div>
            <div className='category-container'>
              <div className='category-box'>
                <div className='category'>• 장바구니 상품</div>
                <div className='category-number'>6개</div>
              </div>
              <div className='category-box'>
                <div className='category'>• 찜한 상품 수</div>
                <div className='category-number'>13개</div>
              </div>
            </div>
          </div>
          <div className='my-container'>
            <div className='title'>내 커뮤니티</div>
            <div className='category-container'>
              <div className='category-box'>
                <div className='category'>• 내가 쓴 게시글</div>
                <div className='category-number'>7개</div>
              </div>
              <div className='category-box'>
                <div className='category'>• 내 댓글</div>
                <div className='category-number'>30개</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
