export default interface PolicyView {
    plcyNm: string;              // 정책명
    plcyExplnCn: string;         // 정책소개
    rgtrInstCdNm: string;        // 담당 기관
  
    // 한 눈에 보는 정책 요약
    plcyNo: string;              // 정책번호
    lclsfNm: string;             // 카테고리(대분류) 일자리/주거/교육/복지문화
    plcySprtCn: string;          // 정책지원내용
    bizPrdBgngYmd: string;       // 사업기간시작일자
    bizPrdEndYmd: string;        // 사업기간종료일자
    aplyYmd: string;             // 신청기간
    aplyPrdSeCd: string;         // 신청기간여부 (0057001: 한정, 0057002: 상시, 0057003: 기타)
    sprtSclCnt: string;          // 지원규모수
  
    // 신청방법
    sprtTrgtMinAge: string;      // 지원대상최소연령
    sprtTrgtMaxAge: string;      // 지원대상최대연령
    sprtTrgtAgeLmtYn: string;    // 지원대상연령제한여부 (Y: 제한없음, N: 제한있음)
    zipCd: string;               // 지역 
    earnCndSeCd: string;         // 소득조건구분코드 (0043001: 무관, 0043002: 제한있음, 0043003: 기타)
    earnMinAmt: string;          // 소득최소금액
    earnMaxAmt: string;          // 소득최대금액
    earnEtxCn: string;           // 소득기타내용
    schoolCd: string;            // 정책학력요건코드 (0049001~0049010)
    plcyMajorCd: string;         // 정책전공요건코드 (0011001~0011009)
    jobCd: string;               // 정책취업요건코드 (0013001~0013010)
    sBizCd: string;              // 정책특화요건코드 (0014001~0014010)
    addAplyQlfcCndCn: string;    // 추가신청자격조건내용
    ptcpPrpTrgtCn: string;       // 참여제한대상내용
  
    // 신청절차
    plcyAplyMthdCn: string;      // 정책신청방법내용
    srngMthdCn: string;          // 심사방법내용
    aplyUrlAddr: string;         // 신청URL주소
    sbmsnDcmntCn: string;        // 제출서류내용
  }
  