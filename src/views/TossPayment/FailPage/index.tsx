import React from 'react'
import { useParams, useSearchParams } from 'react-router'

import './style.css'

export default function FailPage() {

  // state: 경로 변수 상태 //
  const [searchParams] = useSearchParams('');

  // variable: 실패 코드 변수 //
  const code = searchParams.get('code');
  // variable: 실패 코드 메세지 //
  const message = searchParams.get('message');

  return (
    <div id='result-wrapper'>
      <div className='box-section'>
        <div className='fail-icon'></div>
        <h2>결제를 실패했어요!</h2>
        <div className='content-box'>
          <div className='fail-content'>
            <div className='title'>에러 코드</div>
            <div className='content'>{code}</div>
          </div>
          <div className='fail-content'>
            <div className='title'>실패 사유</div>
            <div className='content'>{message}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
