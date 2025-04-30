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
};

export default function Policy({ searchKeyword, page, section, autoSearch, items, onScrap} : Props) {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: navigator 상태 //
    const navigator = useNavigate();

    // state: location 상태 //
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    
    // state: calendar 연결 //
    const [scrapStates, setScrapStates] = useState<{ [id: number]: boolean }>({});
    
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
    const onSearchClickHandler = async (inputKeyword: string) => {
        try {
            const response = await axios.get<GetPolicyListResponseDto>('http://localhost:4000/api/v1/policy-list', {
            params: { keyword: inputKeyword, regions: selectedRegions.filter(Boolean).join(","), categories: selectedCategories.filter(Boolean).join(",") },
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
            
            const filteredResults = mappedResults.filter(item =>
                (selectedRegions.length === 0 || selectedRegions.includes(item.region)) &&
                (selectedCategories.length === 0 || selectedCategories.includes(item.category))
            );

            setSearchResults(filteredResults);

            const currentParams = new URLSearchParams(location.search);
            const isKeywordChanged = prevKeywordRef.current !== inputKeyword;
            const isRegionChanged = !arraysAreEqual(prevRegionRef.current, selectedRegions);
            const isCategoryChanged = !arraysAreEqual(prevCategoryRef.current, selectedCategories);

            if (isKeywordChanged || isRegionChanged || isCategoryChanged) {
                setCurrentPage(1);
                setCurrentSection(1);
                currentParams.set("page", "1");
                currentParams.set("section", "1");
            } else {
                currentParams.set("page", currentPage.toString());
                currentParams.set("section", currentSection.toString());
            }

            currentParams.set("keyword", inputKeyword);
            currentParams.set("regions", selectedRegions.join(","));
            currentParams.set("categories", selectedCategories.join(","));

            prevKeywordRef.current = inputKeyword;
            prevRegionRef.current = [...selectedRegions];
            prevCategoryRef.current = [...selectedCategories];

            navigator(`?${currentParams.toString()}`);

        } catch (error) {
            console.error("검색 오류:", error);
        }
    };
 

    // effect: 렌더 시 실행 함수 //
    useEffect(() => {
        const query = new URLSearchParams(location.search);
      
        const newKeyword = query.get("keyword") || '';
        const newPage = Number(query.get("page") || '1');
        const newSection = Number(query.get("section") || '1');
      
        const regionsRaw = query.get("regions") || query.get("regions") || "";
        const categoriesRaw = query.get("categories") || query.get("categories") || "";
      
        const newRegions = regionsRaw.split(",").filter(Boolean);
        const newCategories = categoriesRaw.split(",").filter(Boolean);
      
        setKeyword(newKeyword);
        setCurrentPage(newPage);
        setCurrentSection(newSection);
        setSelectedRegions(newRegions);
        setSelectedCategories(newCategories);

        prevKeywordRef.current = newKeyword;
        prevRegionRef.current = [...newRegions];
        prevCategoryRef.current = [...newCategories];
    }, [location.search]);      

    return (
        <div id="policy-wrapper">
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="검색어 입력" value={keyword} 
                onChange={onKeywordChangeHandler} onKeyDown={(e) => e.key === 'Enter' && onSearchClickHandler(keyword)} />
                <div className="category-container">
                    <details className="filter-panel">
                        <summary onClick={() => toggleCategory("region")} className={`filter ${openCategory === "region" ? "selected" : ""}`}>
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
                    <details className="filter-panel">
                        <summary onClick={() => toggleCategory("category")} className={`filter ${openCategory === "category" ? "selected" : ""}`}>
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
                <button className='button' onClick={() => onSearchClickHandler(keyword)}>검색</button>
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
