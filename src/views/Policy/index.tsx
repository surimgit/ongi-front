import React, { useEffect, useState } from "react";
import './style.css';

import Plus from 'src/assets/images/plus-icon.png';
import Minus from 'src/assets/images/minus-icon.png';
import Scrap from 'src/assets/images/scrap.png';
import ScrapActive from 'src/assets/images/scrap-active.png';
import { usePagination } from "src/hooks";
import Pagination from "src/components/Pagination";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, POLICY_ABSOLUTE_PATH } from "src/constants";
import { PolicyList } from "src/types/interfaces";
import { GetPolicyListResponseDto } from "src/apis/dto/response/calendar/get-policy-list.response.dto";

type PolicyResult = {
    id: number;
    plcyNo: string;
    title: string;
    content: string;
    category: string;
    region: string;
    period: string;
    aplyPrdSeCd: string;
    startDate: string;
    endDate: string;
};

type Props = {
    // searchKeyword: string;
    // page: number;
    // section: number;
    // autoSearch: boolean;
    items: PolicyResult[];
    onScrap?: (item: 
        { title: string; 
          category: string;
          content: string;
          period: string;
        }) => void;
};

export default function Policy({ /*searchKeyword, page, section, autoSearch,*/ items, onScrap} : Props) {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: navigator 상태 //
    const navigator = useNavigate();

    // state: location 상태 //
    const location = useLocation();
    
    // state: calendar 연결 //
    const [calendarEvents, setCalendarEvents] = useState<{ title: string; start: string; end: string }[]>([]);
    const [scrapStates, setScrapStates] = useState<{ [id: number]: boolean }>({});
    
    // state: 키워드 상태 //
    const [keyword, setKeyword] = useState<string>('');
    
    // state: 검색 결과 //
    const [searchResults, setSearchResults] = useState<PolicyResult[]>([]);
    
    // state: page, section 상태 //
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSection, setCurrentSection] = useState(1);

    const totalPages = Math.ceil(searchResults.length / itemsPerPage);
    const pagedItems = searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const pageList = Array.from({ length: totalPages }, (_, i) => i + 1);
    const sectionSize = 10;

    const sectionStartPage = (currentSection - 1) * sectionSize + 1;
    const sectionEndPage = Math.min(currentSection * sectionSize, totalPages);

    const sectionPageList = pageList.filter(page => page >= sectionStartPage && page <= sectionEndPage);
    // state: --------------------- //
    
    // variable: access token //
    const accessToken = cookies[ACCESS_TOKEN];
    
    // function: 기간 format 변경 //
    const formatPeriod = (period: string | undefined): { startDate: string; endDate: string;} => {
        if(!period || period.trim() === '') {
            return {startDate: '', endDate: ''};
        }

        const [startRaw, endRaw] = period.split(' ~ ');

        const formatDate = (dateStr: string) => {
            if(!dateStr || dateStr.length !== 8) return '';
            return `${dateStr.slice(0,4)}-${dateStr.slice(4,6)}-${dateStr.slice(6,8)}`;
        };

        const startDate = formatDate(startRaw);
        const endDate = formatDate(endRaw);

        return { startDate, endDate };
    };

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

    // event handler: 이전 섹션 클릭 이벤트 처리 //
    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 2) * 10 + 1);
    };

    // event handler: 다음 섹션 클릭 이벤트 처리//
    const onNextSectionClickHandler = () => {
        if (currentSection * 10 >= totalPages) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * 10 + 1);
    };

    // event handler: 정책 더보기 클릭 이벤트 처리 //
    const onPolicyCardClickHandler = (plcyNo: string, plcyNm: string) => {
        navigator(POLICY_ABSOLUTE_PATH(plcyNo, plcyNm, keyword, String(currentPage), String(currentSection)));
    }; 

    // event handler: 스크랩 클릭 이벤트 처리 //
    const onScrapClickHandler = (item: PolicyResult) => {
        let periodFormat = `${item.startDate} ~ ${item.endDate}`;
        if(item.aplyPrdSeCd === '0057002' || item.aplyPrdSeCd === '0057003') {periodFormat = '상시';}
        setScrapStates(prev => ({
            ...prev,
            [item.id]: !prev[item.id]
        }));
        console.log('aplyPrdSeCd: ', item.aplyPrdSeCd);
        onScrap?.({ title: item.title, category: item.category, content: item.content, period: periodFormat  });
    };

    // event handler: 검색어 변경 이벤트 처리 //
    const onKeywordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    // event handler: 검색버튼 클릭 이벤트 처리 //
    const onSearchClickHandler = async () => {
        try {
            const response = await axios.get<GetPolicyListResponseDto>('http://localhost:4000/api/v1/policy-list', {
                params: { keyword },
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            
            const resultList = response.data || [];
            
            const mappedResults: PolicyResult[] = resultList.map((item: PolicyList, index: number) => {
                const { startDate, endDate } = formatPeriod(item.aplyYmd);

                return {
                    id: index,
                    plcyNo: item.plcyNo,
                    title: item.plcyNm || '',
                    content: item.plcyExplnCn || '',
                    category: item.lclsfNm || '-',
                    region: item.zipCd || '',
                    period: item.aplyYmd || '상시',
                    aplyPrdSeCd: item.aplyPrdSeCd,
                    startDate,
                    endDate
                };
            });              
            setSearchResults(mappedResults);
            setCurrentPage(1);
            setCurrentSection(1);

            const queryParams = new URLSearchParams({
              keyword,
              page: '1',
              section: '1'
            }).toString();
            navigator(`?${queryParams}`);
        } catch (error) {
            console.error('검색 오류:', error);
        }
    };

    // effect: 렌더 시 실행 함수 //
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const keyword = query.get('keyword') || '';
        const page = query.get('page') || '1';
        const section = query.get('section') || '1';
        
        setKeyword(keyword);
        setCurrentPage(Number(page));
        setCurrentSection(Number(section));

        // if (keyword) fetchPolicies(keyword);
    }, []);

    return (
        <div id="policy-wrapper">
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="검색어 입력" value={keyword} 
                onChange={onKeywordChangeHandler} onKeyDown={(e) => {if (e.key === 'Enter') {onSearchClickHandler();}}} />
                <div className="category organization">
                    담당기관
                    <img src={Plus} alt="plus" />
                </div>
                <div className="category field">
                    정책분야
                    <img src={Plus} alt="plus" />
                </div>
                <button className='button' onClick={onSearchClickHandler}>검색</button>
            </div>
            <div className="search-result">총 {searchResults.length.toLocaleString()}건의 정책정보가 있습니다.</div>

            <div className="grid policy-card-container">
                {pagedItems.map((item) => (
                    <div key={item.id} className="policy-card-box">
                        <div className="remain">{calculateDDay(item.endDate)}
                            <img
                                src={scrapStates[item.id] ? ScrapActive : Scrap}
                                onClick={() => onScrapClickHandler(item)}
                                style={{ cursor: 'pointer' }}
                                alt="스크랩"
                            />
                        </div>
                        <div className="category">{item.category}</div>
                        <div className="region">{item.region}</div>
                        <div className="title">{item.title}</div>
                        <div className="content">{item.content}</div>
                        <div className="period">
                            <span className="period span">
                                신청기간&nbsp;&nbsp;&nbsp;</span>|&nbsp;&nbsp;&nbsp;
                                {(!item.startDate && !item.endDate) ? '상시' : `${item.startDate} ~ ${item.endDate}`}
                        </div>
                        <button className="more" onClick={() => onPolicyCardClickHandler(item.plcyNo, item.title)}>자세히보기</button>
                    </div>
                ))}
            </div>
            <div className='pagination-container'>
                <div className="pagination-box">
                    <div className='pagination-button left' onClick={onPreSectionClickHandler}></div>
                    {sectionPageList.map((page) => (
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
    );
}
