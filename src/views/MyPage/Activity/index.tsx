import React from 'react'
import './style.css'
import MypageSidebar from 'src/layouts/MypageSidebar'

export default function Activity() {
  return (
    <div id='my-activity-main-wrapper'>
      <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='title-area'>
          <div className='title'>마이페이지</div>
          <div className='current active'>내 정보</div>
          <div className='current'>내 활동</div>
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
