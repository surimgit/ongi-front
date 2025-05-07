import React, { ChangeEvent, useEffect, useState } from 'react'
import "./style.css"
import { usePagination } from 'src/hooks';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, MY_GROUPBUYING_BUY_ABSOLUTE_PATH, MY_GROUPBUYING_SELL_ABSOLUTE_PATH, MY_GROUPBUYING_WISH_LIST_ABSOLUTE_PATH } from 'src/constants';
import { useNavigate } from 'react-router';
import MypageSidebar from 'src/layouts/MypageSidebar';
import Pagination from 'src/components/Pagination';
import MySale from 'src/types/interfaces/my-sale-interface';
import { getMySalesRequest, getProductOrderItemsRequest, postWaybillNumberRequest } from 'src/apis';
import GetMySalesResponseDto from 'src/apis/dto/response/user/get-my-sales.response.dto';
import { ResponseDto } from 'src/apis/dto/response';
import { responseMessage } from 'src/utils';
import GetOrderItemsResponseDto from 'src/apis/dto/response/user/get-order-items.response.dto';
import { OrderItems } from 'src/types/interfaces';
import { PostWaybillNumberRequestDto } from 'src/apis/dto/request/user';

interface SaleProps{
  sale: MySale;
  onWaybillClick: (sale: MySale) => void;
}

// component: 내 판매 상품 컴포넌트 //
function SalesItem({sale, onWaybillClick}: SaleProps) {

  const { category, name, price, productQuantity, boughtAmount, deadline, openDate, image, status } = sale;

  // variable: 판매율 변수 //
  const saleRate = Math.floor((boughtAmount / productQuantity) * 100).toLocaleString();

  // variable: 오픈 예정일 변수 //
  const open = !openDate ? "-" : openDate;

  // variable: 개당 가격 변수 //
  const pricePerPiece = Math.floor(price / productQuantity).toLocaleString();

  // render: 내 판매 상품 컴포넌트 렌더링 //
  return(
    <div className='tr'>
      <div className='td detail-box'>
        <div className='product-box'>
          <img src={image} alt='상품 이미지'/>
          <div className='product-info'>
            <div className='title'>{name}</div>
            <div className='price-box'>
              <div className='price'>{price.toLocaleString()}원</div>
              <div className='price'>개당 {pricePerPiece}원</div>
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
        {status === 'CLOSE' &&
          <div className='waybill-button' onClick={()=>onWaybillClick(sale)}>운송장 입력</div>
        }
      </div>
      <div className='td open-date'>{open}</div>
      <div className='td deadline'>{deadline}</div>
    </div>
  )
}

interface OrderItemProps{
  order: OrderItems;
  image: string;
  name: string;
  // onBackClickHandler: () => void;
}

// component: 상품 배송지 입력 컴포넌트 //
function OrderItem({order, image, name}:OrderItemProps){

  const {orderItemSequence, productSequence, quantity, waybillNumber, deliveryAddressSnapshot, approvedTime} = order;

  // state: 송장번호 상태 //
  const [waybillNumberInput, setWaybillNumberInput] = useState<string>('');

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: post waybill number response 처리 함수 //
  const postWaybillNumberResponse = (responseBody: ResponseDto | null) => {
    const {isSuccess, message} = responseMessage(responseBody);

    if(!isSuccess){
      alert(message);
      return;
    }

  }

  // event handler: 송장번호 입력 핸들러 //
  const onWaybillNumberChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget;
    setWaybillNumberInput(value);
  }

  // event handler: 송장번호 입력하기 버튼 클릭 핸들러 //
  const onWaybillButtonClickHandler = () => {
    
    const requestBody: PostWaybillNumberRequestDto = {
      orderItemSequence , waybillNumber: waybillNumberInput
    }

    postWaybillNumberRequest(requestBody, accessToken).then(postWaybillNumberResponse);
  }

  // render: 상품 배송지 입력 컴포넌트 렌더링 //
  return(
    <div className='tr'>
      <div className='td date'>{approvedTime.slice(0,16).replace('T', ' ')}</div>
      <div className='td detail-box'>
      <div className='product-box'>
          <img src={image} alt='상품 이미지'/>
          <div className='product-info'>
            <div className='title'>{name}</div>
          </div>
        </div>
      </div>
      <div className='td quantity'>{quantity}개</div>
      <div className='td delivery'>{deliveryAddressSnapshot}</div>
      <div className='td waybill-number'>
        {waybillNumber && 
          <div>{waybillNumber}</div>
        }
        {!waybillNumber && 
          <div>
            <input type='text' minLength={9} maxLength={14} value={waybillNumberInput} onChange={onWaybillNumberChangeHandler}/>
            <div className='waybill-button' onClick={onWaybillButtonClickHandler}>입력하기</div>
          </div>
        }
      </div>
    </div>
  )
}

// component: 내 판매목록 컴포넌트 //
export default function MySell() {
  
  // state: 페이지네이션 상태 //
  const { 
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList, totalList
  } = usePagination<MySale | OrderItems>();
  
  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // state: 구매 목록 상태 //
  const [saleList, setSaleList] = useState<MySale[]>([]);
  // state: 상품 주문 리스트 상태 //
  const [orderList, setOrderList] = useState<OrderItems[]>([]);
  // state: 판매 상품 운송장 입력 클릭 상태 //
  const [selectedSale, setSelectedSale] = useState<MySale | null>(null);


  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: navigator 함수 //
  const navigator = useNavigate();

  // function: get my sales response 함수 //
  const getMySalesResponse = (responseBody: GetMySalesResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess){
      alert(message);
      return;
    }

    const { mySales } = responseBody as GetMySalesResponseDto;
    setSaleList(mySales);
    setTotalList(saleList);
  }

  // function: get product order items response 함수 //
  const getProductOrderItemsResponse = (responseBody: GetOrderItemsResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess){
      alert(message);
      return;
    }

    const { orderItems } = responseBody as GetOrderItemsResponseDto;
    setOrderList(orderItems);
    setTotalList(orderList);
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

  // event handler: 배송지 입력 버튼 클릭 시 //
  const onWaybillClickHandler = (sale: MySale) => {
    setSelectedSale(sale);
    
    const productSequence = sale.sequence;
    
    getProductOrderItemsRequest(productSequence).then(getProductOrderItemsResponse);
  };

  // event handler: 뒤로가기 //
  const onBackClickHandler = () => {
    setSelectedSale(null);
  };

  // effect: 컴포넌트 렌더링 시 실행할 함수 //
  useEffect(() => {
    getMySalesRequest(accessToken).then(getMySalesResponse);
  },[])

  return (
    <div id='group-buying-main-wrapper'>
      <MypageSidebar/>
      <div className='body'>
          <div className='select-bar'>
            <div className='content' onClick={onWishListClickHandler}>찜한 목록</div>
            <div className='content' onClick={onMyBuyClickHandler}>구매목록</div>
            <div className='content active' onClick={onMySellClickHandler}>판매목록</div>
          </div>
          {selectedSale === null ? 
            <>
            <div className='sale-list-table'>
              <div className='tr'>
                <div className='th detail-box'>상품 정보</div>
                <div className='th quantity'>수량</div>
                <div className='th amount'>주문율</div>
                <div className='th open-date'>오픈 예정일</div>
                <div className='th deadline'>마감기한</div>
              </div>
              {saleList.map((sale, index) => (
              <SalesItem key={index} sale={sale} onWaybillClick={onWaybillClickHandler} />
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
          </>
          :
          <>
            <div className='order-list-table'>
              <div className='tr'>
                <div className='th date'>주문 날짜</div>
                <div className='th detail-box'>상품 정보</div>
                <div className='th quantity'>수량</div>
                <div className='th delivery'>배송 주소</div>
                <div className='th waybill-number'>송장번호 입력</div>
              </div>
              {orderList.map((order, index) => (
              <OrderItem key={index} order={order} image={selectedSale?.image} name={selectedSale?.name} />
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
          </>
          }
          {}
          
      </div>
      
    </div>
  )
}
