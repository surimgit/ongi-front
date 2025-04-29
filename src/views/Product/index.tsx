import React, { ChangeEvent, useEffect, useState } from 'react'
import "./style.css"
import { getProductCategoryRequest } from 'src/apis';
import { GetProductResponseDto, ResponseDto } from 'src/apis/dto/response';
import { responseMessage } from 'src/utils';
import { Product } from 'src/types/interfaces';
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, PRODUCT_VIEW_ABSOLUTE_PATH, PRODUCT_WRITE_PATH } from 'src/constants';
import Pagination from 'src/components/Pagination';
import { usePagination } from 'src/hooks';
import Sort from 'src/types/aliases/sort.alias';
import { Category } from 'src/types/aliases';
import { useCookies } from 'react-cookie';

interface TableItemProps {
  product: Product;
}

const categoryList:Category[] = [
  '전체',
  '가전제품',
  '건강식품',
  '패션의류',
  '스포츠',
  '식품',
  '뷰티',
  '기타'
]

// function: 마감까지 남은 시간 처리 함수 //
const getTimeUntilDeadLine = (deadline: string | Date) => {
  const today = new Date();
  const target = new Date(deadline)

  const diff = target.getTime() - today.getTime();
  if(diff <= 0) return 0;
 
  return diff;
}

// function: 현재 날짜 구하기 함수 //
const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// component: 상품 테이블 레코드 컴포넌트 //
function TableItem({product, index}: TableItemProps & {index: number}){
  const { sequence, image, name, price, rating, productQuantity, boughtAmount, deadline, openDate } = product;

  // state: 모집 완료 여부 상태 //
  const [isFinish, setIsFinish] = useState<boolean>(false);
  // state: 잔여 상품수 상태 //
  const [remainingProducts, setRemainingProducts] = useState<number>(productQuantity);
  // state: 달성율 상태 //
  const [achievementRate, setAchievementRate] = useState<number>(Math.floor((boughtAmount / productQuantity) * 100));
  // state: 마감기한 상태 //
  const [remainingTime, setRemainingTime] = useState<number>(getTimeUntilDeadLine(deadline));
  
  // variable: 상품 이미지 클래스 //
  const imageClass = remainingTime === 0 ? 'td image expired' : 'td image';
  // variable: 오픈 예정 여부 클래스 //
  const isOpen = openDate === null ? true : openDate <= getToday() ? true : false;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: 요일 변환 함수 //
  const changeDateFormat = (diff: number) => {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor(((diff % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}일 ${hours}시간 ${minutes}분 남음`;
  }; 

  // event handler: 테이블 클릭 이벤트 핸들러 //
  const onClick = () => {
    if(isFinish) {
      alert('마감된 상품입니다!');
      return;
    }
    navigator(PRODUCT_VIEW_ABSOLUTE_PATH(sequence));
  }

  useEffect(() => {
    setRemainingProducts(remainingProducts - boughtAmount);
    setAchievementRate(Math.floor((boughtAmount / productQuantity) * 100));
  },[boughtAmount, productQuantity])

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getTimeUntilDeadLine(deadline));
    }, 1000 * 60);

    return () => clearInterval(interval);
  },[deadline]);

  useEffect(() => {
    if(remainingProducts === 0 || remainingTime === 0) setIsFinish(true);
  },[])

  return (
    <div className='tr' onClick={onClick}>
      <div className={imageClass}>
        <img src={image} alt='업로드된 이미지'/>
        {isFinish && 
          <div className='img-text'>
            <p>마감</p>
          </div>
        }
      </div>
      <div className='td content-box' >
        <div className='content-title'>{name}</div>
        <div className='content-price'>{price.toLocaleString()}원</div>
        <div className='content-state'>
          <div className='rating-box'>
            <div className='star'></div>
            <div className='rating'>{rating.toFixed(1)}점</div>
          </div>
          
          <div className='engagement-rate'>잔여 {remainingProducts}개</div>
          <div className='achievement-rate'>{achievementRate}% 달성</div>
        </div>
      </div>
      {isOpen && 
        <div className='td deadline-box'>
          <div className='deadline-title color-title'>마감까지</div>
          <div className='deadline-title normal'>{changeDateFormat(remainingTime)}</div>
        </div>
      }
      {!isOpen &&
        <div className='td deadline-box'>
          <div className='deadline-title color-title'>오픈예정</div>
          <div className='deadline-title normal'>{openDate}</div>
        </div>
      }
      
    </div>
  )
}

// component: 공동구매 메인 화면 컴포넌트 //
export default function ProductMain() {

  
  // state: 페이지네이션 상태 //
  const { 
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList, totalList
  } = usePagination<Product>();

  // state: cookie 상태 //
  const [cookies] = useCookies();
  // state: 정렬 상태 //
  const [sort, setSort] = useState<Sort>('');
  // state: 카테고리 상태 // 
  const [category, setCategory] = useState<Category>('전체');
  // state: 검색어 입력 상태 //
  const [searchName, setSearchName] = useState<string>('');
  // state: 검색어 상태 //
  const [name, setName] = useState<string>('');
  // state: 빈 리스트 반환시 문자열 상태 //
  const [filterMessage, setFilterMessage] = useState<string>('');

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 정렬방식 클래스 //
  const sortDeadlineClass = 
    sort === '마감임박' ? 'sort-content active' : 'sort-content';
  const sortHotClass = 
    sort === '인기' ? 'sort-content active' : 'sort-content';

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get product response 처리 함수 //
  const getProductResponse = (responseBody: GetProductResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess) {
      alert(message);
      return;
    }
    const { products, filterType } = responseBody as GetProductResponseDto;
    if(products.length === 0){
      if(filterType === 'categoryAndName') setFilterMessage(`${category}에 ${name}이(가) 포함된 상품이 없습니다!!`);
      else if(filterType === 'category') setFilterMessage(`${category} 상품이 없습니다!!`);
      else if(filterType === 'name') setFilterMessage(`${name}이(가) 포함된 상품이 없습니다!!`);
      else setFilterMessage(`등록된 상품이 없습니다!!`);
    }else setFilterMessage('');
    

    setTotalList(products);
  }

  // function: filter type 처리 함수 //
  const filter = () => {

  }

  // event handler: 작성 버튼 클릭 이벤트 핸들러 //
  const onWriteClickHandler = () => {
    navigator(PRODUCT_WRITE_PATH);
  }

  // event handler: 검색 버튼 클릭 이벤트 핸들러 //
  const onSearchClickHandler = () => {
    setName(searchName);
  }

  // event handler: 정렬방식 변경 이벤트 핸들러 //
  const onSortChangeHandler = (sort: Sort) => {
    setSort(sort);
  }
  
  // event handler: 카테고리 변경 이벤트 핸들러 //
  const onCategoryChangeHandler = (e:ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;

    setCategory(value as Category);
  }

  // event handler: 검색어 변경 이벤트 핸들러 //
  const onSearchNameChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setSearchName(value);
  }

  // effect: 정렬 방식 변경 시 실행할 함수 //
  useEffect(() => {
    const sortedProducts = [...totalList];
    if(sort === '마감임박'){
      sortedProducts.sort((a, b) => {
        const timeA = getTimeUntilDeadLine(a.deadline);
        const timeB = getTimeUntilDeadLine(b.deadline);

        if(timeA === 0 && timeB !== 0) return 1;
        if(timeA !== 0 && timeB === 0) return -1;
        return timeA - timeB;
      })
    } else {
      sortedProducts.sort((a, b) => {
        const timeA = getTimeUntilDeadLine(a.deadline);
        const timeB = getTimeUntilDeadLine(b.deadline);

        if(timeA === 0 && timeB !== 0) return 1;
        if(timeA !== 0 && timeB === 0) return -1;
        return b.boughtAmount - a.boughtAmount});
    }

    setTotalList(sortedProducts);
  },[sort]);

  // effect: 카테고리 변경 시 실행할 함수 //
  useEffect(() => {
    getProductCategoryRequest(category, name, accessToken).then(getProductResponse);
  },[category, name]);

  // render: 공동구매 메인 화면 컴포넌트 렌더링 //
  return (
    <div id='product-main-wrapper'>
      <div className='main-container'>
        <div className='main-title'>
          <div className='main-title color-title'>공동구매</div>
          <div className='main-title normal'>게시판</div>
        </div>
        <div className='filter-container'>
          <div className='category-box'>
            <div className='title'>카테고리</div>
            <select onChange={onCategoryChangeHandler}>
              {categoryList.map((category, index) => (<option key={index} value={category} >{category}</option>))}
            </select>
          </div> 
          <div className='search-box'>
            <input value={searchName} onChange={onSearchNameChangeHandler} type='text'/> 
          </div>
          <div className='sort-box'>
            <div className='title'>정렬방식</div>
            <div className='sort-content-list'>
              <div className={sortDeadlineClass} onClick={() => onSortChangeHandler('마감임박')}>마감임박</div>
              |
              <div className={sortHotClass} onClick={() => onSortChangeHandler('인기')}>인기</div>
            </div>
          </div>
          <div className='button-box'>
          <div className='search-button' onClick={onSearchClickHandler}>검색</div>
          <div className='write-button' onClick={onWriteClickHandler}>작성</div>
          </div>
        </div>
        <div className='product-list-container'>
          <div className='product-list-table'>
            {totalList.length !== 0 && 
              viewList.map((product, index) => (<TableItem key={product.sequence} product={product} index={index}/>))
            }
            {totalList.length === 0 &&
              <div className='no-category-product'>{filterMessage}</div>
            }
          </div>
        </div>
        {totalList.length !== 0 &&

        <div className='pagination-container'>
          {totalSection !== 0 &&
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              pageList={pageList}
              totalSection={totalSection}
            />
          }
        </div>
        }
        
      </div>
    </div>
  )
}

