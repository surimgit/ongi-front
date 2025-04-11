import React from 'react'
import './style.css';


// component: 마이 페이지 메인 화면 컴포넌트 //
export default function MyPage() {

  // render: 마이 페이지 메인 화면 컴포넌트 렌더링 //
  return (
    <div id='mypage-main-wrapper'>
      <div className='sidebar-container'>
        <div className='button'>카테고리</div>
        <div className='categories'>
          <div className='title'>내 정보</div>
          <div className='title'>내 활동</div>
          <div className='sub-title'>내가 받은 후기
            <div className='sub-text'>도우미 후기</div>
            <div className='sub-text'>도움 받은 후기</div>
          </div>
          <div className='sub-title'>내 공동구매
            <div className='sub-text'>판매 내역</div>
            <div className='sub-text'>구매 내역</div>
            <div className='sub-text'>장바구니</div>
            <div className='sub-text'>찜한 목록</div>
          </div>
          <div className='sub-title'>도우미
            <div className='sub-text'>내가 요청한 도움</div>
            <div className='sub-text'>신청 현황</div>
            <div className='sub-text'>좋아요 누른 글</div>
          </div>
          <div className='sub-title'>커뮤니티
            <div className='sub-text'>내가 쓴 글</div>
            <div className='sub-text'>내가 쓴 댓글</div>
            <div className='sub-text'>좋아요 누른 글</div>
          </div>
          <div className='title'>고객센터</div>
        </div>
      </div>
      <div className='contents-wrapper'>
        <div className='title-area'>
          <div className='title'>마이페이지</div>
          <div className='current active'>내 정보</div>
          <div className='current'>내 활동</div>
        </div>
        <div className='correction-area'>
          <div className='correction'>정보 수정</div>
          <div className='bridge'>|</div>
          <div className='correction'>계정 설정</div>
        </div>
        <div className='body'>
          <div className='profile-area'>
            <div className='profile-container'>
              <div className='profile-image'>사진</div>
              <div className='name'>고길동</div>
            </div>
          </div>  
          <div className='user-info-area'>
            <div className='outline'>
              <div className='review-box'>
                <div className='text'>받은 후기 평점</div>
                <div className='rating'>5.0</div>
              </div>
              <div className='badge-box'>
                <div className='text'>뱃지</div>
                <div className='badge-image'>O</div>
              </div>
              <div className='achievements-box'>
                <div className='text'>업적</div>
                <div className='button-select'>✨자기소개 작성 완료</div>
                <div className='button-change'>+</div>
              </div>
            </div>
            <div className='detail'>
              <div className='personal-info-box'> 
                <div className='title-box'>
                  <div className='text'>닉네임</div>
                  <div className='text'>나이</div>
                  <div className='text'>성별</div>
                  <div className='text'>MBTI</div>
                  <div className='text'>직업</div>
                </div>
                <div className='info-box'>
                  <div className='sub-text'>고길동</div>
                  <div className='sub-text'>32</div>
                  <div className='sub-text'>남성</div>
                  <div className='sub-text'>ISTP</div>
                  <div className='sub-text'>패션 디자이너</div>
                </div>
              </div>
              <div className='specialty-box'>
                <div className='text'>#잘해요</div>
                <div className='tag-container'>
                  <div className='tag-box'>
                    <div className='tag'>#컴퓨터</div>
                    <div className='tag'>#패션</div>
                    <div className='tag'>#패션</div>
                    <div className='tag'>#패션</div>
                    <div className='tag'>#패션</div>
                  </div>
                  <div className='tag-box'>
                    <div className='tag'>#패션</div>
                    <div className='tag'>#패션</div>
                    <div className='tag'>#패션</div>
                    <div className='tag'>#패션</div>
                    <div className='tag'>#패션</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='introduce-box'>
          <div className='introduce-title'>자기소개</div>
          <div className='introduce-datail'>재산권의 행사는 공공복리에 적합하도록 하여야 한다. 국채를 모집하거나 예산외에 국가의 부담이 될 계약을 체결하려 할 때에는 정부는 미리 국회의 의결을 얻어야 한다. 대통령의 국법상 행위는 문서로써 하며, 이 문서에는 국무총리와 관계 국무위원이 부서한다. 군사에 관한 것도 또한 같다. 국가는 주택개발정책등을 통하여 모든 국민이 쾌적한 주거생활을 할 수 있도록</div>
        </div>
        
      </div>

    </div>
  )
}
