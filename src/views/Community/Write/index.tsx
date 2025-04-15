import React, { useState } from 'react';
import './style.css';
import { CommunityCategory, BoardType } from 'src/types/aliases';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import TextEditor from 'src/components/TextEditor';
import { info } from 'console';
import { InfoBoardCategoryOptions  } from 'src/types/aliases/info-board-category.alias';
import { CountyBoardCategoryOptions } from 'src/types/aliases/county-board-category.alias';

// component: 게시글 작성 화면 컴포넌트 //
export default function PostWrite() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 게시글 내용 상태 //
  const [category, setCategory] = useState<CommunityCategory | ''>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // state: 선택한 게시판 상태 //
  const [boardType, setBoardType] = useState<BoardType>('info');
  
  // state: 선택한 카테고리 상태 //
  const [categories, setCategories] = useState('');

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 현재 시각 //
  const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

  // variable: 게시글 작성 가능 여부 //
  const isActive = category !== '' && title !== '' && content !== '';

  // variable: 게시글 작성 버튼 클래스 //
  const writeButtonClass = isActive ? '' : '';

  // variable: 게시판 별 카테고리 맵핑 //
  const categoryOptions: Record<BoardType, { value: string; label: string }[]> = {
    info: InfoBoardCategoryOptions,
    county: CountyBoardCategoryOptions,
  };

  // function: 내비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 내용 변경 이벤트 처리 //
  const onContentChangeHandler = (content: string) => {
    setContent(content);
  };

  // render: 게시글 작성 화면 컴포넌트 렌더링 //
  return (
    <div id='post-write-wrapper'>
      <div className='write-header'>
        <div className='headline'>커뮤니티 게시글 작성</div>
      </div>
      <div className='write-container'>
        <div className='input-box'>
          <input className='title' placeholder='제목을 입력해 주세요.'/>
        </div>
        <div className='dropbox-container'>
          <select className='select board' value={boardType} onChange={(e) => {setBoardType(e.target.value as BoardType); setCategory('');}}>
            <option value="info">정보 게시판</option>
            <option value="county">우리 동네 게시판</option>
          </select>
          <select className='select category' value={categories} onChange={(e) => setCategories(e.target.value)}>
            <option value="">카테고리 선택</option>
            {categoryOptions[boardType].map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className='input-box'>
          <TextEditor content={content} setContent={onContentChangeHandler} />
        </div>
      </div>
      <div className='button-box'>
        <div className='btn cancel'>취소</div>
        <div className='btn write'>작성</div>
      </div>
      
    </div>
  )
}
