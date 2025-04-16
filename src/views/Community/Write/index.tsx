import React, { ChangeEvent, useState } from 'react';
import './style.css';
import { CommunityCategory, BoardType } from 'src/types/aliases';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, COMMUNITY_ABSOLUTE_PATH } from 'src/constants';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import TextEditor from 'src/components/TextEditor';
import PostCommunityRequestDto from 'src/apis/dto/request/community/post-community.request.dto';
import { postCommunityRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';

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

  // function: 내비게이터 함수 //
  const navigator = useNavigate();

  // function: post community response 처리 함수 //
  const postCommunityResponse = (responseBody: ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    navigator(COMMUNITY_ABSOLUTE_PATH);
  };

  // event handler: 제목 변경 이벤트 처리 //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
};

  // event handler: 내용 변경 이벤트 처리 //
  const onContentChangeHandler = (content: string) => {
    setContent(content);
  };

  // event handler: 게시판 선택 이벤트 처리 //
  const onBoardSelectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value as BoardType;
    setBoardType(selected);
    setCategory('');
    console.log(selected);
  };

  // event handler: 게시글 작성 버튼 클릭 이벤트 처리 //
  const onWriteButtonClickHandler = () => {
    if(!isActive || !accessToken) return;
    
    const requestBody: PostCommunityRequestDto = {
      category, title, content
    };

    postCommunityRequest(requestBody, accessToken).then(postCommunityResponse);
  }

  // render: 게시글 작성 화면 컴포넌트 렌더링 //
  return (
    <div id='post-write-wrapper'>
      <div className='write-header'>
        <div className='headline'>커뮤니티 게시글 작성</div>
      </div>
      <div className='write-container'>
        <div className='input-box'>
          <input className='title' value={title} placeholder='제목을 입력해 주세요.' onChange={onTitleChangeHandler}/>
        </div>
        <div className='dropbox-container'>
          <select className='select board' value={boardType} onChange={onBoardSelectHandler}>
            <option value="info">정보 게시판</option>
            <option value="county">우리 동네 게시판</option>
          </select>
          <select className='select category' value={category} onChange={(event) => setCategory(event.target.value as CommunityCategory)}>
            <option value="">카테고리 선택</option>
            {boardType === 'info' && (
              <>
                <option value="공부">공부</option>
                <option value="미용">미용</option>
                <option value="여행">여행</option>
                <option value="영화/드라마">영화/드라마</option>
                <option value="운동">운동</option>
                <option value="자취꿀팁">자취꿀팁</option>
                <option value="재테크">재테크</option>
                <option value="패션">패션</option>
                <option value="핫딜">핫딜</option>
                <option value="정보기타타">정보기타</option>
              </>
            )}
            {boardType === 'county' && (
              <>
                <option value="동네생활">동네생활</option>
                <option value="모임">모임</option>
                <option value="우리동네기타">우리동네기타</option>
              </>
            )}
          </select>
        </div>
        <div className='input-box'>
          <TextEditor content={content} setContent={onContentChangeHandler} />
        </div>
      </div>
      <div className='button-box'>
        <div className='btn cancel'>취소</div>
        <div className='btn write' onClick={onWriteButtonClickHandler}>작성</div>
      </div>
      
    </div>
  )
}
