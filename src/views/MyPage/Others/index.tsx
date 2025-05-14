import React, { useEffect, useState } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router';
import OtherSidebar from 'src/layouts/OtherUserSidebar';
import { Gender, Mbti } from 'src/types/aliases';
import { GetUserIntroductionResponseDto } from 'src/apis/dto/response/user';
import { ResponseDto } from 'src/apis/dto/response';
import { LikeKeyword } from 'src/types/interfaces';
import { getOtherUserBadgeRequest, getOtherUserIntroductionRequest } from 'src/apis';
import DefaultProfile from 'src/assets/images/default-profile.png';
import GetBadgeResponseDto from 'src/apis/dto/response/user/get-badge.responseDto';


export default function Others() {

  // state: 경로 변수 상태
  const { userId } = useParams();

  // state: 해당 사용자 상태 
  const [nickname, setNickname] = useState<string>('');
  const [birth, setBirth] = useState<number>(0);
  const [gender, setGender] = useState<Gender | null>(null);
  const [profileImage, setProfileImage] = useState<string>('');
  const [mbti, setMbti] = useState<Mbti | null>(null);
  const [job, setJob] = useState<string>('');
  const [selfIntro, setSelfIntro] = useState<string>('');
  const [likeKeywords, setLikeKeywords] = useState<LikeKeyword[]>([]);
  const [badge, setBadge] = useState<string>('');
  
  // function: get other user badge response 처리 함수 //
  const getOtherUserBadgeResponse = (responseBody: GetBadgeResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' :
      responseBody.code === 'NU' ? '존재하지 않는 유저입니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';

    if(!isSuccess) {
      alert(message);
      return;
    }

    const {badge} = responseBody as GetBadgeResponseDto;
    setBadge(badge);
  }

  // function: get Other User Indroduction response 처리 함수 //
  const getOtherUserIntroductionResponse = (responseBody: GetUserIntroductionResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' :
      responseBody.code === 'NU' ? '존재하지 않는 유저입니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';

    if(!isSuccess) {
      alert(message);
      return;
    }

    const {nickname, birth, gender, profileImage, mbti, job, selfIntro, likeKeywords} = responseBody as GetUserIntroductionResponseDto;
    setNickname(nickname);
    setBirth(birth);
    setGender(gender);
    setProfileImage(profileImage);
    setMbti(mbti);
    setJob(job);
    setSelfIntro(selfIntro);
    setLikeKeywords(likeKeywords);
  }
  
  // function: 네비게이터 함수 //
  const navigator = useNavigate();
    
  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!userId) return;
    
    getOtherUserIntroductionRequest(userId).then(getOtherUserIntroductionResponse);
    getOtherUserBadgeRequest(userId).then(getOtherUserBadgeResponse);
  }, [])

  return (
    <div id='others-main-wrapper'>
      <OtherSidebar/>
      <div className='contents-wrapper'>
        <div className='summary-box'>
          <div className='content'>
            <div className='title'>도우미</div>
            <div className='sub'>후기</div>
          </div>
          <div className='content'>
            <div className='title'>커뮤니티</div>
            <div className='sub'>작성글</div>
          </div>
          <div className='content buying'>
            <div className='title'>공동구매</div>
            <div className='buying-sub-box'>
              <div className='sub'>판매 대기</div>
              <span className="divider">|</span>
              <div className='sub'>판매 완료</div>
              <span className="divider">|</span>
              <div className='sub'>후기</div>
            </div>
          </div>
        </div>
        <div className='report-box'>🚩계정 신고</div>
        <div className='body'>
          <div className='profile-area'>
            <div className='profile-container'>
              <div className='profile-image'>{<img src={profileImage || DefaultProfile} alt="프로필 이미지" />}</div>
              <div className='name'>{nickname}</div>
            </div>
          </div>  
          <div className='user-info-area'>
            <div className='outline'>
              <div className='review-box'>
                <div className='text'>받은 후기 평점</div>
                <div className='rating'>5.0</div>
              </div>
              <div className='badge-box'>
                <div className='text'>포인트</div>
                <div className='badge-image'>O</div>
              </div>
              <div className='achievements-box'>
                <div className='text'>업적</div>
                <div className='button-select'>{badge ? `${badge}` : '선택한 업적이 없습니다.'}</div>
                <div className='button-change'></div>
              </div>
            </div>
            <div className='detail'>
              <div className='personal-info-box'> 
                <div className='title-box'>
                  <div className='text'>닉네임</div>
                  <div className='text'>나이</div>
                  <div className='text'>성별</div>
                  <div className='text'>MBTI</div>
                  <div className='text'>직업</div>
                </div>
                <div className='info-box'>
                  <div className='sub-text'>{nickname}</div>
                  <div className='sub-text'>{birth}</div>
                  <div className='sub-text'>{gender}</div>
                  <div className='sub-text'>{mbti}</div>
                  <div className='sub-text'>{job}</div>
                </div>
              </div>
              <div className='specialty-box'>
                <div className='text'>#잘해요</div>
                <div className='tag-container'>
                  {Array.isArray(likeKeywords) &&
                    likeKeywords.map((item, i) => (
                      <div key={i} className="tag-box">
                        <div className="tag-wrapper">
                          <div className="tag">#{item.keyword}</div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='introduce-box'>
          <div className='introduce-title'>자기소개</div>
          <div className='introduce-datail'>
            <div className='sub-text'>{selfIntro}</div>
          </div>
        </div>
      </div>

    </div>
  )
}
