import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import './style.css';

interface SidebarItem {
  title: string;
  path: string;
  children?: { name: string; subPath: string }[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: '도우미',
    path: 'need-helper',
    children:[
      { name: '요청 게시글', subPath: ''}
    ]
  },
  {
    title: '커뮤니티',
    path: 'community',
    children: [
      { name: '작성 글', subPath: 'post' }
    ]
  },
  {
    title: '공동 구매',
    path: 'group-buying',
    children: [
      { name: '판매 물품', subPath: '' },
    ]
  }
];

// component: 다른 사용자 사이드바 컴포넌트 //
export default function OtherSidebar() {
  const navigator = useNavigate();
  const { userId } = useParams();  
  const location = useLocation();


  const isActive = (path: string) => location.pathname.endsWith(`/${path}`);


  const onNavigate = (subPath: string) => {
    navigator(`/mypage/other/${userId}/${subPath}`);  
  };
  
  return (
    <div className='other-sidebar-container'>
      <div className='button'>카테고리</div>
      <div className='categories'>
        {sidebarItems.map((item, idx) => (
          <div key={idx}>
            <div
              className='title'
            >
              {item.title}
            </div>
            {item.children && (
              <div className='sub-title-group'>
                {item.children.map((child, subIdx) => (
                <div
                  key={subIdx}
                  className={`sub-title ${isActive(`${item.path}/${child.subPath}`) ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onNavigate(`${item.path}/${child.subPath}`)}
                >
                  {child.name}
                </div>
              ))} 
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
