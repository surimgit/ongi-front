import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { getProductDetailRequest, getShoppingCartRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import { GetShoppingCartResponseDto } from 'src/apis/dto/response/shoppingCart';
import { ACCESS_TOKEN } from 'src/constants';
import { ShoppingCart } from 'src/types/interfaces';
import { responseMessage } from 'src/utils';

import "./style.css"

interface TableItemProps {
  shoppingCart: ShoppingCart;
}

// component: 장바구니 테이블 레코드 컴포넌트 //
function ShoppingCartContent({shoppingCart} : TableItemProps) {

  const { name, price, quantity, image } = shoppingCart;

  // state: 상품 개수 상태 //
  const [productQuantity, setProductQuantity] = useState<number>(quantity);

  // state: 총 가격 상태 //
  const [totalPrice, setTotalPrice] = useState<number>(price * quantity);
  
  // event handler: 개수 증가 버튼 클릭 핸들러 //
  const onQuantityIncreaseButtonClickHandler = () => {
    setProductQuantity(productQuantity + 1);
  }

  // event handler: 개수 감소 버튼 클릭 핸들러 //
  const onQuantityDecreaseButtonClickHandler = () => {
    if(productQuantity > 1) setProductQuantity(productQuantity - 1);
  }

  useEffect(() => {
    setTotalPrice(price * productQuantity);
  },[productQuantity])

  // render: 장바구니 테이블 레코드 컴포넌트 렌더링 //
  return (
    <div className='product-container'>
      <div className='select-button'></div>
      <div className='product-content-container'>
        <div className='product-img'>
         <img src={image} alt='상품 이미지' style={{backgroundSize:'cover'}}/>
        </div>
        <div className='product-content-box'>
          <div className='product-title'>{name}</div>
          <div className='product-update-box'>
            <div className='minus-button' onClick={onQuantityDecreaseButtonClickHandler}></div>
            <div className='product-quantity'>{productQuantity}</div>
            <div className='plus-button' onClick={onQuantityIncreaseButtonClickHandler}></div>
          </div>
        </div>
        <div className='price-box'>
            <div className='price'>개당 {price.toLocaleString()}원</div>
            <div className='price'>총 {(totalPrice).toLocaleString()}원</div>
          </div>
      </div>
    </div>
  )
}

// component: 장바구니 메인 화면 컴포넌트 //
export default function ShoppingCartMain() {

  // state: 쿠키 상태 //
  const [cookies] = useCookies();
  // state: 장바구니 상태 //
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart[]>([]);

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: get shopping cart response 함수 //
  const GetShoppingCartResponse = (responseBody: GetShoppingCartResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess) {
      alert(message);
      return;
    }

    const { shoppingCarts } = responseBody as GetShoppingCartResponseDto;
    setShoppingCart(shoppingCarts);
  }

  // effect: 컴포넌트 렌더시 실행할 함수 //
  useEffect(() => {
    getShoppingCartRequest(accessToken).then(GetShoppingCartResponse);
  },[]);

  // render: 장바구니 메인 화면 컴포넌트 렌더링 //
  return (
    <div id='shopping-cart-main-wrapper'>
      <div className='shopping-cart-container'>
        <div className='shopping-cart-banner'>
          <div className='title'>장바구니</div>
          <div className='progress-box'>
            <div className='sub-title active'>장바구니 &gt; </div>
            <div className='sub-title'>주문/결제 &gt; </div>
            <div className='sub-title'>주문완료</div>
          </div>
        </div>
        <div className='content-container'>
          <div className='cart-content-container'>
            <div className='select-container'>
              <div className='select-box'>
                <div className='select-button'></div>
                <div className='select-title'>전체 선택</div>
              </div>
              <div className='delete-button'>선택 삭제</div>
            </div>
            {shoppingCart.map((cart, index) => <ShoppingCartContent key={index} shoppingCart={cart}/>)}
          </div>
          <div className='payment-content-container'>
            <div className='payment-content-box'>
              <div className='price-title'>최종 결제 금액</div>
              <div className='payment-content'>
                <div className='price-box'>
                  <div className='price-content'>
                    <div className='title'>주문 금액</div>
                    <div className='price'>102,000원</div>
                  </div>
                  <div className='price-content'>
                    <div className='title'>할인 금액</div>
                    <div className='price'>0원</div>
                  </div>
                </div>
                <div className='price-content'>
                  <div className='title primary'>총 결제 금액</div>
                  <div className='title primary'>102,000원</div>
                </div>
              </div>
            </div>

            <div className='payment-button'>주문하기(3개)</div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
