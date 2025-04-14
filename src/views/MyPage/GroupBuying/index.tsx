import React from 'react'
import './style.css'

interface ProductItemProps {
  date: string;
  pictureUrl: string;
  title: string;
  content: string;
  detail: string;
  quantity: number;
  amount: number;
  orderNumber: string;
}

const products = [
  {
    date: '2025-04-11',
    pictureUrl: 'product1.jpg',
    title: '연세두유',
    content: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 1매',
    detail: '호두 앤 아몬드 96팩',
    quantity: 2,
    amount: 12000,
    orderNumber: '123456789345'
  },
  {
    date: '2025-04-11',
    pictureUrl: 'product2.jpg',
    title: '상품2',
    content: '설명2',
    detail: '상세정보2',
    quantity: 1,
    amount: 5400,
    orderNumber: '123456789345'
  },
  {
    date: '2025-04-11',
    pictureUrl: 'product2.jpg',
    title: '상품3',
    content: '설명3',
    detail: '상세정보3',
    quantity: 1,
    amount: 5400,
    orderNumber: '123456789345'
  }
  // 추가 상품들 ...
];

function ProductItem({
  date, pictureUrl, title, content, detail, quantity, amount, orderNumber
}: ProductItemProps) {
  return (
    <div className='tr'>
      <div className='td date'>{date}</div>
      <div className='td detail-box'>
        <div className='picture'>{pictureUrl}</div>
        <div className='text-box'>
          <div className='title'>{title}</div>
          <div className='content'>{content}</div>
          <div className='summary'>{detail}</div>
          <div className='review-button'>리뷰 작성</div>
        </div>
      </div>
      <div className='td quantity'>{quantity}</div>
      <div className='td amount'>{amount.toLocaleString()}원</div>
      <div className='td order-number'>{orderNumber}</div>
    </ div>
  );
}


export default function GroupBuying() {
  return (
    <div id='group-buying-main-wrapper'>
      <div className='sidebar-container'>
        <div className='button'>카테고리</div>
        <div className='categories'>
          <div className='title'>내 정보</div>
          <div className='title'>내 활동</div>
          <div className='sub-title'>내가 받은 후기
            <div className='sub-text'>도우미 후기</div>
            <div className='sub-text'>도움 받은 후기</div>
          </div>
          <div className='sub-title'>내 공동구매
            <div className='sub-text'>판매 내역</div>
            <div className='sub-text'>구매 내역</div>
            <div className='sub-text'>장바구니</div>
            <div className='sub-text'>찜한 목록</div>
          </div>
          <div className='sub-title'>도우미
            <div className='sub-text'>내가 요청한 도움</div>
            <div className='sub-text'>신청 현황</div>
            <div className='sub-text'>좋아요 누른 글</div>
          </div>
          <div className='sub-title'>커뮤니티
            <div className='sub-text'>내가 쓴 글</div>
            <div className='sub-text'>내가 쓴 댓글</div>
            <div className='sub-text'>좋아요 누른 글</div>
          </div>
          <div className='title'>고객센터</div>
        </div>
      </div>
      <div className='body'>
          <div className='select-bar'>
            <div className='content'>찜한 목록</div>
            <div className='content active'>구매목록</div>
            <div className='content'>판매목록</div>
          </div>
          <div className='product-list-table'>
            <div className='tr'>
              <div className='date'>주문일자</div>
              <div className='detail-box'>상품명</div>
              <div className='quantity'>수량</div>
              <div className='amount'>주문금액</div>
              <div className='order-number'>배송조회</div>
            </div>
            {products.map((product, index) => (
            <ProductItem key={index} {...product} />
            ))}
          </div>
          
      </div>
      
    </div>
  )
}
