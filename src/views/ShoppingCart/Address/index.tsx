import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import ShoppingCartLayout from 'src/components/ShoppingCart';
import { PostOrderRequestDto } from 'src/apis/dto/request/payment';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { postOrderRequest } from 'src/apis'
import { ACCESS_TOKEN, PAYMENTS_ABSOLUTE_PATH, SHOPPING_CART_ADDRESS_ABSOLUTE_PATH } from 'src/constants';
import { useNavigate } from 'react-router';

import './style.css';
import useShoppingCartSelectStore from 'src/hooks/cart-select.hook';
import { ShoppingCart } from 'src/types/interfaces';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'src/apis/dto/response';
import { responseMessage } from 'src/utils';

// component: 장바구니 주문/결제 페이지 컴포넌트 //
export default function ShoppingCartAddress() {

  const { getSelectedIds, getShoppingCarts } = useShoppingCartSelectStore();

  // state: 배송지 선택 상태 //
  const [addressType, setAddressType] = useState<string>('기존');
  // state: 배송지명 상태 //
  const [addressName, setAddressName] = useState<string>('');
  // state: 받는 사람 상태 //
  const [orderPeople, setOrderPeople] = useState<string>('');
  // state: 전화번호 상태 //
  const [userPhoneNumber, setUserPhoneNumber] = useState<string[]>(['010', '', '']);
  // state: 배송지 우편번호 상태 //
  const [userZonecode, setUserZonecode] = useState<string>('');
  // state: 배송지 상태 //
  const [userAddress, setUserAddress] = useState<string>('');
  // state: 상세 배송지 상태 //
  const [userDetailAddress, setUserDetailAddress] = useState<string>('');
  // state: 장바구니 선택 상품 상태 //
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart[]>([]);
  // state: 총 주문금액 상태 //
  const [totalPrice, setTotalPrice] = useState<number>(0);
  // state: 쿠키 상태 //
  const [cookies] = useCookies();
  
  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 배송지 선택 상태 클래스 //
  const newAddressTypeClass = addressType === '신규' ? 'select-img active' : 'select-img';
  const existAddressTypeClass = addressType === '기존' ? 'select-img active' : 'select-img';
  // variable: 장바구니 변수 //
  const raw = localStorage.getItem("storedShoppingCart");
  // variable: 선택된 상품 번호 배열 //
  const selectedIds = getSelectedIds();

  // function: navigator 함수//
  const navigator = useNavigate();

  // function: 다음 포스트 코드 팝업 오픈 함수 //
  const open = useDaumPostcodePopup();

  // function: 다음 포스트 코드 완료 처리 함수 //
  const daumPostCompleteHandler = (data: Address) => {
    const { address, zonecode } = data;
    setUserAddress(address);
    setUserZonecode(zonecode);
  };

  // function: 주문번호 생성 함수 //
  const createOrderId = (length: number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ0123456789-_';
    let result = '';
    for(let i = 0; i < length; i++){
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }

  const postOrderResponse = (responseBody: ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess) {
      alert(message);
      return;
    }

    navigator(PAYMENTS_ABSOLUTE_PATH);
  }

  // event handler: 배송지 선택 변경 이벤트 핸들러 //
  const onAddressTypeClickHandler = (type: string) => {
    setAddressType(type);
  }
  // event handler: 배송지명 변경 이벤트 핸들러 //
  const onAddressNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAddressName(value);
  }
  // event handler: 수신자명 변경 이벤트 핸들러 //
  const onOrderPeopleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOrderPeople(value);
  }
  // event handler: 전화번호 변경 이벤트 핸들러 //
  const onTelNumberChangeHandler = (index:number) => (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if(index === 0 || /^\d{0,4}$/.test(value)) {
      const newPhoneNumber = [...userPhoneNumber];
      newPhoneNumber[index] = value;
      setUserPhoneNumber(newPhoneNumber);
    }
  }

  // event handler: 주소 검색 버튼 클릭 이벤트 핸들러 //
  const onSearchAddressClickHandler = () => {
    open({ onComplete:daumPostCompleteHandler });
  }
  // event handler: 수신자명 변경 이벤트 핸들러 //
  const onDetailAddressChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserDetailAddress(value);
  }

  // event handler: 결제하기 버튼 클릭 이벤트 핸들러 //
  const onPaymentClickHandler = () => {

    const orderId = createOrderId(64);
    const phoneNumber = userPhoneNumber.reduce((acc, val) => (acc+val));

    const requestBody: PostOrderRequestDto = {
      orderId, amount:totalPrice, buyerAddress: userAddress + userDetailAddress, phoneNumber, userName:orderPeople, 
    }

    postOrderRequest(requestBody, accessToken).then(postOrderResponse);
  }

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(raw){
      const shoppingCart = JSON.parse(raw);
      setShoppingCart(shoppingCart);

      const totalPrice = shoppingCart.reduce((total: number, value:ShoppingCart) => total += value.price * value.quantity ,0);
      setTotalPrice(totalPrice);
    }
  },[])

  const cartContent = (
      <div className='shopping-cart-address-container'>
        <div className='address-container'>
          <div className='title'>배송지 정보</div>
          <div className='address-box-container'>
          <div className='address-box'>
            <div className='address-box-title'>배송지 선택</div>
            <div className='address-select-box-content'>
              <div className='address-select-box'>
                <div className='select-box'>
                  <div className={existAddressTypeClass} onClick={() => onAddressTypeClickHandler('기존')}></div>
                  <div className='select-content'>기존 배송지</div>
                </div>
                <div className='select-box'>
                  <div className={newAddressTypeClass} onClick={() => onAddressTypeClickHandler('신규')}></div>
                  <div className='select-content'>신규 배송지</div>
                </div>
              </div>
              {addressType === '기존' &&
                <select>
                  <option value='집'>집</option>
                </select>
              }
            </div>
          </div>
          <div className='address-box'>
            <div className='address-box-title'>배송지명</div>
            <div className='address-box-content'>
              {addressType === '기존' ? <div>집</div> :
                <input type='text' className='input name' value={addressName} onChange={onAddressNameChangeHandler}/>
              }
            </div>
          </div>
          <div className='address-box'>
            <div className='address-box-title'>받는분</div>
            <div className='address-box-content'>
              <input type='text' className='input name' value={orderPeople} onChange={onOrderPeopleChangeHandler}/>
            </div>
          </div>
          <div className='address-box'>
            <div className='address-box-title'>연락처</div>
            <div className='address-box-content'>
              <select onChange={onTelNumberChangeHandler(0)}>
                <option value='010'>010</option>
              </select>
              -
              <input type='text' className='input phone' maxLength={4} value={userPhoneNumber[1]} onChange={onTelNumberChangeHandler(1)} />
              -
              <input type='text' className='input phone' maxLength={4} value={userPhoneNumber[2]} onChange={onTelNumberChangeHandler(2)} />
            </div>
          </div>
          <div className='address-box'>
            <div className='address-box-title'>주소</div>
            <div className='address-input-box-content'>
              <div className='address-input-box-top'>
                <div className='postal-code'>{userZonecode}</div>
                <div className='postal-code-button' onClick={onSearchAddressClickHandler}>우편번호 찾기</div>
              </div>
              <div className='address'>{userAddress}</div>
              <input type='text' className='detail-address' value={userDetailAddress} onChange={onDetailAddressChangeHandler}/>
            </div>
          </div>
          </div>
        </div>
        <div className='shopping-cart-container'>
          {shoppingCart.map((cart, index) => (
            <ShoppingCartContent key={index} shoppingCart={cart}/>
          ))}
        </div>
      </div>
      
  )

  return (
    <ShoppingCartLayout cartContent={cartContent} onPaymentClickHandler={onPaymentClickHandler} productQuantity={shoppingCart.length}/>
  )
}

interface TableItemProps {
  shoppingCart: ShoppingCart;
}

// component: 장바구니 테이블 레코드 컴포넌트 //
function ShoppingCartContent({shoppingCart} : TableItemProps) {

  const { name, price, quantity, image, shoppingCartSequence } = shoppingCart;
  const totalPrice = price * quantity;

  // render: 장바구니 테이블 레코드 컴포넌트 렌더링 //
  return (
    <div className='product-container'>
      <div className='product-content-container'>
        <div className='product-img'>
         <img src={image} alt='상품 이미지' style={{backgroundSize:'cover'}}/>
        </div>
        <div className='product-content-box'>
          <div className='product-title'>{name}</div>
        </div>
        <div className='price-box'>
            <div className='price'>총 {(totalPrice).toLocaleString()}원</div>
          </div>
      </div>
    </div>
  )
}