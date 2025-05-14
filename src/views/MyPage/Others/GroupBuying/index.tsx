import React, { useEffect, useState } from 'react'
import './style.css';
import { MySale } from 'src/types/interfaces';
import { usePagination } from 'src/hooks';
import { MY_GROUPBUYING_BUY_ABSOLUTE_PATH, MY_GROUPBUYING_SELL_ABSOLUTE_PATH, MY_GROUPBUYING_WISH_LIST_ABSOLUTE_PATH, PRODUCT_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { useNavigate, useParams } from 'react-router';
import { ResponseDto } from 'src/apis/dto/response';
import { getOtherUserGroupProductRequest } from 'src/apis';
import GetMySalesResponseDto from 'src/apis/dto/response/user/get-my-sales.response.dto';
import { responseMessage } from 'src/utils';
import Pagination from 'src/components/Pagination';
import OtherSidebar from 'src/layouts/OtherUserSidebar';

interface ProductItemProps {
  sale: MySale;
}

// component: 공구 게시글 테이블 레코드 컴포넌트 //
function ProductItem({
  sale
}: ProductItemProps){
  const {sequence ,image, name, price, status, openDate, productQuantity, deadline, boughtAmount} = sale;

  // state: 타입 상태 //
  const type: 'selling' | 'selled' = status === 'CLOSE' ? 'selled' : 'selling';

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // variable: 판매율 변수 //
  const saleRate = Math.floor((boughtAmount / productQuantity) * 100).toLocaleString();

  // variable: 오픈 예정일 변수 //
  const open = !openDate ? "-" : openDate;


  // event handler: 판매 목록 상품 클릭 이벤트 핸들러 //
  const onProductClickHandler = () => {
    navigator(PRODUCT_VIEW_ABSOLUTE_PATH(sequence))
  }

  return(
    <div className={`tr ${type === 'selled' ? 'faded' : ''}`}>
      <div className='td detail-box' onClick={onProductClickHandler}>
        <div className='product-box'>
          <img src={image} alt='상품 이미지' />
          <div className='product-info'>
            <div className='title'>{name}</div>
            <div className='price-box'>
              <div className='price'>총 {(price * productQuantity).toLocaleString()}원</div>
              <div className='price'>개당 {price.toLocaleString()}원</div>
            </div>
          </div>
        </div>
      </div>
      <div className='td quantity'>총 {productQuantity}개</div>
      <div className='td amount'>
        <div className='amount-box'>
          <div className='quantity'>{boughtAmount}개 판매</div>
          <div className='rate'>{saleRate}%</div>
        </div>
      </div>
      <div className='td open-date'>{open}</div>
      <div className='td deadline'>{deadline}</div>
    </div>
  )
}

// component: 다른 사용자 상품 목록 컴포넌트 //
export default function OtherUserGroupBuying() {

  // state: 경로 변수 상태
  const { userId } = useParams();

  // state: 구매 목록 상태 //
  const [saleList, setSaleList] = useState<MySale[]>([]);
  const [isSelling, setIsSelling] = useState(true); // 판매중 상태

  // 판매 대기 또는 판매 완료 상태 변경 함수
  const toggleSaleStatus = () => {
    setIsSelling((prevStatus) => !prevStatus);
  };

  // 판매중/판매완료 상태에 맞게 필터링된 리스트
  const filteredSaleList = saleList.filter((sale) => {
    if (isSelling) {
      return sale.status !== 'CLOSE'; // 판매중
    } else {
      return sale.status === 'CLOSE'; // 판매 완료
    }
  });

  // state: 페이지네이션 상태 //
  const { 
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList, totalList
  } = usePagination<MySale>();

  // function: navigator 함수 //
  const navigator = useNavigate();
  
  // function: get other user group product response 함수 //
  const getOtherUserGroupProductResponse = (responseBody: GetMySalesResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess){
      alert(message);
      return;
    }

    const { mySales } = responseBody as GetMySalesResponseDto;
    setSaleList(mySales);
    setTotalList(saleList);
  }

  // effect: 컴포넌트 렌더링 시 실행할 함수 //
  useEffect(() => {
    if(!userId) return;
    getOtherUserGroupProductRequest(userId).then(getOtherUserGroupProductResponse);
  },[])

  return (
    <div id='group-buying-main-wrapper'>
      <OtherSidebar/>
      <div className='body'>
          <div className='select-bar'>
            <div className={`content ${isSelling ? 'active' : ''}`} onClick={toggleSaleStatus}>
              판매중
            </div>
            <div className={`content ${!isSelling ? 'active' : ''}`} onClick={toggleSaleStatus}>
            판매완료
          </div>
          </div>
          <div className='sale-list-table'>
            <div className='tr'>
                <div className='th detail-box'>상품 정보</div>
                <div className='th quantity'>수량</div>
                <div className='th amount'>주문율</div>
                <div className='th open-date'>오픈 예정일</div>
                <div className='th deadline'>마감기한</div>
            </div>
            {filteredSaleList.map((sale, index) => (
            <ProductItem key={index} sale={sale}/>
            ))}
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
