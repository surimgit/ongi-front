import React from 'react'
import { useLocation, useNavigate } from 'react-router';
import './style.css'

export default function MypageSidebar() {


  // function: 네비게이터 함수 //
  const navigator = useNavigate();
  
  // function:  use Location 함수 //
  const location = useLocation();

  // variable: 사이드바 아이템 베이스 클래스//
  class BaseItem {
    type: 'title' | 'sub-title';
    label: string;
  
    constructor(type: 'title' | 'sub-title', label: string) {
      this.type = type;
      this.label = label;
    }
  }

  // variable: 사이드바 타이틀 클래스 //
  class TitleItem extends BaseItem {
    path: string;
    constructor(label: string, path: string) {
      super('title', label)
      this.path = path;
    }
  }
  
  // variable: 사이드바 서브 텍스트 클래스 //
  class SubTextItem {
    label: string;
    path: string;
    state?: 'helper' | 'helped';
  
    constructor(label: string, path: string, state?: 'helper' | 'helped') {
      this.label = label;
      this.path = path;
      this.state = state;
    }
  }

  // variable: 사이드바 서브 타이틀 아이템 클래스 //
  class SubTitleItem extends BaseItem {
    children: SubTextItem[];
  
    constructor(label: string, children: SubTextItem[]) {
      super('sub-title', label);
      this.children = children;
    }
  }

  // variable: 사이드바 메뉴 아이템 //
  const menuItems: (TitleItem | SubTitleItem)[] = [
    new TitleItem('내 정보', '/mypage'),
    new TitleItem('내 활동', '/mypage/account'),
    new SubTitleItem('내가 받은 후기', [
      new SubTextItem('도우미 후기', '/mypage/review', 'helper'),
      new SubTextItem('도움 받은 후기', '/mypage/review', 'helped'),
    ]),
    new SubTitleItem('내 공동구매', [
      new SubTextItem('판매 내역', '/mypage/group-buying/sell'),
      new SubTextItem('구매 내역', '/mypage/group-buying/buy'),
      new SubTextItem('장바구니', '/mypage/group-buying/wish-list'),
      new SubTextItem('찜한 목록', '/mypage/group-buying/wish-list'),
    ]),
    new SubTitleItem('도우미', [
      new SubTextItem('내가 요청한 도움', '/mypage/need-helper/ask'),
      new SubTextItem('신청 현황', '/mypage/need-helper/apply'),
      new SubTextItem('좋아요 누른 글', '/mypage/need-helper/liked'),
    ]),
    new SubTitleItem('커뮤니티', [
      new SubTextItem('내가 쓴 글', '/mypage/community/post'),
      new SubTextItem('내가 쓴 댓글', '/mypage/community/comment'),
      new SubTextItem('좋아요 누른 글', '/mypage/community/liked'),
    ]),
    new SubTitleItem('고객센터',[
      new SubTextItem('문의사항', '/mypage/question'),
      new SubTextItem('FAQ', '/mypage/faq'),
      new SubTextItem('공지사항', '/mypage/notice'),
    ]),
  ];


  // event handler: 사이드바 클릭 이벤트 처리 //
  const onSidebarClickHandler = (path: string, state?: 'helper' | 'helped') => {
    navigator(path, state ? { state: { type: state } } : undefined);
  };

  // event handler: 현재 위치가 일치하는지 확인하는 이벤트 처리
  const isActive = (path: string) => location.pathname === path;

  return (
    <div id='sidebar-container'>
    <div className='button'>카테고리</div>
    <div className='categories'>
    {menuItems.map((item, index) => {
          if (item instanceof TitleItem) {
            return( <div
            key={index}
            className={`title ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => onSidebarClickHandler(item.path)}
          >
            {item.label}
          </div>
            );
          }
          if (item instanceof SubTitleItem) {
            return (
              <div key={index} className='sub-title'>
                {item.label}
                {item.children.map((child, cIndex) => (
                  <div
                    key={cIndex}
                    className={`sub-text ${isActive(child.path) ? 'active' : ''}`}
                    onClick={() => onSidebarClickHandler(child.path, child.state)}
                  >
                    {child.label}
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
    </div>
  </div>
  )
}
