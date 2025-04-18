import React from 'react'
import './style.css';

interface ProductItemProps {
  pictureUrl: string;
  name: string;
  amount: number;
  purchasedPeople: number;
  quantity: number;
  date: String;
}

const products = [
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  },
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  },
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  },
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  },
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  },
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  },
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  },
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  },
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  },
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  },
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  },
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  },
  {
    pictureUrl: 'product1.jpg',
    name: '연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩',
    amount: 34000,
    purchasedPeople: 30,
    quantity: 12,
    date: '2025-04-11',
  }
];

function ProductItem({
  pictureUrl, name, amount, purchasedPeople, quantity, date 
}: ProductItemProps) {
  return (
    <div className='tr'>
      <div className='td name-box'>
        <div className='picture'>{pictureUrl}</div>
        <div className='detail-box'>
          <div className='name'>{name}</div>
          <div className='amount'>{amount}</div>
        </div>
      </div>
      <div className='td purchased-people'>{purchasedPeople}</div>
      <div className='td quantity'>{quantity}</div>
      <div className='td date'>{date}</div>
    </ div>
  );
}


export default function WishList() {
  return (
    <div id='wish-list-main-wrapper'>
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
            <div className='content active' >찜한 목록</div>
            <div className='content '>구매목록</div>
            <div className='content'>판매목록</div>
          </div>
          <div className='product-list-table'>
            <div className='tr'>
              <div className='th name-box'>상품명</div>
              <div className='th purchased-people'>구매인원</div>
              <div className='th quantity'>잔여수량</div>
              <div className='th date'>마감일자</div>
            </div>
            {products.map((product, index) => (
            <ProductItem key={index} {...product} />
            ))}
          </div>
          
      </div>
      
    </div>
  )
}
