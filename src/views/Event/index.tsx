import React, { useEffect, useState } from 'react';
import './style.css';
import { getEventListRequest, postEventApplyRequest } from 'src/apis';
import GetEventListResponseDto from 'src/apis/dto/response/event/get-event-list.response.dto';
import { ResponseDto } from 'src/apis/dto/response';
import UserEvent from 'src/types/interfaces/user-event.interface';
import { useSignInUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';

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
                <div className='image-box'></div>
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

    // state: 이벤트 목록 상태 //
    const [eventList, setEventList] = useState<UserEvent[]>([]);

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

    // effect: 컴포넌트 렌더 시 실행 함수 //
    useEffect(() => {
        getEventListRequest().then(getEventListResponse);
    }, []);

    // render: 이벤트 페이지 컴포넌트 렌더링 //
    return (
        <div id='event-list-wrapper'>
            {eventList.map((event, index) =>
            <EventItem key={index}
            event={event}
            />)}
        </div>
    )
}
