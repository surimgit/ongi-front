import React, { useEffect, useRef, useState } from "react";
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
import { deleteScheduleRequest } from "src/apis";
import FullCalendar from "@fullcalendar/react";

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
    searchKeyword: string;
    page: number;
    section: number;
    autoSearch: boolean;
    items: PolicyResult[];
    onScrap?: (item: 
        { title: string; 
          category: string;
          content: string;
          period: string;
        }) => void;
    calendarRef: React.RefObject<FullCalendar | null>;
};

export default function Policy({ searchKeyword, page, section, autoSearch, items, onScrap, calendarRef} : Props) {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: navigator 상태 //
    const navigator = useNavigate();

    // state: location 상태 //
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    
    // state: calendar 연결 //
    const [scrapStates, setScrapStates] = useState<{ [plcyNo: string]: boolean }>({});
    
    // state: 키워드 상태 //
    const [keyword, setKeyword] = useState(query.get("keyword") || '');
    
    // state: 이전 키워드 //
    const prevKeywordRef = useRef<string>(keyword);
    const prevRegionRef = useRef<string[]>([]);
    const prevCategoryRef = useRef<string[]>([]);
    
    // state: 검색 결과 //
    const [searchResults, setSearchResults] = useState<PolicyResult[]>([]);
    
    // state: page, section 상태 //
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(Number(query.get("page") || '1'));
    const [currentSection, setCurrentSection] = useState(Number(query.get("section") || '1'));

    const totalPages = Math.ceil(searchResults.length / itemsPerPage);
    const pagedItems = searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const pageList = Array.from({ length: totalPages }, (_, i) => i + 1);
    const sectionSize = 10;

    const sectionStartPage = (currentSection - 1) * sectionSize + 1;
    const sectionEndPage = Math.min(currentSection * sectionSize, totalPages);

    const sectionPageList = pageList.filter(page => page >= sectionStartPage && page <= sectionEndPage);
    // state: --------------------- //

    // state: 옵션 상태 //
    const [openCategory, setOpenCategory] = useState<"region" | "category" | null>(null);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    // state: toggle 상태 //
    const toggleCategory = (key: "region" | "category") => {
        setOpenCategory((prev) => (prev === key ? null : key));
    };

    // state: 로딩 상태 //
    const [isLoading, setIsLoading] = useState(false);

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

    const arraysAreEqual = (a: string[], b: string[]) => a.length === b.length && a.every((val, idx) => val === b[idx]);

    // function: 검색 결과 //
    const fetchSearchResults = async (keyword: string, regions: string[], categories: string[]) => {
        setIsLoading(true);
        try {
          const response = await axios.get<GetPolicyListResponseDto>('http://localhost:4000/api/v1/policy-list', {
            params: {
              keyword,
              regions: regions.join(","),
              categories: categories.join(",")
            },
            headers: { Authorization: `Bearer ${accessToken}` }
          });
      
          const resultList = response.data || [];
      
          const mappedResults = resultList.map((item: PolicyList, index: number): PolicyResult => {
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
        } catch (err) {
          console.error('검색 오류:', err);
        }
        setIsLoading(false);
    };
      

    // event handler: 옵션 선택 이벤트 처리 //
    const handleCheckboxChange = (
        value: string,
        selectedList: string[],
        setSelected: React.Dispatch<React.SetStateAction<string[]>>
      ) => {
        if (selectedList.includes(value)) {
          setSelected(selectedList.filter((v) => v !== value));
        } else {
          setSelected([...selectedList, value]);
        }
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
        navigator(POLICY_ABSOLUTE_PATH(plcyNo, plcyNm, keyword, String(selectedRegions), String(selectedCategories), String(currentPage), String(currentSection)));
    }; 

    // event handler: 스크랩 클릭 이벤트 처리 //
    const onScrapClickHandler = async (item: PolicyResult) => {
        const wasScrapped = scrapStates[item.plcyNo];
        const newState = !wasScrapped;
    
        setScrapStates(prev => {
            const updated = {
                ...prev,
                [item.plcyNo]: newState
            };
            localStorage.setItem('scrapStates', JSON.stringify(updated));
            return updated;
        });
    
        if (newState) {
            let periodFormat = `${item.startDate} ~ ${item.endDate}`;
            if (item.aplyPrdSeCd === '0057002' || item.aplyPrdSeCd === '0057003') {
                periodFormat = '상시';
            }
    
            onScrap?.({
                title: item.title,
                category: item.category,
                content: item.content,
                period: periodFormat
            });
        } else {
            const scrapMap = JSON.parse(localStorage.getItem('scrapMap') || '{}');
            const calendarSequence = scrapMap[item.title];

            if (calendarSequence) {
            try {
                const accessToken = cookies[ACCESS_TOKEN];
                const res = await deleteScheduleRequest(calendarSequence, accessToken);
                if (res?.code !== 'SU') {
                alert('일정 삭제 실패');
                return;
                }

                delete scrapMap[item.title];
                localStorage.setItem('scrapMap', JSON.stringify(scrapMap));
                calendarRef.current?.getApi().refetchEvents();

            } catch (err) {
                console.error('일정 삭제 중 오류:', err);
            }
            }
        }
    };
    

    // event handler: 검색어 변경 이벤트 처리 //
    const onKeywordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    // event handler: 검색버튼 클릭 이벤트 처리 //
    const onSearchClickHandler = () => {
        const query = new URLSearchParams();
        query.set("keyword", keyword);
        query.set("regions", selectedRegions.join(","));
        query.set("categories", selectedCategories.join(","));
        query.set("page", "1");
        query.set("section", "1");
      
        setOpenCategory(null);
        navigator(`?${query.toString()}`);
      };
      
 

    // effect: 렌더 시 실행 함수 //
    useEffect(() => {
        const query = new URLSearchParams(location.search);
      
        const newKeyword = query.get("keyword") || '';
        const newRegions = (query.get("regions") || "").split(",").filter(Boolean);
        const newCategories = (query.get("categories") || "").split(",").filter(Boolean);
      
        setKeyword(newKeyword);
        setSelectedRegions(newRegions);
        setSelectedCategories(newCategories);
        setCurrentPage(Number(query.get("page") || "1"));
        setCurrentSection(Number(query.get("section") || "1"));
      
        prevKeywordRef.current = newKeyword;
        prevRegionRef.current = [...newRegions];
        prevCategoryRef.current = [...newCategories];
      
        fetchSearchResults(newKeyword, newRegions, newCategories);
    }, [location.search]);

    // effect: 스크랩 로딩 함수 //
    useEffect(() => {
        const savedScrap = localStorage.getItem('scrapStates');
        if (savedScrap) {
            try {
                const parsed = JSON.parse(savedScrap);
                setScrapStates(parsed);
            } catch (e) {
                console.error("스크랩 로딩 실패:", e);
            }
        }
    }, []);

    return (
        <div id="policy-wrapper">
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="검색어 입력" value={keyword} 
                onChange={onKeywordChangeHandler} onKeyDown={(e) => e.key === 'Enter' && onSearchClickHandler()} />
                <div className="category-container">
                    <details className="filter-panel" open={openCategory === "region"}>
                        <summary onClick={(e) => {e.preventDefault(); toggleCategory("region");}} className={`filter ${openCategory === "region" ? "selected" : ""}`}>
                            지역 <img src={openCategory === "region" ? Minus : Plus} alt="plus" className="inline ml-1" />
                        </summary>
                        <div className="dropdown">
                            {['전국', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '충북', '충남', '전북', '전남', '경북', '경남', '제주'].map(region => (
                            <label key={region} className="block">
                                <input
                                type="checkbox"
                                checked={selectedRegions.includes(region)}
                                onChange={() =>
                                    handleCheckboxChange(region, selectedRegions, setSelectedRegions)
                                }
                                />
                                <span className="ml-2">{region}</span>
                            </label>
                            ))}
                        </div>
                    </details>
                    <details className="filter-panel" open={openCategory === "category"}>
                        <summary onClick={(e) => {e.preventDefault(); toggleCategory("category");}} className={`filter ${openCategory === "category" ? "selected" : ""}`}>
                            정책분야 <img src={openCategory === "category" ? Minus : Plus} alt="plus" className="inline ml-1" />
                        </summary>
                        <div className="dropdown">
                            {['일자리', '주거', '교육', '복지문화', '참여권리'].map(category => (
                                <label key={category} className="block">
                                    <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() =>
                                        handleCheckboxChange(category, selectedCategories, setSelectedCategories)
                                    }
                                    />
                                    <span className="ml-2">{category}</span>
                                </label>
                            ))}
                        </div>
                    </details>
                </div>
                <button className='button' onClick={() => onSearchClickHandler()}>검색</button>
            </div>
            <div className="search-result">총 {searchResults.length.toLocaleString()}건의 정책정보가 있습니다.</div>
            
            {isLoading ? (
            <div className="loading">정보를 불러오는 중&nbsp;&nbsp;<img src="https://i.gifer.com/ZKZg.gif"/></div>
            ) : (
            <div className="grid policy-card-container">
                {pagedItems.map((item) => (
                    <div key={item.id} className="policy-card-box">
                        <div className="remain">{calculateDDay(item.endDate)}
                            <img
                                src={scrapStates[item.plcyNo] ? ScrapActive : Scrap}
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
            </div> )}
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
