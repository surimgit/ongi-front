import React, { useEffect, useState } from 'react'
import './style.css';
import MypageSidebar from 'src/layouts/MypageSidebar';
import { usePagination } from 'src/hooks';
import WishList from 'src/types/interfaces/wish-list.interface';
import { getWishListRequest } from 'src/apis';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, MY_GROUPBUYING_BUY_ABSOLUTE_PATH, MY_GROUPBUYING_SELL_ABSOLUTE_PATH, MY_GROUPBUYING_WISH_LIST_ABSOLUTE_PATH, PRODUCT_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { GetWishListResponseDto, ResponseDto } from 'src/apis/dto/response';
import { responseMessage } from 'src/utils';
import { useNavigate } from 'react-router';
import Pagination from 'src/components/Pagination';

interface ProductItemProps {
  wish: WishList
}

// component: 찜 상품 컴포넌트 //
function ProductItem({
  wish 
}: ProductItemProps) {
  const { name, price, sequence, remainingProducts, deadline, openDate, soldOut, image } = wish;

  // variable: 이미지 클래스 //
  const imageClass = !soldOut ? 'td name-box expired' : 'td name-box'

  // function: navigator 함수 //
  const navigator = useNavigate();
  
  // event handler: 상품 클릭 이벤트 핸들러 //
  const onProductClickHandler = () => {
    navigator(PRODUCT_VIEW_ABSOLUTE_PATH(sequence));
  }

  return (
    <div className='tr' onClick={onProductClickHandler}>
      <div className={imageClass}>
        <img src={image} alt='상품 사진'/>
        {!soldOut && 
          <div className='img-text'>
            <p>마감</p>
          </div>
        }
        
        <div className='detail-box'>
          <div className='name'>{name}</div>
          <div className='amount'>{price.toLocaleString()}원</div>
        </div>
      </div>
      <div className='td quantity'>{remainingProducts.toLocaleString()}개</div>
      <div className='td date'>{deadline}</div>
    </ div>
  );
}


// component: 찜한 목록 컴포넌트 //
export default function WishLists() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 페이지네이션 상태 //
  const { 
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList, totalList
  } = usePagination<WishList>();

  // state: 찜 목록 상태 //
  const [wishList, setWishList] = useState<WishList[]>([]);

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: navigator 함수 //
  const navigator = useNavigate();

  // function: get wish list response 함수 //
  const getWishListResponse = (responseBody: GetWishListResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess){
      alert(message);
      return;
    }

    const { wishListEntities } = responseBody as GetWishListResponseDto;
    
    setTotalList(wishListEntities);
  }
  
  // event handler: 찜 목록 클릭 이벤트 핸들러 //
  const onWishListClickHandler = () => {
    navigator(MY_GROUPBUYING_WISH_LIST_ABSOLUTE_PATH);
  }
  // event handler: 구매 목록 클릭 이벤트 핸들러 //
  const onMyBuyClickHandler = () => {
    navigator(MY_GROUPBUYING_BUY_ABSOLUTE_PATH);
  }
  // event handler: 판매 목록 클릭 이벤트 핸들러 //
  const onMySellClickHandler = () => {
    navigator(MY_GROUPBUYING_SELL_ABSOLUTE_PATH);
  }
  
  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    getWishListRequest(accessToken).then(getWishListResponse);
  },[])

  // render: 찜한 목록 컴포넌트 렌더링 //
  return (
    <div id='wish-list-main-wrapper'>
      <MypageSidebar/>
      <div className='body'>
          <div className='select-bar'>
            <div className='content active' onClick={onWishListClickHandler}>찜한 목록</div>
            <div className='content' onClick={onMyBuyClickHandler}>구매목록</div>
            <div className='content' onClick={onMySellClickHandler}>판매목록</div>
          </div>
          <div className='product-list-table'>
            <div className='tr'>
              <div className='th name-box'>상품명</div>
              <div className='th quantity'>잔여수량</div>
              <div className='th date'>마감일자</div>
            </div>
            {totalList.map((wish, index) => (
            <ProductItem key={index} wish={wish} />
            ))}
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
