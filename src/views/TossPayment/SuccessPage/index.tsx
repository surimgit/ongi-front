import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

// component: 결제 요청 성공 페이지 //
export default function SuccessPage() {

  // state: 경로 변수 상태 //
  const [searchParams] = useSearchParams();
  // function: navigator 함수 //
  const navigator = useNavigate();

  // effect: 컴포넌트 렌더링시 실행할 함수 //
  useEffect(() => {
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey')
    };

    async function confirm() {
      const response = await fetch('/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const json = await response.json();

      // 결제 실패 비즈니스 로직
      if(!response.ok){
        navigator(`/fail?message=${json.message}&code=${json.code}`);
        return;
      }

      // 결제 성공 비즈니스 로직

    }

    confirm();
  },[])
  return (
    <div id='result-wrapper'>
      <div className='box-section'>
        <h2>결제 성공</h2>
        <p>{`주문번호: ${searchParams.get('orderId')}`}</p>
        <p>{`결제 금액: ${Number(searchParams.get('amount')).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get('paymentKey')}`}</p>
      </div>
    </div>
  )
}
