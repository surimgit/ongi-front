import React from 'react'
import './style.css';
import MypageSidebar from 'src/layouts/MypageSidebar';

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
      <MypageSidebar/>
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
