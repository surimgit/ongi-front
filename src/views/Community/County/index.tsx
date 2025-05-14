import React, { useEffect, useState } from 'react';
import './style.css';
import County from 'src/types/aliases/community-county.alias';
import { useNavigate } from 'react-router';
import { COUNTY_ABSOLUTE_PATH } from 'src/constants';
import { useSignInUserStore } from 'src/stores';

// interface: 우리 동네 게시판 테이블 레코드 속성 //
interface CountyBoardProps {
    region: string;
    counties: County[];
}


// component: 우리 동네 게시판 테이블 레코드 컴포넌트 //
function CountyBoard({region, counties}: CountyBoardProps) {

    // state: 지역 리스트 슬라이드 선택 상태 //
    const [isSelected, setSelected] = useState<boolean>(false);

    // variable: 슬라이드 버튼 클래스 //
    const regionClass = !isSelected ? 'slide-btn' : 'slide-btn down';

    // function: 내비게이터 함수 //
    const navigator = useNavigate();

    // event handler: 레코드 클릭 시 이벤트 처리 //
    const onClickCounty = (county: County) => {
        const [, district] = county;
        if (!region && !district) return;
        else navigator(COUNTY_ABSOLUTE_PATH('우리 동네 게시판', region, district));
    };

    // event handler: 지역 슬라이드 버튼 클릭 이벤트 처리 //
    const onSlideButtonClickHandler = () => {
        if (isSelected) setSelected(false);
        else setSelected(true);
    };

    // render: 우리 동네 게시판 테이블 레코드 컴포넌트 //
    return (
        <div className='region-container'>
            <div className='region-box'>
                <span>{region}</span>
                <div className={regionClass} onClick={onSlideButtonClickHandler}></div>
            </div>
            {isSelected &&
                <div className='county-wrapper'>
                    <div className='county-container'>
                        {counties.map((county, index) =>
                            <div key={index} className='county' onClick={() => onClickCounty(county)}>{county[county.length-1]}</div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

// component: 우리 동네 게시판 메인 페이지 컴포넌트 //
export default function CountyMain() {

    // variable: 지역 리스트 //
    const gangwonList: County[] = 
    [['강원특별자치도', '강릉시'], ['강원특별자치도', '고성군'], ['강원특별자치도', '동해시'], ['강원특별자치도', '삼척시'], ['강원특별자치도', '속초시'], ['강원특별자치도', '양구군'],
    ['강원특별자치도', '양양군'], ['강원특별자치도', '영월군'], ['강원특별자치도', '원주시'], ['강원특별자치도', '인제군'], ['강원특별자치도', '정선군'], ['강원특별자치도', '철원군'],
    ['강원특별자치도', '춘천시'], ['강원특별자치도', '태백시'], ['강원특별자치도', '평창군'], ['강원특별자치도', '홍천군'], ['강원특별자치도', '화천군'], ['강원특별자치도', '횡성군']];

    const gyeongiList: County[] = 
    [['경기', '가평군'], ['경기', '고양시'], ['경기', '과천시'], ['경기', '광명시'], ['경기', '광주시'], ['경기', '구리시'], ['경기', '군포시'],
    ['경기', '김포시'], ['경기', '남양주시'], ['경기', '동두천시'], ['경기', '부천시'], ['경기', '성남시'], ['경기', '수원시'], ['경기', '시흥시'],
    ['경기', '안산시'], ['경기', '안성시'], ['경기', '안양시'], ['경기', '양주시'], ['경기', '양평군'], ['경기', '연천군'], ['경기', '오산시'],
    ['경기', '용인시'], ['경기', '의왕시'], ['경기', '의정부시'], ['경기', '이천시'], ['경기', '파주시'], ['경기', '평택시'], ['경기', '포천시'],
    ['경기', '하남시'], ['경기', '화성시']];

    const gyeongnamList: County[] =
    [['경남', '거제시'], ['경남', '거창군'], ['경남', '고성군'], ['경남', '김해시'], ['경남', '남해시'], ['경남', '밀양시'], ['경남', '사천시'],
    ['경남', '산청군'], ['경남', '양산시'], ['경남', '의령군'], ['경남', '진주시'], ['경남', '창녕군'], ['경남', '창원시'], ['경남', '통영시']];

    const gyeongbukList: County[] =
    [['경북', '경산시'], ['경북', '경주시'], ['경북', '고령군'], ['경북', '구미시'], ['경북', '김천시'], ['경북', '문경시'], ['경북', '봉화군'],
    ['경북', '상주시'], ['경북', '성주군'], ['경북', '안동시'], ['경북', '영덕군'], ['경북', '영양군'], ['경북', '영주시'], ['경북', '영천시'],
    ['경북', '예천군'], ['경북', '울릉군'], ['경북', '울진군'], ['경북', '의성군'], ['경북', '청도군'], ['경북', '청송군'], ['경북', '칠곡군'],
    ['경북', '포항시']];

    const gwangjuList: County[] =
    [['광주', '광산구'], ['광주', '남구'], ['광주', '동구'], ['광주', '북구'], ['광주', '서구']];

    const daeguList: County[] =
    [['대구', '군위군'], ['대구', '남구'], ['대구', '달서구'], ['대구', '달성군'], ['대구', '동구'], ['대구', '북구'], ['대구', '서구'],
    ['대구', '수성구'], ['대구', '중구']];

    const daejeonList: County[] =
    [['대전', '대덕구'], ['대전', '동구'], ['대전', '서구'], ['대전', '유성구'], ['대전', '중구']];

    const busanList: County[] =
    [['부산', '강서구'], ['부산', '금정구'], ['부산', '기장군'], ['부산', '남구'], ['부산', '동구'], ['부산', '동래구'], ['부산', '부산진구'],
    ['부산', '북구'], ['부산', '사상구'], ['부산', '사하구'], ['부산', '서구'], ['부산', '수영구'], ['부산', '연제구'], ['부산', '영도구'],
    ['부산', '중구'], ['부산', '해운대구']];

    const seoulList: County[] =
    [['서울', '강남구'], ['서울', '강동구'], ['서울', '강북구'], ['서울', '강서구'], ['서울', '관악구'], ['서울', '광진구'],
    ['서울', '구로구'], ['서울', '금천구'], ['서울', '노원구'], ['서울', '도봉구'], ['서울', '동대문구'], ['서울', '동작구'],
    ['서울', '마포구'], ['서울', '서대문구'], ['서울', '서초구'], ['서울', '성동구'], ['서울', '성북구'], ['서울', '송파구'],
    ['서울', '양천구'], ['서울', '영등포구'], ['서울', '용산구'], ['서울', '은평구'], ['서울', '종로구'], ['서울', '중구'], ['서울', '중랑구']];

    const sejongList: County[] =
    [['세종특별자치시']];

    const ulsanList: County[] =
    [['울산', '남구'], ['울산', '동구'], ['울산', '북구'], ['울산', '울주군'], ['울산', '중구']];

    const incheonList: County[] =
    [['인천', '강화군'], ['인천', '계양구'], ['인천', '남동구'], ['인천', '동구'], ['인천', '미추홀구'], ['인천', '부평구'],
    ['인천', '서구'], ['인천', '연수구'], ['인천', '옹진군'], ['인천', '중구']];

    const jeonnamList: County[] =
    [['전남', '강진군'], ['전남', '고흥군'], ['전남', '곡성군'], ['전남', '광양시'], ['전남', '구례군'], ['전남', '나주시'], ['전남', '담양군'],
    ['전남', '목포시'], ['전남', '무안군'], ['전남', '보성군'], ['전남', '순천시'], ['전남', '신안군'], ['전남', '여수시'], ['전남', '영광군'],
    ['전남', '영암군'], ['전남', '완도군'], ['전남', '장성군'], ['전남', '장흥군'], ['전남', '진도군'], ['전남', '함평군'], ['전남', '해남군'],
    ['전남', '화순군']];

    const jeonbukList: County[] =
    [['전북특별자치도', '고창군'], ['전북특별자치도', '군산시'], ['전북특별자치도', '김제시'], ['전북특별자치도', '남원시'], ['전북특별자치도', '무주군'], ['전북특별자치도', '부안군'], 
    ['전북특별자치도', '순창군'], ['전북특별자치도', '완주군'], ['전북특별자치도', '익산시'], ['전북특별자치도', '임실군'], ['전북특별자치도', '장수군'], ['전북특별자치도', '전주시'], 
    ['전북특별자치도', '정읍시'], ['전북특별자치도', '진안군']];

    const jejuList: County[] =
    [['제주특별자치도', '제주시'], ['제주특별자치도', '서귀포시']];

    const chungnamList: County[] =
    [['충남', '계룡시'], ['충남', '공주시'], ['충남', '금산군'], ['충남', '논산시'], ['충남', '당진군'], ['충남', '보령시'], ['충남', '부여군'],
    ['충남', '서산시'], ['충남', '서천군'], ['충남', '아산시'], ['충남', '천안시'], ['충남', '청양군'], ['충남', '태안군'], ['충남', '홍성군']];

    const chungbukList: County[] =
    [['충북', '괴산군'], ['충북', '단양군'], ['충북', '보은군'], ['충북', '영동군'], ['충북', '예산군'], ['충북', '옥천군'], ['충북', '음성군'],
    ['충북', '제천시'], ['충북', '증평군'], ['충북', '진천군'], ['충북', '청주시'], ['충북', '충주시']];


    // render: 우리 동네 게시판 메인 페이지 컴포넌트 렌더링 //
    return (
        <div id='county-main-wrapper'>
            <div className='board-title-container'>
                우리 동네 게시판
            </div>
            <div className='county-container-box'>
                <div className='left-box'>
                    <CountyBoard 
                        region='강원특별자치도'
                        counties={gangwonList}
                    />
                    <CountyBoard 
                        region='경남'
                        counties={gyeongnamList}
                    />
                    <CountyBoard 
                        region='광주'
                        counties={gwangjuList}
                    />
                    <CountyBoard 
                        region='대전'
                        counties={daejeonList}
                    />
                    <CountyBoard 
                        region='서울'
                        counties={seoulList}
                    />
                    <CountyBoard 
                        region='울산'
                        counties={ulsanList}
                    />
                    <CountyBoard 
                        region='전남'
                        counties={jeonnamList}
                    />
                    <CountyBoard 
                        region='제주특별자치도'
                        counties={jejuList}
                    />
                    <CountyBoard 
                        region='충북'
                        counties={chungbukList}
                    />
                </div>
                <div className='right-box'>
                    <CountyBoard 
                        region='경기'
                        counties={gyeongiList}
                    />                
                    <CountyBoard 
                        region='경북'
                        counties={gyeongbukList}
                    />                
                    <CountyBoard 
                        region='대구'
                        counties={daeguList}
                    />                
                    <CountyBoard 
                        region='부산'
                        counties={busanList}
                    />               
                    <CountyBoard 
                        region='세종특별자치시'
                        counties={sejongList}
                    />              
                    <CountyBoard 
                        region='인천'
                        counties={incheonList}
                    />           
                    <CountyBoard 
                        region='전북특별자치도'
                        counties={jeonbukList}
                    />               
                    <CountyBoard 
                        region='충남'
                        counties={chungbukList}
                    />
                </div>
            </div>
        </div>
    )
}
