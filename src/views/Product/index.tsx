import React, { useEffect, useState } from 'react'
import "./style.css"
import { getProductRequest } from 'src/apis';
import { GetProductResponseDto, ResponseDto } from 'src/apis/dto/response';
import { responseMessage } from 'src/utils';
import { Product } from 'src/types/interfaces';
import { useNavigate } from 'react-router';
import { PRODUCT_WRITE_PATH } from 'src/constants';
import Pagination from 'src/components/Pagination';
import { usePagination } from 'src/hooks';
import Sort from 'src/types/aliases/sort.alias';

interface TableItemProps {
  product: Product;
}

// function: 마감까지 남은 시간 처리 함수 //
const getTimeUntilDeadLine = (deadline: string | Date) => {
  const today = new Date();
  const target = new Date(deadline)

  const diff = target.getTime() - today.getTime();
  if(diff <= 0) return 0;

 
  return diff;
}

// component: 상품 테이블 레코드 컴포넌트 //
function TableItem({product, index}: TableItemProps & {index: number}){
  const { image, name, price, rating, purchasedPeople, productQuantity, boughtAmount, deadline, productRound } = product;

  // state: 모집 완료 여부 상태 //
  const [isFinish, setIsFinish] = useState<boolean>(false);
  // state: 잔여 상품수 상태 //
  const [remainingProducts, setRemainingProducts] = useState<number>(productQuantity);
  // state: 달성율 상태 //
  const [achievementRate, setAchievementRate] = useState<number>(0);
  // state: 마감기한 상태 //
  const [remainingTime, setRemainingTime] = useState<number>(0);

  if(remainingProducts === 0) setIsFinish(true);

  const borderTopStyle = index === 0 ? {borderTop: '3px solid #000'} : {};
  
  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: 요일 변환 함수 //
  const changeDateFormat = (diff: number) => {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.ceil((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.ceil(((diff % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}일 ${hours}시간 ${minutes}분 남음`;
  }; 

  // event handler: 테이블 클릭 이벤트 핸들러 //
  const onClick = () => {
    // navigator(PRODUCT_VIEW_ABSOLUTE_PATH(sequence));
  }

  return (
    <div className='tr' style={borderTopStyle} onClick={onClick}>
      <div className='td image'>
        <img src={image} alt='업로드된 이미지'/>
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
      <div className='td deadline-box'>
        <div className='deadline-title color'>마감까지</div>
        <div className='deadline-title normal'>{changeDateFormat(getTimeUntilDeadLine(deadline))}</div>
      </div>
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

  // state: 정렬 상태 //
  const [sort, setSort] = useState<Sort>('');

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
    const { products } = responseBody as GetProductResponseDto;
    setTotalList(products);
  }

  // event handler: 작성 버튼 클릭 이벤트 핸들러 //
  const onWriteClickHandler = () => {
    navigator(PRODUCT_WRITE_PATH);
  }

  // event handler: 정렬방식 클릭 이벤트 핸들러 //
  const onSortChangeHandler = (sort: Sort) => {
    console.log(sort);
    setSort(sort);
  }

  
  // effect: 정렬 방식 변경 시 실행할 함수 //
  useEffect(() => {
    const sortedProducts = [...totalList];
    if(sort === '마감임박'){
      sortedProducts.sort((a, b) => {
        const timeA = getTimeUntilDeadLine(a.deadline);
        const timeB = getTimeUntilDeadLine(b.deadline);

        return timeA - timeB;
      })
    } else {
      sortedProducts.sort((a, b) => b.purchasedPeople - a.purchasedPeople);
    }

    setTotalList(sortedProducts);
  },[sort]);

  // effect: 컴포넌트 로드 시 실행할 함수 //
  useEffect(() => {
    getProductRequest().then(getProductResponse);
  },[])
  
  // render: 공동구매 메인 화면 컴포넌트 렌더링 //
  return (
    <div id='product-main-wrapper'>
      <div className='main-container'>
        <div className='main-title'>
          <div className='main-title color'>공동구매</div>
          <div className='main-title normal'>게시판</div>
        </div>
        <div className='filter-container'>
          <div className='category-box'>
            <div className='title'>카테고리</div>
            <select>
              <option value='전체'>전체</option>
              <option value='건강식품'>건강식품</option>
              <option value='패션의류'>패션의류</option>
              <option value='스포츠'>스포츠</option>
              <option value='식품'>식품</option>
              <option value='뷰티'>뷰티</option>
            </select>
          </div> 
          <div className='search-box'>
            <input type='text'/> 
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
          <div className='search-button'>검색</div>
          <div className='write-button' onClick={onWriteClickHandler}>작성</div>
          </div>
        </div>
        <div className='product-list-container'>
          <div className='product-list-table'>
            {viewList.map((product, index) => (<TableItem key={product.sequence} product={product} index={index}/>))}
          </div>
        </div>
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
      </div>
    </div>
  )
}

