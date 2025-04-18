import { useEffect, useState } from "react"

// 전체 페이지
// 전체 리스트
// 전체 섹션
// 현재 페이지
// 현재 섹션
// 뷰 리스트
// 페이지 리스트

const ITEMS_PER_PAGE = 10;
const PAGES_PER_SECTION = 10;

const usePagination = <T>() => {
  // state: 페이지네이션 관련 상태 //
  const [totalList, setTotalList] = useState<T[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalSection, setTotalSection] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [viewList, setViewList] = useState<T[]>([]);
  const [pageList, setPageList] = useState<number[]>([]);

  // function: 전체 리스트 변경 함수 //
  // 전체 리스트가 변경되면 페이지와 섹션이 변경됨
  const init = (totalList: T[]) => {
    const totalLen = totalList.length;
    if (totalLen) {
      const totalPage = Math.ceil(totalLen / ITEMS_PER_PAGE);
      const totalSection = Math.ceil(totalPage / PAGES_PER_SECTION);
      setTotalPage(totalPage);
      setTotalSection(totalSection);
    } else {
      setTotalPage(1);
      setTotalSection(1);
    }

    setCurrentPage(1);
    setCurrentSection(1);
    
    initViewList(totalList);
  }

  // function: 뷰 리스트 변경 함수 //
  // 페이지를 선택하면 해당 페이지의 뷰 리스트로 변경됨
  const initViewList = (totalList:T[]) => {
    const totalLen = totalList.length;
    if (!totalLen) {
      setViewList([]);
      return;
    } 
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = currentPage * ITEMS_PER_PAGE > totalLen ? totalLen : currentPage * ITEMS_PER_PAGE;
    const viewList: T[] = totalList.slice(startIndex, endIndex);

    setViewList(viewList);
  }

  // function: 페이지 리스트 변경 함수 //
  const initPageList = (pageNumber: number) => {
    const endPage = PAGES_PER_SECTION * currentSection > totalPage ? totalPage : PAGES_PER_SECTION * currentSection;
    const startPage = PAGES_PER_SECTION * currentSection - (PAGES_PER_SECTION - 1);
    const pageList = [];
    for(let page = startPage; page <= endPage; page++){
      pageList.push(page);
    }
    setPageList(pageList);
  }

  // effect: 전체 리스트 변경시 실행될 함수 //
  useEffect(() => {
      init(totalList);
      initViewList(totalList);
  },[totalList]);

  // effect: 뷰 리스트 변경시 실행될 함수 //
  useEffect(() => {
    if(currentPage) initViewList(totalList);
  },[currentPage]);

  // effect: 페이지 리스트 변경시 실행될 함수 //
  useEffect(() => {
    if(totalPage) initPageList(totalPage);
  },[totalPage, currentSection]);

  return {
    currentPage, setCurrentPage,
    currentSection, setCurrentSection,
    totalSection,
    setTotalList,
    viewList, pageList, totalList
  }
}

export default usePagination;