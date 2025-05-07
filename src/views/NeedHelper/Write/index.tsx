import React, { ChangeEvent, useState } from 'react';
import './style.css';
import { Board, CommunityCategory } from 'src/types/aliases';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, COMMUNITY_CATEGORY_ABSOLUTE_PATH } from 'src/constants';
import { useNavigate } from 'react-router';
import TextEditor from 'src/components/TextEditor';
import PostCommunityRequestDto from 'src/apis/dto/request/community/post-community.request.dto';
import { postCommunityRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';

// component: 게시글 작성 화면 컴포넌트 //
    export default function HelperWrite() {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 게시글 내용 상태 //
    const [board, setBoard] = useState<Board | ''>('');
    const [category, setCategory] = useState<CommunityCategory | ''>('');
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    // state: 선택된 시/도
    const [city, setCity] = useState("");

    // state: 선택된 시/군/구
    const [district, setDistrict] = useState("");

    // state: 선택된 만남 방식
    const [meetingType, setMeetingType] = useState("");

    // variable: access Token //
    const accessToken = cookies[ACCESS_TOKEN];

    // variable: 게시글 작성 가능 여부 //
    const isActive = category !== '' && title !== '' && content !== '';

    // variable: 더미 지역 데이터 //
    const DUMMY_REGIONS: Record<string, string[]> = {
      서울특별시: ["강남구", "강북구", "마포구"],
      경기도: ["수원시", "성남시", "용인시"],
      부산광역시: ["해운대구", "중구", "사하구"],
    };

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

    if (!category) return;
    navigator(COMMUNITY_CATEGORY_ABSOLUTE_PATH(board, category));
    };

    // event handler: 체크박스 클릭 처리
    const onMettingTypeChangeHandler = (type: string) => {
        setMeetingType((prev) => (prev === type ? "" : type));
    };

    // event handler: 시/도 선택 이벤트 처리 //
    const onCitySelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const city = e.target.value;
        setCity(city);
        setDistrict("");
    };

    // event handler: 시/군/구 선택 이벤트 처리 //
    const onDistrictSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setDistrict(e.target.value);
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

    const requestBody: PostCommunityRequestDto = {
        board, category, title, content
    };

    postCommunityRequest(requestBody, accessToken).then(postCommunityResponse);
    }

    // render: 게시글 작성 화면 컴포넌트 렌더링 //
    return (
    <div id='helper-write-wrapper'>
        <div className='write-header'>
        <div className='headline'>도우미 게시글 작성</div>
        </div>
        <div className='write-container'>
        <div className='input-box'>
            <input className='title' value={title} placeholder='제목을 입력해 주세요.' onChange={onTitleChangeHandler}/>
        </div>
        <div className='input-box'>
            <TextEditor content={content} setContent={onContentChangeHandler} />
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
            {/* // todo: DB 작업 후 다시 */}
            <div className="option-location-select">
            <div className="sub-title">지역</div>
            <div className="option-location-box">
                <div className="city">
                <select value={city} onChange={onCitySelectHandler}>
                    <option value="">시/도 선택</option>
                    {Object.keys(DUMMY_REGIONS).map((cityName) => (
                    <option key={cityName} value={cityName}>
                        {cityName}
                    </option>
                    ))}
                </select>
                </div>
                <div className="district">
                <select
                    value={district}
                    onChange={onDistrictSelectHandler}
                    disabled={!city}
                >
                    <option value="">시/군/구 선택</option>
                    {city &&
                    DUMMY_REGIONS[city].map((districtName: string) => (
                        <option key={districtName} value={districtName}>
                        {districtName}
                        </option>
                    ))}
                </select>
                </div>
            </div>
            </div>
            <div className="vertical-bar">|</div>
            <div className="option-amount-enter">
            <div className="sub-title">급여</div>
            <div className="option-salary-box">
                <div className="min">
                <input type="text" placeholder="금액을 입력하세요." />
                </div>
                원 이상
            </div>
            </div>
        </div>
        </div>
        <div className='button-box'>
        <div className='btn cancel'>취소</div>
        <div className='btn write' onClick={onWriteButtonClickHandler}>작성</div>
        </div>
    </div>
    )
}
