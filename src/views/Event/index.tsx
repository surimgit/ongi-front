import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import './style.css';
import { fileUploadRequest, getEventListRequest, postEventApplyRequest, postEventRequest } from 'src/apis';
import GetEventListResponseDto from 'src/apis/dto/response/event/get-event-list.response.dto';
import { ResponseDto } from 'src/apis/dto/response';
import UserEvent from 'src/types/interfaces/user-event.interface';
import { useSignInUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';

import noimage from 'src/assets/images/no-image.png';
import Modal from 'src/components/Modal';
import PostEventRequestDto from 'src/apis/dto/request/event/post-event.request.dto';

// interface: 이벤트 게시 모달 컴포넌트 속성 //
interface TypeProps {
    onClose(): void;
    children?: ReactNode;
}

// component: 이벤트 게시 모달 화면 컴포넌트 //
function UploadEvent({ onClose }: TypeProps) {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 이벤트 요소 상태 //
    const [title, setTitle] = useState<string>('');
    const [point, setPoint] = useState<number>(0);
    const [image, setImage] = useState<string | null>('');
    const [content, setContent] = useState<string>('');

    const [year, setYear] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [day, setDay] = useState<string>('');

    // state: 파일 인풋 참조 상태 //
    const fileRefs = useRef<HTMLInputElement>(null);

    // variable: access Token //
    const accessToken = cookies[ACCESS_TOKEN];

    // function: post event response 처리 함수 //
    const postEventResponse = (responseBody: ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '인증에 실패했습니다.' :
        responseBody.code === 'VF' ? '잘못된 입력입니다.' :
        responseBody.code === 'NP' ? '권한이 없습니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }
    };
    
    // event handler: 제목 변경 이벤트 처리 //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTitle(value);
    };

    // event handler: 마감일 연도 변경 이벤트 처리 //
    const onYearChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setYear(value);
    };

    // event handler: 마감일 월 변경 이벤트 처리 //
    const onMonthChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setMonth(value);
    };

    // event handler: 마감일 일 변경 이벤트 처리 //
    const onDayChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setDay(value);
    };

    // event handler: 포인트 변경 이벤트 처리 //
    const onPointChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPoint(Number(value));
    };

    // event handler: 내용 변경 이벤트 처리 //
    const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setContent(value);
    };

    // event handler: 이미지 첨부 버튼 클릭 이벤트 처리 //
    const onImageUploadClickHandler = () => {
        fileRefs.current?.click();
    };

    // event handler: 이미지 첨부 이벤트 처리 //
    const onHandleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        
        const uploadedImage = await fileUploadRequest(formData);
        setImage(uploadedImage);
        
        e.target.value = '';
    };

    // event handler: 이벤트 게시 클릭 이벤트 처리 //
    const onPostEventHandler = () => {
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        const deadline = `${year}-${formattedMonth}-${formattedDay}`;
        const requestBody: PostEventRequestDto = { 
            title: title, 
            deadline: deadline,
            neededPoint: point,
            image: image,
            content: content
        };
        postEventRequest(requestBody, accessToken).then(postEventResponse);

        onClose();
    };

    // render: 이벤트 게시 모달 화면 컴포넌트 렌더링
    return (
        <div id='event-upload-wrapper'>
            <div className='event-upload-container'>
                <div className='title-container'>
                    <span className='tc'>제목</span>
                    <input type="text" className='input-item title' placeholder='제목을 입력해주세요.' onChange={onTitleChangeHandler}/>
                </div>
                <div className='divider'></div>
                <div className='deadline-container'>
                    <span className='tc'>마감일</span>
                    <input type="text" className='input-item deadline' placeholder='년' onChange={onYearChangeHandler}/>
                    <input type="text" className='input-item deadline' placeholder='월' onChange={onMonthChangeHandler}/>
                    <input type="text" className='input-item deadline' placeholder='일' onChange={onDayChangeHandler}/>
                </div>
                <div className='divider'></div>
                <div className='point-container'>
                    <span className='tc'>포인트</span>
                    <input type="number" className='input-item point' placeholder='포인트 필요량' onChange={onPointChangeHandler}/>
                </div>
                <div className='divider'></div>
                <div className='image-container'>
                    <span className='tc'>이미지 첨부</span>
                    <div className='image-btn' onClick={onImageUploadClickHandler}>이미지 첨부</div>
                    <input 
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileRefs}
                        onChange={onHandleImageFileChange}
                    />
                    <span className='image-file'>{image?.split('/').pop()}</span>
                </div>
                <div className='divider'></div>
                <div className='content-container'>
                    <span className='tc'>내용</span>
                    <textarea className='content-item' onChange={onContentChangeHandler}></textarea>
                </div>
                <div className='btn-container'>
                    <div className='btn upload' onClick={onPostEventHandler}>게시</div>
                    <div className='btn cancel' onClick={onClose}>취소</div>
                </div>
            </div>
        </div>
    )
};

// interface: 개별 이벤트 컴포넌트 속성 //
interface EventItemProps {
    event: UserEvent;
}

// component: 개별 이벤트 컴포넌트 //
function EventItem({ event }: EventItemProps) {
    // state: 이벤트 요소 상태 //
    const { eventSequence, title, content, image, neededPoint, deadline } = event;

    // state: 로그인 사용자 아이디 상태 //
    const { userId } = useSignInUserStore();

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // variable: access Token //
    const accessToken = cookies[ACCESS_TOKEN];

    // variable: 이벤트 이미지 스타일 //
    const eventImageStyle = { backgroundImage: `url(${image ? image : noimage})`  };

    // function: post event apply response 처리 함수 //
    const postEventApplyResponse = (responseBody: ResponseDto | null) => {
        const message = 
        !responseBody ? '서버에 문제가 있습니다' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '인증에 실패했습니다.' :
        responseBody.code === 'NPO' ? '포인트가 부족합니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

        alert("신청되었습니다.");
    }

    // event handler: 이벤트 신청 클릭 이벤트 처리 //
    const onApplyClickHandler = () => {
        if (window.confirm(`신청 시 ${neededPoint} 포인트가 차감됩니다.\n신청하시겠습니까?`)) {
            const requestBody = { userId, eventSequence };
            postEventApplyRequest(requestBody, accessToken).then(postEventApplyResponse);
        }
    };

    // render: 개별 이벤트 컴포넌트 렌더링 //
    return (
        <div id='event-wrapper'>
            <div className='event-container'>
                <div className='image-box' style={eventImageStyle}></div>
                <div className='title'>{title}</div>
                <div className='divider horizontal'></div>
                <div className='event-info-container'>
                    <div className='event-info-box'>
                        <div className='deadline'>{deadline} 마감</div>
                        <div className='divider vertical'></div>
                        <div className='needed-point'>{neededPoint} P</div>
                    </div>
                    <div className='apply-btn' onClick={onApplyClickHandler}>이벤트 신청</div>

                </div>
                <div className='divider horizontal'></div>
                <div className='content'>{content}</div>
            </div>
        </div>
    )
}

// component: 이벤트 페이지 컴포넌트 //
export default function EventMain() {

    // state: 로그인 사용자 아이디 상태 //
    const { isAdmin } = useSignInUserStore();

    // state: 이벤트 목록 상태 //
    const [eventList, setEventList] = useState<UserEvent[]>([]);

    // state: 이벤트 게시 창 열림 상태 //
    const [isUploadOpen, setUploadOpen] = useState<boolean>(false);

    // function: get event list response 처리 함수 //
    const getEventListResponse = (responseBody: GetEventListResponseDto | ResponseDto | null) => {
        const message = 
        !responseBody ? '서버에 문제가 있습니다' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

        const { events } = responseBody as GetEventListResponseDto;
        setEventList(events);
    };

    // event handler: 이벤트 게시 버튼 클릭 이벤트 처리 //
    const onOpenUploadClickHandler = () => {
        setUploadOpen(true);
    };

    // event handler: 이벤트 게시 모달 화면 닫기 클릭 이벤트 처리 //
    const onCloseUploadClickHandler = () => {
        setUploadOpen(false);
    };

    // effect: 컴포넌트 렌더 시 실행 함수 //
    useEffect(() => {
        getEventListRequest().then(getEventListResponse);
    }, []);

    // render: 이벤트 페이지 컴포넌트 렌더링 //
    return (
        <div id='event-list-wrapper'>
            <div className='event-list-container'>
                {eventList.map((event, index) =>
                <EventItem key={index}
                event={event}
                />)}
            </div>
            {isAdmin &&
                <div className='btn-box'>
                    <div className='btn' onClick={onOpenUploadClickHandler}>이벤트 게시</div>
                    {isUploadOpen &&
                        <Modal
                            title='이벤트 게시'
                            onClose={onCloseUploadClickHandler}
                        >
                            <UploadEvent
                                onClose={onCloseUploadClickHandler}
                            >
                            </UploadEvent>
                        </Modal>
                    }
                </div>
            }
        </div>
    )
}
