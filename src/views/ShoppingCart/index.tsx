import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { deleteShoppingCartRequest, getProductDetailRequest, getShoppingCartRequest, postReserveRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import { GetShoppingCartResponseDto } from 'src/apis/dto/response/shoppingCart';
import { ACCESS_TOKEN, SHOPPING_CART_ADDRESS_ABSOLUTE_PATH } from 'src/constants';
import { ShoppingCart, StockReservation } from 'src/types/interfaces';
import { responseMessage } from 'src/utils';
import useShoppingCartSelectStore from 'src/hooks/cart-select.hook';

import "./style.css"
import { useNavigate } from 'react-router';
import ShoppingCartLayout from 'src/components/ShoppingCart';
import { PostStockReservationRequestDto } from 'src/apis/dto/request/shopping-cart';


interface TableItemProps {
  shoppingCart: ShoppingCart;
  isSelectAll: boolean;
  accessToken: string
  fetchShoppingCart: () => void;
  productQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

// component: 장바구니 테이블 레코드 컴포넌트 //
function ShoppingCartContent({shoppingCart, isSelectAll, accessToken, fetchShoppingCart, productQuantity, onQuantityChange} : TableItemProps) {

  const { name, price, quantity, image, shoppingCartSequence } = shoppingCart;
  const { selectedMap, toggle } = useShoppingCartSelectStore();

  // state: 총 가격 상태 //
  const [totalPrice, setTotalPrice] = useState<number>(price * quantity);
  
  // variable: 선택 상태 변수 //
  const isSelected = selectedMap[shoppingCartSequence] ?? false;
  // variable: select button 클래스 //
  const selectClass = isSelected ? 'select-button active' : 'select-button';
  // variable: 상품 존재 여부 //
  const isDeleted = name === null;

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
    onQuantityChange(productQuantity + 1);
  }

  // event handler: 개수 감소 버튼 클릭 핸들러 //
  const onQuantityDecreaseButtonClickHandler = () => {
    if(productQuantity > 1) onQuantityChange(productQuantity - 1);
  }

  // event handler: 장바구니 개별 삭제 버튼 클릭 핸들러 //
  const onCartItemDeleteButtonClickHandler = () => {
    if(!accessToken || !shoppingCartSequence) return;
    
    const confirmFlag = window.confirm('해당 상품을 삭제하겠습니까?')

    if(confirmFlag) deleteShoppingCartRequest(shoppingCartSequence, accessToken).then(deleteShoppingCartResponse);
  }

  useEffect(() => {
    setTotalPrice(price * productQuantity);
    // onQuantityChange(productQuantity);
  },[productQuantity])

  // render: 장바구니 테이블 레코드 컴포넌트 렌더링 //
  return (
    <div className={`product-container ${isDeleted ? 'deleted' : ''}`}>
      <div className='product-banner'>
        {!isDeleted && <div className={selectClass} onClick={() => toggle(shoppingCartSequence)}></div>}
        <div className='close-button' onClick={onCartItemDeleteButtonClickHandler}></div>
      </div>
      
      <div className='product-content-container'>
        <div className='product-img'>
          { isDeleted  ? (<div className='deleted-image-placeholder'>이미지 없음</div>)
            : (<img src={image} alt='상품 이미지' style={{backgroundSize:'cover'}}/>)
          }
        </div>
        <div className='product-content-box'>
          <div className='product-title'>{isDeleted ? '삭제된 상품입니다.' : name}</div>
          {name ? (
            <div className='product-update-box'>
              <div className='minus-button' onClick={onQuantityDecreaseButtonClickHandler}></div>
              <div className='product-quantity'>{productQuantity}</div>
              <div className='plus-button' onClick={onQuantityIncreaseButtonClickHandler}></div>
            </div>
          ) : (
            <div className='product-warning'>구매할 수 없는 상품입니다.</div>
          )}
        </div>
        <div className='price-box'>
          {price ? (
            <>
              <div className='price'>개당 {price.toLocaleString()}원</div>
              <div className='price'>총 {(totalPrice).toLocaleString()}원</div>
            </>
          ) : (
            <div className='price'>가격 정보 없음</div>
          )}
        </div>
      </div>
    </div>
  )
}

// component: 장바구니 메인 화면 컴포넌트 //
export default function ShoppingCartMain() {

  const { shoppingCart, totalProductPrice, setTotalProductPrice, setShoppingCart, getSelectedIds, setSelectAll, clear } = useShoppingCartSelectStore();

  // state: 쿠키 상태 //
  const [cookies] = useCookies();
  
  // state: 전체 선택 상태 //
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  // state: 상품 수량 상태//
  const [productQuantities, setProductQuantities] = useState<Map<number, number>>(new Map());
  // state: 전체 결제 금액 상태 //
  const [selectedTotalPrice, setSelectedTotalPrice] = useState<number>(0);
  // state: 저장될 장바구니 상태 //
  const [storedShoppingCart, setStoredShoppingCart] = useState<ShoppingCart[]>([]);

  // variable: navigator 함수 //
  const navigator = useNavigate();
  
  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 전체 상태 클래스 //
  const selectAll = isSelectAll ? 'select-button active' : 'select-button';

  // variable: 선택된 상품 sequence 배열 //
  const selectedIds = getSelectedIds();

  // function: 수량 변경 함수 //
  const updateQuantity = (sequence: number, quantity: number) => {
    setProductQuantities(prev => new Map(prev.set(sequence, quantity)));
  };

  // function: 장바구니 삭제 처리 함수 //
  const fetchShoppingCart = () => {
    getShoppingCartRequest(accessToken).then(GetShoppingCartResponse);
  };
  
  // function: 결제하기 버튼 클릭 처리 함수 //
  const postReserveResponse = (responseBody: ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess) {
      alert(message);
      return;
    }
    
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
    const storedData = localStorage.getItem("storedShoppingCart");

    if (storedData) {
      const cartList = JSON.parse(storedData);
    
      const reserves: StockReservation[] = cartList.map((item: { productSequence: number; quantity: number }) => ({
        productSequence: item.productSequence,
        quantity: item.quantity,
      }));
    
      const dto: PostStockReservationRequestDto = {
        list: reserves
      };
    
      console.log(JSON.stringify(dto, null, 2));
      postReserveRequest(dto, accessToken).then(postReserveResponse);
      console.log(reserves.toString());
    }
    
  }

  // effect: 컴포넌트 렌더시 실행할 함수 //
  useEffect(() => {
    getShoppingCartRequest(accessToken).then(GetShoppingCartResponse);
  },[]);

  // effect: 상품 선택시 실행할 함수 //
  useEffect(() => {
    const total = shoppingCart.reduce((acc, cart) => {
      const quantity = productQuantities.get(cart.shoppingCartSequence) ?? cart.quantity;
      if (selectedIds.includes(cart.shoppingCartSequence)) {
        return acc + cart.price * quantity;
      }
      return acc;
    }, 0);

    const newShoppingCart = shoppingCart
    .filter((cart) => selectedIds.includes(cart.shoppingCartSequence))
    .map((cart) => {
      const quantity = productQuantities.get(cart.shoppingCartSequence) ?? cart.quantity;
      return {
        ...cart,
        quantity,
      };
    });

    localStorage.setItem('storedShoppingCart', JSON.stringify(newShoppingCart));
    setTotalProductPrice(total);
  }, [selectedIds, productQuantities]);
  
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
          productQuantity={productQuantities.get(cart.shoppingCartSequence) ?? cart.quantity}
          onQuantityChange={(q) => updateQuantity(cart.shoppingCartSequence, q)}
        />
      ))}
    </div>
  );

  

  // render: 장바구니 메인 화면 컴포넌트 렌더링 //
  return <ShoppingCartLayout cartContent={cartContent} onPaymentClickHandler={onPaymentClickHandler} productQuantity={selectedIds.length} />;
}
