import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, NEEDHELPER_ABSOLUTE_PATH } from 'src/constants';
import { useNavigate, useParams } from 'react-router';
import TextEditor from 'src/components/TextEditor';
import { getHelperPostRequest, patchHelperPostRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import DatePicker from 'react-datepicker';
import CalendarIcon from 'src/assets/images/calendar.png';
import { useLocationSelector } from 'src/hooks/select-box.hook';
import PostHelperRequestDto from 'src/apis/dto/request/needhelper/post-helper.request.dto';
import GetHelperPostResponseDto from 'src/apis/dto/response/needhelper/get-helper-post.response.dto';

// component: 게시글 작성 화면 컴포넌트 //
    export default function HelperEdit() {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 게시글 내용 상태 //
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [meetingType, setMeetingType] = useState("");
    const [selectDate, setSelectDate] = useState<Date | null>(null);
    const [reward, setReward] = useState<string>('');

    // state: 지역 선택 //
    const {areaList, sido, gugun, gugunList, onSidoChange, onGugunChange, setSido, setGugun } = useLocationSelector();

    // state: 대면 방식 //
    const meetingTypeValue =
    meetingType === "face" ? "대면" : meetingType === "non-face" ? "비대면" : "";

    // state: 게시글 번호 //
    const { sequence } = useParams();
    
    // state: 시도와 구군 데이터 상태 //
    const [initCity, setInitCity] = useState<string>('');
    const [initDistrict, setInitDistrict] = useState<string>('');

    // state: 작성 시각 //
    const writeTime = new Date();

    // variable: access Token //
    const accessToken = cookies[ACCESS_TOKEN];

    // variable: 게시글 작성 가능 여부 //
    const isActive = title !== '' && content !== '';

    // function: 내비게이터 함수 //
    const navigator = useNavigate();

    // function: post helper response 처리 함수 //
    const postHelperResponse = (responseBody: ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        };
    };

    // event handler: 체크박스 클릭 처리
    const onMettingTypeChangeHandler = (type: string) => {
        setMeetingType((prev) => (prev === type ? "" : type));
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

    // event handler: 게시글 취소 버튼 클릭 이벤트 처리 //
    const onCancleButtonClickHandler = () => {
        navigator(NEEDHELPER_ABSOLUTE_PATH);
    };

    // event handler: 게시글 작성 버튼 클릭 이벤트 처리 //
    const onWriteButtonClickHandler = () => {
        if (!isActive || !accessToken || !meetingTypeValue) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
    
        const requestBody: PostHelperRequestDto = {
            title,
            content,
            meetingType: meetingTypeValue,
            city: sido,
            district: gugun,
            schedule: selectDate ? selectDate.toISOString() : '', // 날짜 없을 때는 빈값
            reward,
            date: writeTime.toISOString()
        };
    
        patchHelperPostRequest(requestBody, Number(sequence), accessToken).then((response) => {
            postHelperResponse(response);
            if (response && response.code === 'SU') {
                navigator(NEEDHELPER_ABSOLUTE_PATH);
            }
        });
    };
    
    // effect: 수정화면 로드 시 기존 값 받아오기 //
    useEffect(() => {
        if (!sequence || !accessToken) return;
      
        getHelperPostRequest(Number(sequence), accessToken).then(response => {
            if (!response || response.code !== "SU") return;
        
            const data = response as GetHelperPostResponseDto;
    
            setTitle(data.title);
            setContent(data.content);
            setMeetingType(data.meetingType === "대면" ? "face" : "non-face");
            setSelectDate(new Date(data.schedule));
            setReward(data.reward);
    
            setSido(data.city); // 바로 상태를 강제로 셋팅
            setGugun(data.district); // 바로 상태를 강제로 셋팅
        });
    }, []);
    
    

    // render: 게시글 작성 화면 컴포넌트 렌더링 //
    return (
    <div id='helper-write-wrapper'>
        <div className='write-header'>
        <div className='headline'>도우미 게시글 수정</div>
        </div>
        <div className='write-container'>
        <div className='input-box'>
            <input className='title' value={title} placeholder='제목을 입력해 주세요.' onChange={onTitleChangeHandler}/>
        </div>
        <div className="option-container">
            <div className="option-metting-type">
            <div className="sub-title">만남 방식</div>
            <div className="option-check-box">
                <div className="face-to-face">
                <input
                    type="checkbox"
                    checked={meetingType === "face"}
                    onChange={() => onMettingTypeChangeHandler("face")}
                />
                대면
                </div>
                <div className="non-face-to-face">
                <input
                    type="checkbox"
                    checked={meetingType === "non-face"}
                    onChange={() => onMettingTypeChangeHandler("non-face")}
                />
                비대면
                </div>
            </div>
            </div>
            <div className="vertical-bar">|</div>
            <div className="option-location-select">
            <div className="sub-title">지역</div>
            <div className="option-location-box">
                <select className='select-box' value={sido} onChange={onSidoChange}>
                    {areaList.map((sido, index) => (
                        <option key={index} value={sido}>{sido}</option>
                    ))}
                </select>
                <select className='select-box' value={gugun} onChange={onGugunChange}>
                    {gugunList.map((gugun, index) => (
                        <option key={index} value={gugun}>{gugun}</option>
                    ))}
                </select>
            </div>
            </div>
            <div className="vertical-bar">|</div>
            <div className='option-date-enter'>
                <div className="sub-title">일시</div>
                <div className="date-wrapper">
                    <DatePicker
                        selected={selectDate}                
                        onChange={(date) => setSelectDate(date)}
                        className='date-input'
                        showTimeSelect 
                        dateFormat="yyyy-MM-dd HH:mm" 
                        portalId="root-portal"
                    />
                    <img src={CalendarIcon} />
                </div>
            </div>
            <div className="vertical-bar">|</div>
            <div className="option-amount-enter">
                <div className="sub-title">급여</div>
                <div className="option-salary-box">
                    <div className="min">
                    <input type="text" placeholder="금액을 입력하세요." 
                    value={reward} onChange={(e) => setReward(e.target.value)} />
                    </div>
                    원
                </div>
            </div>
        </div>
        <div className='input-box'>
            <TextEditor content={content} setContent={onContentChangeHandler} />
        </div>
        
        </div>
        <div className='button-box'>
        <div className='btn cancel' onClick={onCancleButtonClickHandler}>취소</div>
        <div className='btn write' onClick={onWriteButtonClickHandler}>수정</div>
        </div>
    </div>
    )
}
