import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { deleteShoppingCartRequest, getProductDetailRequest, getShoppingCartRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import { GetShoppingCartResponseDto } from 'src/apis/dto/response/shoppingCart';
import { ACCESS_TOKEN, SHOPPING_CART_ADDRESS_ABSOLUTE_PATH } from 'src/constants';
import { ShoppingCart } from 'src/types/interfaces';
import { responseMessage } from 'src/utils';
import useShoppingCartSelectStore from 'src/hooks/cart-select.hook';

import "./style.css"
import { useNavigate } from 'react-router';
import ShoppingCartLayout from 'src/components/ShoppingCart';


interface TableItemProps {
  shoppingCart: ShoppingCart;
  isSelectAll: boolean;
  accessToken: string
  fetchShoppingCart: () => void;
}

// component: 장바구니 테이블 레코드 컴포넌트 //
function ShoppingCartContent({shoppingCart, isSelectAll, accessToken, fetchShoppingCart} : TableItemProps) {

  const { name, price, quantity, image, shoppingCartSequence } = shoppingCart;
  const { selectedMap, toggle } = useShoppingCartSelectStore();

  // state: 상품 개수 상태 //
  const [productQuantity, setProductQuantity] = useState<number>(quantity);
  // state: 총 가격 상태 //
  const [totalPrice, setTotalPrice] = useState<number>(price * quantity);
  
  // variable: 선택 상태 변수 //
  const isSelected = selectedMap[shoppingCartSequence] ?? false;
  // variable: select button 클래스 //
  const selectClass = isSelected ? 'select-button active' : 'select-button';

  // function: delete shopping cart response 함수 //
  const deleteShoppingCartResponse = (responseBody: ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess) {
      alert(message);
      return;
    }
    
    fetchShoppingCart();
  }

  // event handler: 개수 증가 버튼 클릭 핸들러 //
  const onQuantityIncreaseButtonClickHandler = () => {
    setProductQuantity(productQuantity + 1);
  }

  // event handler: 개수 감소 버튼 클릭 핸들러 //
  const onQuantityDecreaseButtonClickHandler = () => {
    if(productQuantity > 1) setProductQuantity(productQuantity - 1);
  }

  // event handler: 장바구니 개별 삭제 버튼 클릭 핸들러 //
  const onCartItemDeleteButtonClickHandler = () => {
    if(!accessToken || !shoppingCartSequence) return;
    
    const confirmFlag = window.confirm('해당 상품을 삭제하겠습니까?')

    if(confirmFlag) deleteShoppingCartRequest(shoppingCartSequence, accessToken).then(deleteShoppingCartResponse);
  }

  useEffect(() => {
    setTotalPrice(price * productQuantity);
  },[productQuantity])

  // render: 장바구니 테이블 레코드 컴포넌트 렌더링 //
  return (
    <div className='product-container'>
      <div className='product-banner'>
        <div className={selectClass} onClick={() => toggle(shoppingCartSequence)}></div>
        <div className='close-button' onClick={onCartItemDeleteButtonClickHandler}></div>
      </div>
      
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

  const { shoppingCart, setShoppingCart, getSelectedIds, setSelectAll, clear } = useShoppingCartSelectStore();

  // state: 쿠키 상태 //
  const [cookies] = useCookies();
  
  // state: 전체 선택 상태 //
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  // state: 전체 결제 금액 상태 //
  const [selectedTotalPrice, setSelectedTotalPrice] = useState<number>(0);

  // variable: navigator 함수 //
  const navigator = useNavigate();
  
  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 전체 상태 클래스 //
  const selectAll = isSelectAll ? 'select-button active' : 'select-button';

  // variable: 선택된 상품 sequence 배열 //
  const selectedIds = getSelectedIds();


  // function: 장바구니 삭제 처리 함수 //
  const fetchShoppingCart = () => {
    getShoppingCartRequest(accessToken).then(GetShoppingCartResponse);
  };

  // event handler: 전체 선택 버튼 클릭 이벤트 핸들러 //
  const onSelectAllClickHandler = () => {
    if(isSelectAll) clear();
    else setSelectAll(shoppingCart.map((item) => item.shoppingCartSequence));

    setIsSelectAll(!isSelectAll);
  }

  // event handler: 선택 삭제 버튼 클릭 이벤트 핸들러 //
  const onDeleteClickHandler = () =>{
    if(selectedIds.length === 0) return;

    const confirmFlag = window.confirm('선택된 상품을 삭제하시겠습니까?');
    if(!confirmFlag) return;

    Promise.all(selectedIds.map(id => deleteShoppingCartRequest(id, accessToken)))
      .then(() => {
        clear();
        fetchShoppingCart();
      })
  }

  // event handler: 결제하기 버튼 클릭 이벤트 핸들러 //
  const onPaymentClickHandler = () => {
    navigator(SHOPPING_CART_ADDRESS_ABSOLUTE_PATH);
  }

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

  // effect: 상품 선택시 실행할 함수 //
  useEffect(() => {
    setSelectedTotalPrice(shoppingCart
                              .filter((cart) => selectedIds.includes(cart.shoppingCartSequence))
                              .reduce((acc, cart) => acc + cart.price * cart.quantity, 0));
  },[selectedIds]);

  
  const cartContent = (
    <div className='cart-content-container'>
      <div className='select-container'>
        <div className='select-box'>
          <div className={selectAll} onClick={onSelectAllClickHandler}></div>
          <div className='select-title'>전체 선택</div>
        </div>
        <div className='delete-button' onClick={onDeleteClickHandler}>선택 삭제</div>
      </div>
      {shoppingCart.map((cart, index) => (
        <ShoppingCartContent
          key={index}
          shoppingCart={cart}
          accessToken={accessToken}
          isSelectAll={isSelectAll}
          fetchShoppingCart={fetchShoppingCart}
        />
      ))}
    </div>
  );

  

  // render: 장바구니 메인 화면 컴포넌트 렌더링 //
  return <ShoppingCartLayout cartContent={cartContent} selectedTotalPrice={selectedTotalPrice} onPaymentClickHandler={onPaymentClickHandler} productQuantity={selectedIds.length} />;
}
