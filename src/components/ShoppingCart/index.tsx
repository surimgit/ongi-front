import { useLocation } from 'react-router';
import './style.css'
import { useEffect } from 'react';
import { getShoppingCartRequest } from 'src/apis';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';
import { GetShoppingCartResponseDto } from 'src/apis/dto/response/shoppingCart';
import { responseMessage } from 'src/utils';
import useShoppingCartSelectStore from 'src/hooks/cart-select.hook';
import { ResponseDto } from 'src/apis/dto/response';

interface ShoppingCartLayoutProps {
  cartContent: React.ReactNode;
  productQuantity: number;
  onPaymentClickHandler: () => void
}

export default function ShoppingCartLayout({ cartContent, productQuantity ,onPaymentClickHandler }: ShoppingCartLayoutProps) {

  const location = useLocation();
  const pathname = location.pathname;
  
  const raw = localStorage.getItem('shoppingCart');
  let totalPrice = 0;

  if(raw){

    const parsed = JSON.parse(raw);
    totalPrice = parsed.state.totalPrice;
  } 
  return (
    <div id='shopping-cart-main-wrapper'>
      <div className='shopping-cart-container'>
        <div className='shopping-cart-banner'>
          <div className='title'>장바구니</div>
          <div className='progress-box'>
            <div className={`sub-title ${pathname === '/shoppingCart' ? 'active' : ''}`}>장바구니 &gt; </div>
            <div className={`sub-title ${pathname === '/shoppingCart/address' ? 'active' : ''}`}>주문/결제 &gt; </div>
            <div className={`sub-title ${pathname === '/shoppingCart/complete' ? 'active' : ''}`}>주문완료</div>
          </div>
        </div>
        <div className='content-container'>
          <div className='content-box'>
            {cartContent}
          </div>
          <div className='payment-content-container'>
            
              <div className='payment-content-box'>
                <div className='price-title'>최종 결제 금액</div>
                <div className='payment-content'>
                  <div className='price-box'>
                    <div className='price-content'>
                      <div className='sub-title'>주문 금액</div>
                      <div className='price'>{totalPrice.toLocaleString()}원</div>
                    </div>
                    <div className='price-content'>
                      <div className='sub-title'>할인 금액</div>
                      <div className='price'>0원</div>
                    </div>
                  </div>
                  <div className='price-content'>
                    <div className='title primary'>총 결제 금액</div>
                    <div className='title primary'>{totalPrice.toLocaleString()}원</div>
                  </div>
                </div>
              </div>

              <div className='payment-button' onClick={onPaymentClickHandler}>주문하기({productQuantity}개)</div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
