import React from 'react'
import './style.css';

interface ReviewProps{
  title: string;
  profileUrl: string;
  rating: number;
  content: string;
  date: string;
}

const reviews = [
  {
    title: '바퀴벌레 잡아주실분ㅠㅠ',
    profileUrl: 'profile.jpg',
    rating: 5.0,
    content: '바퀴벌레 싹 다 멸종시키고에 혹시나 또 생기면 해주셨으면 할 정도로 최고!!',
    date: '2025-04-11'
  },
  {
    title: '바퀴벌레 잡아주실분ㅠㅠ',
    profileUrl: 'profile.jpg',
    rating: 5.0,
    content: '바퀴벌레 싹  다 멸종시키고 가주셨어요ㅠㅠ 다 다 멸종시키고 가주셨어요ㅠㅠ 다 다 멸종시키고 가주셨어요ㅠㅠ 다 다 멸종시키고 가주셨어요ㅠㅠ 다다 멸종시키고 가주셨어요ㅠㅠ 다음에 혹시나 또 생기면 해주셨으면 할 정도로 최고!!',
    date: '2025-04-11'
  },
  {
    title: '바퀴벌레 잡아주실분ㅠㅠ',
    profileUrl: 'profile.jpg',
    rating: 5.0,
    content: '바퀴벌레 싹 다 멸종시키고 가주셨어요ㅠㅠ 다음에 혹시나 또 생기면 해주셨으면 할 정도로 최고!!',
    date: '2025-04-11'
  }
]

function ReviewItem({
  title, profileUrl, rating, content, date
}: ReviewProps){
  return(
  <div className='tr'>
    <div className='title'>{title}</div>
    <div className='content-box'>
      <div className='content-item'>
        <div className='profile-image'>{profileUrl}</div>
        <div className='review-box'>
          <div className='rating'>⭐ {rating}</div>
          <div className='text'>{content}</div>
        </div>  
      </div>
      <div className='date'>{date}</div>
    </div>
  </div>
  )
}



export default function MyReview() {
  return (
    <div id='my-review-main-wrapper'>
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
      <div className='contents-wrapper'>
        <div className='title-area'>
          <div className='title'>내 후기</div>
        </div>
        <hr className='my-review-hr'/>
        <div className='banner-box'>
          <div className='button active'>도우미 후기(123개)</div>
          <div className='button'>도움 받은 후기(24개)</div>
        </div>
        <div className='review-list-table'>
          {reviews.map((review, index) => (
            <ReviewItem key={index} {...review}/>
          ))}
        </div>
        <div className='pagination'>1 2 3 4 5 6 7 8 9 10 --</div>
      </div>
    </div>
  )
}
