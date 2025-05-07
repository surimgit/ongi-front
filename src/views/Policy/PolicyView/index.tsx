import React, { useEffect, useState } from "react";
import './style.css';
import axios from "axios";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN } from "src/constants";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import PolicyView from "src/types/interfaces/policy-view.interface";
import { GetPolicyViewResponseDto } from "src/apis/dto/response/calendar";

export default function PolicyViewPage() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: navigator 상태 //
  const navigator = useNavigate();

  // state: location 상태 //
  const location = useLocation();

  // state: query 상태 //
  const query = new URLSearchParams(location.search);

  // state: search Param //
  const [searchParams] = useSearchParams();

  // state: 조회 키 //
  const plcyNo = query.get('plcyNo') || '';
  const plcyNm = query.get('plcyNm') || '';  
  const keyword = query.get('keyword') || '';
  const regions = query.get('regions') || '';
  const categories = query.get('categories') || '';
  const page = searchParams.get('page') || '1';
  const section = searchParams.get('section') || '1';

  // state: D-day //
  const remain = query.get('remain') || '';

  // state: 정책 데이터 상태 //
  const [policy, setPolicy] = useState<PolicyView | null>(null);
    
  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];
  
  // function: remain 구하기 //
  function getRemain(policy: PolicyView | null): string {
    if (!policy) return '';
    
    const period = policy.aplyYmd; 
  
    if (!period || period === '상시') return '상시';
  
    const [startRaw, endRaw] = period.split(' ~ ').map(str => str.trim());
    
    if (!endRaw) return '상시';
  
    const endDate = `${endRaw.slice(0,4)}-${endRaw.slice(4,6)}-${endRaw.slice(6,8)}`;
  
    return calculateDDay(endDate);
  }

  // function: 연령 제한 구하기 //
  function getAgeLimit(policy: PolicyView | null): string {
    if (!policy) return '';

    let ageLimit = '';
    
    if (policy.sprtTrgtAgeLmtYn === 'Y'){
      ageLimit = '제한없음';
    }
    if (policy.sprtTrgtAgeLmtYn === 'N'){
      ageLimit = `만 ${policy.sprtTrgtMinAge}세~만 ${policy.sprtTrgtMaxAge}세`;
    }
    return ageLimit;
  }

  // function: 소득 제한 구하기 //
  function getAmountLimit(policy: PolicyView | null): string {
    if (!policy) return '';

    let amountLimit = '';
    
    if (policy.earnCndSeCd === '0043001'){
      amountLimit = '무관';
    }
    if (policy.sprtTrgtAgeLmtYn === '0043002'){
      amountLimit = `연소득 ${policy.earnMinAmt}만원 이상 ~ ${policy.earnMaxAmt}만원 이하`;
    }
    if (policy.sprtTrgtAgeLmtYn === '0043003'){
      amountLimit = `${policy.earnEtxCn}`;
    }
    return amountLimit;
  }
  
    
  // function: 기간 format 변경 //
  function formatPeriod(period: string): string {
    if (!period) return '';
  
    const [startRaw, endRaw] = period.split(' ~ ').map(str => str.trim());
  
    const formatDate = (dateStr: string) => {
      if (!dateStr || dateStr.length !== 8) return '';
      const year = dateStr.slice(0, 4);
      const month = parseInt(dateStr.slice(4, 6), 10); // 월, 0 제거
      const day = parseInt(dateStr.slice(6, 8), 10);   // 일, 0 제거
      return `${year}년 ${month}월 ${day}일`;
    };
  
    const startDate = formatDate(startRaw);
    const endDate = formatDate(endRaw);
  
    return `${startDate} ~ ${endDate}`;
  }  

  // function: D-Day 계산 //
  const calculateDDay = (endDate: string): string => {
      if(!endDate) return '상시';
      
      const today = new Date();
      const targetDate = new Date(endDate);

      const diffTime = targetDate.getTime() - today.getTime();

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) return `D-${diffDays}`;
      if (diffDays === 0) return 'D-Day';
      if (diffDays < 0) return '마감'; 
      return '';
  };

  // event handler: 신청 바로가기 버튼 클릭 이벤트 처리 //
  const onHyperLinkClickHandler = () => {
    window.location.href = policy?.aplyUrlAddr || '';
  }

  // event handler: 목록으로 버튼 클릭 이벤트 처리 //
  const onListLinkClickHandler = () => {
    const queryParams = new URLSearchParams({
      keyword ,
      regions,
      categories,
      page,
      section
    }).toString();
    navigator(`/calendar?${queryParams}`);
  };

  // effect: 화면 렌더 시 실행 함수 //
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await axios.get<GetPolicyViewResponseDto>('http://localhost:4000/api/v1/policy-view', {
          params: { plcyNo, plcyNm },
          headers: { Authorization: `Bearer ${accessToken}`}
        });
        console.log('response: ', response.data);

        if (response.data.code !== 'SU') {
          console.error('정책 조회 실패:', response.data.message);
          return;
        }
    
        const policyData = response.data.policies[0]; 
    
        if (!policyData) {
          console.error('정책 데이터 없음!');
          return;
        }
        
        formatPeriod(policyData.aplyYmd)
        setPolicy(policyData);
      } catch (error){
        console.error('정책 조회 오류:', error); 
      }
    };
    console.log(location.search);
    if(plcyNo && plcyNm) fetchPolicy();
  }, [plcyNo, plcyNm, accessToken]);

  return (
    <div id="policy-main-wrapper">
      <div className="policy-view-wrapper">

        <div className="title">{plcyNm}</div>

        <div className="tag-container">
          <div className="region">{policy?.zipCd}</div>
          <div className="category">{policy?.lclsfNm}</div>
          <div className="remain">{getRemain(policy)}</div>
          <div className="organization">{policy?.rgtrInstCdNm}</div>
        </div>

        <div className="short-textbox">{policy?.plcyExplnCn}</div>

        <div className="info-container summary">
          <div className="info-title">한 눈에 보는 정책 요약</div>
          <div className="info-row">
            <span className="span-title">· 정책 번호</span>
            <span className="content-detail">{plcyNo}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 정책 분야</span>
            <span className="content-detail">{policy?.lclsfNm}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 지원내용</span>
            <span className="content-detail">{policy?.plcySprtCn}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 사업 운영 기간</span>
            <span className="content-detail">{formatPeriod(`${policy?.bizPrdBgngYmd} ~ ${policy?.bizPrdEndYmd}`)}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 사업 신청기간</span>
            <span className="content-detail">{formatPeriod(policy?.aplyYmd || '')}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 지원 규모(명)</span>
            <span className="content-detail">{(policy?.sprtSclCnt) || '-'}명</span>
          </div>
        </div>

        <div className="info-container qualifications">
          <div className="info-title">신청자격</div>
          <div className="info-row">
            <span className="span-title">· 연령</span>
            <span className="content-detail">{getAgeLimit(policy)}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 거주지역</span>
            <span className="content-detail">{policy?.zipCd}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 소득</span>
            <span className="content-detail">{getAmountLimit(policy)}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 학력</span>
            <span className="content-detail">{policy?.schoolCd}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 전공</span>
            <span className="content-detail">{policy?.plcyMajorCd}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 취업상태</span>
            <span className="content-detail">{policy?.jobCd}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 특화분야</span>
            <span className="content-detail">{policy?.sBizCd}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 추가사항</span>
            <span className="content-detail">{policy?.addAplyQlfcCndCn}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 참여제한 대상</span>
            <span className="content-detail">{policy?.ptcpPrpTrgtCn}</span>
          </div>
        </div>

        <div className="info-container application">
          <div className="info-title">신청방법</div>
          <div className="info-row">
            <span className="span-title">· 신청절차</span>
            <span className="content-detail">{policy?.plcyAplyMthdCn}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 심사 및 발표</span>
            <span className="content-detail">{policy?.srngMthdCn}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 신청 사이트</span>
            <span className="content-detail">{policy?.aplyUrlAddr}</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 제출 서류</span>
            <span className="content-detail">{policy?.sbmsnDcmntCn}</span>
          </div>
        </div>

      </div>
      <div className="policy-move-container">
          <div className="title">{plcyNm}</div>
          { (policy?.aplyUrlAddr === '') ? '' : <button className="hyperlink" onClick={onHyperLinkClickHandler}>신청 바로가기</button>}
          <button className="list" onClick={onListLinkClickHandler}>목록으로</button>
      </div>
    </div>
  );
}