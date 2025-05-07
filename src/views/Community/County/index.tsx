import React, { useEffect, useState } from 'react';
import './style.css';
import County from 'src/types/aliases/community-county.alias';
import { useNavigate } from 'react-router';
import { COUNTY_ABSOLUTE_PATH } from 'src/constants';
import { useSignInUserStore } from 'src/stores';

// interface: 우리 동네 게시판 테이블 레코드 속성 //
interface CountyBoardProps {
    province: string;
    counties: County[];
}


// component: 우리 동네 게시판 테이블 레코드 컴포넌트 //
function CountyBoard({province, counties}: CountyBoardProps) {

    // state: 지역 리스트 슬라이드 선택 상태 //
    const [isSelected, setSelected] = useState<boolean>(false);

    // state: 로그인 사용자 정보 상태 //
    const { county, setCountyFromAddress } = useSignInUserStore();

    // variable: 슬라이드 버튼 클래스 //
    const provinceClass = !isSelected ? 'slide-btn' : 'slide-btn down';

    // function: 내비게이터 함수 //
    const navigator = useNavigate();

    // event handler: 레코드 클릭 시 이벤트 처리 //
    const onClickCounty = (county: County) => {
        navigator(COUNTY_ABSOLUTE_PATH('우리 동네 게시판', county));
    };

    // event handler: 지역 슬라이드 버튼 클릭 이벤트 처리 //
    const onSlideButtonClickHandler = () => {
        if (isSelected) setSelected(false);
        else setSelected(true);
    };

    // render: 우리 동네 게시판 테이블 레코드 컴포넌트 //
    return (
        <div className='province-container'>
            <div className='province-box'>
                <span>{province}</span>
                <div className={provinceClass} onClick={onSlideButtonClickHandler}></div>
            </div>
            {isSelected &&
                <div className='county-wrapper'>
                    <div className='county-container'>
                        {counties.map((county) =>
                            <div className='county' onClick={() => onClickCounty(county)}>{county}</div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

// component: 우리 동네 게시판 테이블 컴포넌트 //


// component: 우리 동네 게시판 메인 페이지 컴포넌트 //
export default function CountyMain() {

    // state: 지역 리스트 슬라이드 선택 상태 //
    const [selected, setSelected] = useState<string>('');

    // variable: 지역 리스트 //
    const gangwonList: County[] = ['강릉' , '고성(강원)' , '동해' , '삼척' , '속초' , '양구' , '양양' , '영월' , '원주' , '인제' , '정선' , '철원' , '춘천' , '태백' , '평창' , '홍천' , '화천' , '횡성'];

    // render: 우리 동네 게시판 메인 페이지 컴포넌트 렌더링 //
    return (
        <div id='county-main-wrapper'>
            <div className='board-title-container'>
                우리 동네 게시판
            </div>
            <div className='county-container-box'>
                <div className='left-box'>
                    <CountyBoard 
                        province='강원특별자치도'
                        counties={gangwonList}
                    />
                    <CountyBoard 
                        province='경상남도'
                        counties={gangwonList}
                    />
                    <CountyBoard 
                        province='광주광역시'
                        counties={gangwonList}
                    />
                    <CountyBoard 
                        province='대전광역시'
                        counties={gangwonList}
                    />
                    <CountyBoard 
                        province='서울특별시'
                        counties={gangwonList}
                    />
                    <CountyBoard 
                        province='울산광역시'
                        counties={gangwonList}
                    />
                    <CountyBoard 
                        province='전라남도'
                        counties={gangwonList}
                    />
                    <CountyBoard 
                        province='제주특별자치도'
                        counties={gangwonList}
                    />
                    <CountyBoard 
                        province='충청북도'
                        counties={gangwonList}
                    />
                </div>
                <div className='right-box'>
                    <CountyBoard 
                        province='경기도'
                        counties={gangwonList}
                    />                
                    <CountyBoard 
                        province='경상북도'
                        counties={gangwonList}
                    />                
                    <CountyBoard 
                        province='대구광역시'
                        counties={gangwonList}
                    />                
                    <CountyBoard 
                        province='부산광역시'
                        counties={gangwonList}
                    />               
                    <CountyBoard 
                        province='세종특별자치시'
                        counties={gangwonList}
                    />              
                    <CountyBoard 
                        province='인천광역시'
                        counties={gangwonList}
                    />           
                    <CountyBoard 
                        province='전북특별자치도'
                        counties={gangwonList}
                    />               
                    <CountyBoard 
                        province='충청남도'
                        counties={gangwonList}
                    />
                </div>
            </div>
        </div>
    )
}
