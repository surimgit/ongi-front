import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useSignInUserStore } from 'src/stores';
import { Board, CommunityCategory } from 'src/types/aliases';
import { ACCESS_TOKEN, COMMUNITY_ABSOLUTE_PATH, COMMUNITY_OVERALL_ABSOLUTE_PATH, COMMUNITY_VIEW_ABSOLUTE_PATH } from 'src/constants';
import TextEditor from 'src/components/TextEditor';
import PatchCommunityPostRequestDto from 'src/apis/dto/request/community/patch-community-post.request.dto';
import { getCommunityPostRequest, patchCommunityPostRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import { GetCommunityPostResponseDto } from 'src/apis/dto/response/community';
import StarterKit from '@tiptap/starter-kit';

const extensions = [StarterKit];

// component: 게시글 수정 내용 화면 컴포넌트 //
export default function PostEdit() {

  // state: 경로 변수 상태 //
  const { postSequence } = useParams();

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 로그인 유저 아이디 상태 //
  const { userId } = useSignInUserStore();

  // state: 게시글 수정 내용 상태 //
  const [writerId, setWriterId] = useState<string>('');
  const [board, setBoard] = useState<Board>('');
  const [category, setCategory] = useState<CommunityCategory>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 게시글 수정 가능 여부 //
  const isActive = board !== '' && category !== '' && title !== '' && content !== '';

  // variable: 게시글 수정 버튼 클래스 //
  const editButtonClass = isActive ? 'btn edit active' : 'btn edit';

  // function: 내비게이터 함수 //
  const navigator = useNavigate();

  // function: get community post response 처리 함수 //
  const getCommunityPostResponse = (responseBody: GetCommunityPostResponseDto | ResponseDto | null) => {
      const message = 
      !responseBody ? '서버에 문제가 있습니다.'
      : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
      : responseBody.code === 'AF' ? '인증에 실패했습니다.'
      : responseBody.code === 'NPS' ? '존재하지 않는 게시물입니다.' : '';

      const isSuccess = responseBody !== null && responseBody.code === 'SU';

      if (!isSuccess) {
          alert(message);
          navigator(COMMUNITY_OVERALL_ABSOLUTE_PATH);
          return;
      }

      const { userId, board, category, title, content } = responseBody as GetCommunityPostResponseDto;
      setWriterId(userId);
      setBoard(board);
      setCategory(category);
      setTitle(title);
      setContent(content);
  };

  // function: patch community post response 함수 처리 //
  const patchCommunityPostResponse = (responseBody: ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.'
    : responseBody.code === 'NPS' ? '존재하지 않는 게시물입니다.'
    : responseBody.code === 'NP' ? '권한이 없습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    if (!postSequence) return;
    navigator(COMMUNITY_VIEW_ABSOLUTE_PATH(postSequence));
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

  // event handler: 게시글 작성 버튼 클릭 이벤트 처리 //
  const onWriteButtonClickHandler = () => {
    if(!isActive || !accessToken) return;
    
    const requestBody: PatchCommunityPostRequestDto = {
      board, category, title, content
    };

    if (!postSequence) return;

    patchCommunityPostRequest(postSequence, requestBody, accessToken).then(patchCommunityPostResponse);
  }

  // effect: 게시글 번호가 변경될 시 실행할 함수 //
  // useEffect(()=> {
  //   if (!accessToken || !postSequence) return;
  //   getCommunityPostRequest(postSequence).then(getCommunityPostResponse);
  // }, [postSequence]);

  useEffect(()=> {
    if (!accessToken || !postSequence) return;
    getCommunityPostRequest(postSequence).then(getCommunityPostResponse);
  }, []);

  // effect: 로그인 유저 아이디와 작성자 아이디가 변경될 시 실행할 함수 //
  useEffect(() => {
    if(writerId && userId && writerId !== userId) {
      alert('권한이 없습니다.');
      navigator(COMMUNITY_ABSOLUTE_PATH);
    }
  }, [writerId, userId]);

  // render: 게시글 수정 내용 화면 컴포넌트 렌더링 //
  return (
    <div id='post-write-wrapper'>
      <div className='write-header'>
        <div className='headline'>커뮤니티 게시글 수정</div>
      </div>
      <div className='write-container'>
        <div className='input-box'>
          <input className='title' value={title} placeholder='제목을 입력해 주세요.' onChange={onTitleChangeHandler}/>
        </div>
        <div className='dropbox-container'>
          <select className='select board' value={board} onChange={(event) => setBoard(event.target.value as Board)}>
            <option value="">게시판 선택</option>
            <option value="정보 게시판">정보 게시판</option>
            <option value="우리 동네 게시판">우리 동네 게시판</option>
          </select>
          <select className='select category' value={category} onChange={(event) => setCategory(event.target.value as CommunityCategory)}>
            <option value="">카테고리 선택</option>
            {board === '정보 게시판' && (
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
                <option value="정보기타">정보기타</option>
              </>
            )}
            {board === '우리 동네 게시판' && (
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
        <div className={editButtonClass} onClick={onWriteButtonClickHandler}>작성</div>
      </div>
    </div>
  )
}
