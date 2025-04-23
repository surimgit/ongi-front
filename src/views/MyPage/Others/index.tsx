import React from 'react'
import './style.css';
import { useNavigate } from 'react-router';

// component: 다른 사용자 사이드바 컴포넌트 //
function OtherSidebar(){
  const navigator = useNavigate();

  const onSidebarClickHandler = (path: string) => {
    navigator(path);
  };

  return (
    <div className='sidebar-container'>
      <div className='button'>카테고리</div>
      <div className='categories'>
        <div
          className='title'
          style={{ cursor: 'pointer' }}
          onClick={() => onSidebarClickHandler('/mypage/need-helper')}
        >
          도우미
        </div>

        <div
          className='sub-title'
          style={{ cursor: 'pointer' }}
          onClick={() => onSidebarClickHandler('/mypage/review')}
        >
          후기
        </div>

        <div
          className='title'
          style={{ cursor: 'pointer' }}
          onClick={() => onSidebarClickHandler('/mypage/community')}
        >
          커뮤니티
        </div>

        <div
          className='sub-title'
          style={{ cursor: 'pointer' }}
          onClick={() => onSidebarClickHandler('/mypage/community/post')}
        >
          작성 글
        </div>

        <div
          className='title'
          style={{ cursor: 'pointer' }}
          onClick={() => onSidebarClickHandler('/mypage/group-buying')}
        >
          공동 구매
        </div>

        <div className='sub-title-group'>
          <div
            className='sub-title'
            style={{ cursor: 'pointer' }}
            onClick={() => onSidebarClickHandler('/mypage/group-buying/sell/pending')}
          >
            판매 대기
          </div>
          <div
            className='sub-title'
            style={{ cursor: 'pointer' }}
            onClick={() => onSidebarClickHandler('/mypage/group-buying/sell/completed')}
          >
            판매 완료
          </div>
          <div
            className='sub-title'
            style={{ cursor: 'pointer' }}
            onClick={() => onSidebarClickHandler('/mypage/group-buying/sell/review')}
          >
            후기
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Others() {
  return (
    <div id='others-main-wrapper'>
      <OtherSidebar/>
      <div className='contents-wrapper'>
        <div className='summary-box'>
          <div className='content'>
            <div className='title'>도우미</div>
            <div className='sub'>후기</div>
          </div>
          <div className='content'>
            <div className='title'>커뮤니티</div>
            <div className='sub'>작성글</div>
          </div>
          <div className='content buying'>
            <div className='title'>공동구매</div>
            <div className='buying-sub-box'>
              <div className='sub'>판매 대기</div>
              <span className="divider">|</span>
              <div className='sub'>판매 완료</div>
              <span className="divider">|</span>
              <div className='sub'>후기</div>
            </div>
          </div>
        </div>
        <div className='report-box'>🚩계정 신고</div>
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
