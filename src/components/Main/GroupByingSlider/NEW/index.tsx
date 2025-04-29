import React, { useState } from "react";
import './style.css';
import productImg from 'src/assets/images/product-sample-image1.png';
import iconStar from 'src/assets/images/icon-star.png';
import pageLeft from 'src/assets/images/page-left.png';
import pageRight from 'src/assets/images/page-right.png';
import fire from 'src/assets/images/fire.png';

const groupBuyingData = [
  {
    id: 1,
    title: "연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩",
    price: "34,000원",
    buyers: "5/100명",
    rating: "5.0",
    reviews: 250,
    image: productImg,
  },
  {
    id: 2,
    title: "연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩",
    price: "34,000원",
    buyers: "5/100명",
    rating: "5.0",
    reviews: 250,
    image: productImg,
  },
  {
    id: 3,
    title: "연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩",
    price: "34,000원",
    buyers: "5/100명",
    rating: "5.0",
    reviews: 250,
    image: productImg,
  },
  {
    id: 4,
    title: "연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩",
    price: "34,000원",
    buyers: "5/100명",
    rating: "5.0",
    reviews: 250,
    image: productImg,
  },
  {
    id: 5,
    title: "연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩",
    price: "34,000원",
    buyers: "5/100명",
    rating: "5.0",
    reviews: 250,
    image: productImg,
  },
  {
    id: 6,
    title: "연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩",
    price: "34,000원",
    buyers: "5/100명",
    rating: "5.0",
    reviews: 250,
    image: productImg,
  },
  {
    id: 7,
    title: "연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩",
    price: "34,000원",
    buyers: "5/100명",
    rating: "5.0",
    reviews: 250,
    image: productImg,
  },
  {
    id: 8,
    title: "연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩",
    price: "34,000원",
    buyers: "5/100명",
    rating: "5.0",
    reviews: 250,
    image: productImg,
  },
  {
    id: 9,
    title: "연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩",
    price: "34,000원",
    buyers: "5/100명",
    rating: "5.0",
    reviews: 250,
    image: productImg,
  },
  {
    id: 10,
    title: "연세두유 뼈를 생각한 고칼슘 두유 진득찰 96팩",
    price: "34,000원",
    buyers: "5/100명",
    rating: "5.0",
    reviews: 250,
    image: productImg,
  }
];

export default function NewGroupBuyingData() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideWidth = 205; 
    const containerWidth = 1134; 
    const visibleCount = Math.floor(containerWidth / slideWidth);
    const maxIndex = groupBuyingData.length - visibleCount;

    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    };

    return (
        <div id="container">
            <div className="main-subtext">
                <div className="main-subtitle">NEW</div>
                <div className="main-more">더보기{">"}</div>
            </div>
            <div className="gb-slider-wrapper" style={{ width: containerWidth }}>
                <div
                    className="gb-slider-track"
                    style={{
                        transform: `translateX(-${currentIndex * slideWidth}px)`,
                        transition: 'transform 0.5s ease',
                        width: `${slideWidth * 5}px`,
                        display: 'flex'
                    }}
                >
                    {groupBuyingData.map((item, index) => (
                        <div className="group-bying-inner" key={item.id || index}>
                            <div className="gb-image">
                                <img src={item.image} alt={`product-${index}`} />
                            </div>
                            <div className="gb-inner-title">{item.title}</div>
                            <div className="gb-inner-price">{item.price}</div>
                            <div className="gb-inner-content">
                                <div className="gb-buyers">{item.buyers}</div>
                                <div className="gb-rating">
                                    <img src={iconStar} alt="rating" />
                                    {item.rating}
                                </div>
                                <div className="gb-review">({item.reviews})</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="gb-slider-wrapper-btn">
                <div className="gb-slide-btn">
                    <button onClick={handlePrev} className="prev" title="이전이미지">
                        <img src={pageLeft} alt="prev" />
                    </button>
                    <button onClick={handleNext} className="next" title="다음이미지">
                        <img src={pageRight} alt="next" />
                    </button>
                </div>
            </div>
        </div>
    );
}
