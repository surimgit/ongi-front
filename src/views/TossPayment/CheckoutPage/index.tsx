import React, { useEffect, useState } from 'react'
import { loadTossPayments, ANONYMOUS, TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { TossPaymentAmount } from 'src/types/interfaces';
import './style.css'
import { postOrderRequest } from 'src/apis';
import PostOrderRequestDto  from 'src/apis/dto/request/payment/post-order.request.dto';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';
import { ResponseDto } from 'src/apis/dto/response';
import { responseMessage } from 'src/utils';

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = '4RzTdEvffNsrGd9ta7nZI';

export default function CheckoutPage() {
  
  // state: 결제 금액 상태 //
  const [amount, setAmount] = useState<TossPaymentAmount>({
    currency: "KRW",
    value: 50_000
  })
  // state: 결제 요청 준비 상태 //
  const [ready, setReady] = useState<boolean>(false);
  // state: 결제 위젯 상태 //
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  // state: 이벤트 핸들러 실행 상태 //
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  // state: 주문번호 상태 //
  const [orderId, setOrderId] = useState<string>('');
  // state: cookie 상태 //
  const [cookies] = useCookies();

  // variable: access Token//
  const accessToken = cookies[ACCESS_TOKEN];

  // function: 주문번호 생성 함수 //
  const createOrderId = (minLength:number = 6, maxLength:number = 64) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let result = '';

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  // event handler: 결제 요청 버튼 클릭 이벤트 핸들러 //
  const onButtonClickHandler = async () => {

    if(isProcessing) return;
    setIsProcessing(true);

    const requestBody: PostOrderRequestDto = {
      orderId, amount:amount.value, buyerAddress: '양산'
    }

    postOrderRequest(requestBody, accessToken)

    try {
      if(widgets === null) return;
      await widgets.requestPayment({
        orderId,
        orderName: '토스 티셔츠 외 2건',
        successUrl: window.location.origin + '/success',
        failUrl: window.location.origin + '/fail',
        customerEmail:'customer123@gmail.com',
        customerName: '김토스',
        customerMobilePhone: '01011111111',
        metadata:{
          address: '부산진구',
          items: [
            {
              id: 'prod001',
              name: '화이트 티셔츠',
              price: 10000
            },
            {
              id: 'prod002',
              name: '청바지',
              price: 40000
            }
          ]
        }
      });
    } catch(error){
      console.log(error);
    } finally{
      setIsProcessing(false);
    }
    
  }

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
          selector: '#payment-method',
          variantKey: 'DEFAULT'
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

    const orderId = createOrderId();
    setOrderId(orderId);
  }, [widgets, amount, orderId]);

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
