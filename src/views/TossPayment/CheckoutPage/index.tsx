import React, { useEffect, useMemo, useState } from 'react'
import { loadTossPayments, ANONYMOUS, TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { ShoppingCart, TossPaymentAmount } from 'src/types/interfaces';
import './style.css'
import { getOrderRequest, postOrderRequest } from 'src/apis';
import PostOrderRequestDto  from 'src/apis/dto/request/payment/post-order.request.dto';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';
import { ResponseDto } from 'src/apis/dto/response';
import { responseMessage } from 'src/utils';
import { GetOrderResponseDto } from 'src/apis/dto/response/payment';

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = '4RzTdEvffNsrGd9ta7nZI';

export default function CheckoutPage() {
  
  // state: 결제 금액 상태 //
  const [amount, setAmount] = useState<TossPaymentAmount>({
    currency: "KRW",
    value: 0
  });

  // state: 결제 요청 준비 상태 //
  const [ready, setReady] = useState<boolean>(false);
  // state: 결제 위젯 상태 //
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  // state: 이벤트 핸들러 실행 상태 //
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  // state: 주문번호 상태 //
  const [orderId, setOrderId] = useState<string>('');
  // state: 주문자명 상태 //
  const [userName, setUserName] = useState<string>('');
  // state: 주문자 번호 상태 //
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  // state: 배송지 주소 상태 //
  const [buyerAddress, setBuyerAddress] = useState<string>('');
  // state: cookie 상태 //
  const [cookies] = useCookies();
  // state: 로컬 스토리지 장바구니 상태 //
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart[]>([]);

  // variable: access Token//
  const accessToken = cookies[ACCESS_TOKEN];
  // variable: metadata 내에 들어갈 정보 //
  const productSequences = shoppingCart.map((cart) => (cart.productSequence)).toString();
  const productQuantity = shoppingCart.map((cart) => (cart.quantity)).toString();

  const orderName = useMemo(() => {
    if(shoppingCart.length === 0) return '';
    return shoppingCart.length === 1
      ? shoppingCart[0].name
      : `${shoppingCart[0].name} 외 ${shoppingCart.length}건`;
  },[shoppingCart])

  // event handler: 결제 요청 버튼 클릭 이벤트 핸들러 //
  const onButtonClickHandler = async () => {

    if(isProcessing) return;
    setIsProcessing(true);

    try {
      if(widgets === null) return;
      await widgets.requestPayment({
        orderId,
        orderName,
        successUrl: window.location.origin + '/success',
        failUrl: window.location.origin + '/fail',
        customerEmail:'customer123@gmail.com',
        customerName: userName,
        customerMobilePhone: phoneNumber,
        metadata:{
          address: buyerAddress,
          productSequences,
          productQuantity
        }
      });
    } catch(error){
      console.log(error);
    } finally{
      setIsProcessing(false);
    }
    
  }

  // function: get order response 함수 //
  const getOrderResponse = (responseBody: GetOrderResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess) {
      alert(message);
      return;
    }

    const { orderId, amount, userName, phoneNumber, buyerAddress } = responseBody as GetOrderResponseDto;
    setOrderId(orderId)
    setAmount({currency:'KRW', value:amount});
    setUserName(userName);
    setPhoneNumber(phoneNumber);
    setBuyerAddress(buyerAddress);
  }

  

  // effect: 컴포넌트 렌더링시 실행할 함수 //
  useEffect(() => {
    const stored = localStorage.getItem("storedShoppingCart");

    if (stored) {
      const shoppingCart = JSON.parse(stored);
      setShoppingCart(shoppingCart);  
    }
    
    getOrderRequest(accessToken).then(getOrderResponse);
  },[])

  // effect: clientKey, customerKey 변경 시 실행될 함수 //
  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ----- 결제 위젯 초기화 -----
      const tossPayments = await loadTossPayments(clientKey);  
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey
      });

      setWidgets(widgets);
    }

    fetchPaymentWidgets();

  },[clientKey, customerKey]);

  // effect: 위젯 변경시 실행될 함수 //
  // ? variantKey: 토스 페이먼트 UI의 키 //
  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }

      // ----- 주문의 결제 금액 설정 -----
      await widgets.setAmount(amount);
      // ----- 결제 UI 렌더링 -----
      await Promise.all([
        widgets.renderPaymentMethods({
          selector: '#payment-method'
        })
      ])
      
      // ----- 이용약관 동의 UI 렌더링 -----
      widgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT'
      })

      setReady(true);

    }

    renderPaymentWidgets();
  },[widgets])

  // effect: widgets, amount, orderId 변경시 실행할 함수 //
  useEffect(() => {
    if(widgets === null) return;

    widgets.setAmount(amount);

    setOrderId(orderId);
  }, [widgets, amount]);

  return (
    <div id='checkout-wrapper'>
      <div className='box-section'>
        <div id='payment-method'></div>
        <div id='agreement'></div>
        <button
          className='button'
          disabled={!ready} 
          onClick={onButtonClickHandler} 
        >
          결제하기
        </button>
      </div>
    </div>
  )
}
