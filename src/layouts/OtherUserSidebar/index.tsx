import React from 'react';
import { useNavigate, useParams } from 'react-router';
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
      { name: '후기', subPath: 'review'}
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
      { name: '판매 대기', subPath: 'selling' },
      { name: '판매 완료', subPath: 'selled' },
      { name: '후기', subPath: 'review' }
    ]
  }
];

// component: 다른 사용자 사이드바 컴포넌트 //
export default function OtherSidebar() {
  const navigator = useNavigate();

  const onNavigate = (subPath: string) => {
    navigator(`${subPath}`);
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
                    className='sub-title'
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
