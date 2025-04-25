import React, { useEffect, useState } from "react"
import './style.css'

import Plus from 'src/assets/images/plus-icon.png'
import Minus from 'src/assets/images/minus-icon.png'
import Scrap from 'src/assets/images/scrap.png'
import ScrapActive from 'src/assets/images/scrap-active.png'
import { i } from "react-router/dist/development/fog-of-war-oa9CGk10"
import { usePagination } from "src/hooks"
import Pagination from "src/components/Pagination"
import { useNavigate } from "react-router"

type PolicyResult = {
    id: number;
    title: string;
    content: string;
    category: string;
    region: string;
    period: string;
};

type Props = {
    items: PolicyResult[];
    onScrap?: (item: { title: string; period: string }) => void;
}

export default function Policy({items, onScrap}: Props) {

    // state: calendar event 상태 //
    const [calendarEvents, setCalendarEvents] = useState<{title: string, start: string, end: string}[]>([]);

    // state: scrap 상태 //
    const [isScrap, setIsScrap] = useState<boolean>(false);

    // state: 임시값 //
    const exampleItems: PolicyResult[] = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `청년정책 제목 ${i + 1}`,
        content: `이것은 정책 ${i + 1}에 대한 간단한 설명입니다.`,
        category: i % 2 === 0 ? '주거지원' : '취업지원',
        region: i % 3 === 0 ? '서울' : i % 3 === 1 ? '부산' : '대구',
        period: '2025.04.01 ~ 2025.04.30'
    }));
    
    // state: card pagination //
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSection, setCurrentSection] = useState(1);

    const totalPages = Math.ceil(exampleItems.length / itemsPerPage);
    const pagedItems = exampleItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    const pageList = Array.from({ length: totalPages }, (_, i) => i + 1);
    // state: -------------- //

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // function: 날짜 파싱 함수 //
    const parsePeriod = (period: string) => {
        const [start, end] = period.split(' ~ ').map(date => date.replace(/\./g, '-'));
        return { start, end };
    };

    // event handler: 이전 섹션 클릭 이벤트 처리 //
    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 1) * 10);
    };

    // event handler: 다음 섹션 클릭 이벤트 처리 //
    const onNextSectionClickHandler = () => {
        if (currentSection === totalPages) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * 10 + 1);
    };

    // event handler: 정책 카드 클릭 이벤트 처리 //
    const onPolicyCardClickHandler = () => {
        navigator('/policy');
    };

    // event handler: 정책 스크랩 //
    const onScrapClickHandler = (item: PolicyResult) => {
        setIsScrap(prev => !prev);
        onScrap?.({ title: item.title, period: item.period });
    };


    return (
        <div id="policy-wrapper">
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="검색어 입력"/>
                <div className="category organization">
                    담당기관
                    <img src={Plus} alt="plus" />
                </div>
                <div className="category field">
                    정책분야
                    <img src={Plus} alt="plus" />
                </div>
            </div>
            <div className="search-result">총 {exampleItems.length.toLocaleString()}건의 정책정보가 있습니다.</div>

            <div className="grid policy-card-container" >
                {pagedItems.map((item) => (
                <div key={item.id} className="policy-card-box" >
                    <div className="remain">{item.period}
                        <img
                        src={isScrap ? ScrapActive : Scrap}
                        onClick={() => onScrapClickHandler(item)}
                        style={{ cursor: 'pointer' }}
                        />
                    </div>
                    <div className="category">{item.category}</div>
                    <div className="region">{item.region}</div>
                    <div className="title">{item.title}</div>
                    <div className="content">{item.content}</div>
                    <div className="period">
                        <span className="period span">신청기간&nbsp;&nbsp;&nbsp;</span>|&nbsp;&nbsp;&nbsp;{item.period}
                    </div>
                    <button className="more" onClick={onPolicyCardClickHandler}>자세히보기</button>
                </div>
                ))}
            </div>            
            <div className='pagination-container'>
                <div className="pagination-box">
                <div className='pagination-button left' onClick={onPreSectionClickHandler}></div>
                    {pageList.map((page) => (
                        <div
                            key={page}
                            className={`page ${page === currentPage ? "active" : ""}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </div>
                    ))}
                    <div className='pagination-button right' onClick={onNextSectionClickHandler}></div>
                </div>
            </div>
        </div>
    )
}