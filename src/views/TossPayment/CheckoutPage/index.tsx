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
  const [isProcessing, setIsProcessing] = useState(false);

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // variable: access Token//
  const accessToken = cookies[ACCESS_TOKEN];

  // event handler: 결제 요청 버튼 클릭 이벤트 핸들러 //
  const onButtonClickHandler = async () => {

    if(isProcessing) return;
    setIsProcessing(true);

    const requestBody: PostOrderRequestDto = {
      orderId:'94q3myHfFfqYebqvbsasb36', amount:amount.value, buyerAddress: '양산'
    }

    postOrderRequest(requestBody, accessToken)

    try {
      if(widgets === null) return;
      await widgets.requestPayment({
        orderId: '94q3myHfFfqYebqvbsasb36',
        orderName: '토스 티셔츠 외 2건',
        successUrl: window.location.origin + '/success',
        failUrl: window.location.origin + '/fail',
        customerEmail:'customer123@gmail.com',
        customerName: '김토스',
        customerMobilePhone: '01011111111',
        metadata:{
          address: '부산진구'
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

  // effect: widgets, amount 변경시 실행할 함수 //
  useEffect(() => {
    if(widgets === null) return;

    widgets.setAmount(amount);
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
