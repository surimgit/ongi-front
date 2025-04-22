import React, { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import axios, { AxiosError } from 'axios';
import { postOrderItemsRequest, postPaymentConfirm } from 'src/apis';
import PostPaymentConfirmRequestDto from 'src/apis/dto/request/payment/post-payment-confirm.request.dto';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, MAIN_ABSOLUTE_PATH } from 'src/constants';
import "./style.css"
import { PostOrderItemRequestDto } from 'src/apis/dto/request/payment';

// component: 결제 요청 성공 페이지 //
export default function SuccessPage() {

  // state: cookie 상태 //
  const [cookies] = useCookies();
  // state: 경로 변수 상태 //
  const [searchParams] = useSearchParams();

  // variable: access Token//
  const accessToken = cookies[ACCESS_TOKEN];

  const hasConfirmed = useRef(false);

  // function: navigator 함수 //
  const navigator = useNavigate();

  // event handler: 메인화면 이동 버튼 클릭 이벤트 핸들러 //
  const onNavigateMainClickHandler = () => {
    navigator(MAIN_ABSOLUTE_PATH);
  }
  // effect: 컴포넌트 렌더링시 실행할 함수 //
  useEffect(() => {
  
    if (hasConfirmed.current) return; 
    hasConfirmed.current = true;      

    
    const paymentKey = searchParams.get('paymentKey');

    const requestData: PostPaymentConfirmRequestDto = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get('amount'),
      paymentKey
    };
    
    const orderItemRequestData: PostOrderItemRequestDto = {
      paymentKey
    }

    async function confirm(requestData: PostPaymentConfirmRequestDto, orderItemRequestData: PostOrderItemRequestDto, accessToken: string) {
      try {
        // 결제 승인 요청
        await postPaymentConfirm(requestData, accessToken);
        
        await postOrderItemsRequest(orderItemRequestData, accessToken);
        
      } catch (error) {
        console.error('Error during payment confirmation or order processing:', error);
      }
    }
    
  
    confirm(requestData, orderItemRequestData, accessToken);
  }, [searchParams]);
  
  return (
    <div id='result-wrapper'>
      <div className='box-section'>
        <div className='success-icon'></div>
        <h2>결제를 완료했어요</h2>
        <div className='success-content-box'>
          <div className='success-content'>
            <div className='title'>주문번호</div>
            <div className='content'>{searchParams.get('orderId')}</div>
          </div>
          <div className='success-content'>
            <div className='title'>결제금액</div>
            <div className='content'>{Number(searchParams.get('amount')).toLocaleString()}원</div>
          </div>
        </div>
        <div className='button primary' onClick={onNavigateMainClickHandler}>메인 화면으로</div>
      </div>
    </div>
  )
}
