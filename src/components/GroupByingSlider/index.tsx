import React, { useState } from "react";
import './style.css';
import productImg from 'src/assets/images/product-sample-image1.png';
import iconStar from 'src/assets/images/icon-star.png';
import nextArrow from 'src/assets/images/next-arrow.png';
import prevArrow from 'src/assets/images/prev-arrow.png';

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
  }
];

export default function GroupBuyingSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideWidth = 300;

    const handlePrev = () => {
        setCurrentIndex(prev => prev === 0 ? groupBuyingData.length - 1 : prev - 1);
    };

    const handleNext = () => {
        setCurrentIndex(prev => prev === groupBuyingData.length - 1 ? 0 : prev + 1);
    };

    return (
        <div id="group-bying-container">
            <div className="gb-container-title">공동구매</div>
            <div className="gb-subtext">
            <div className="gb-subtitle-hot">HOT</div>
            <div className="gb-more">더보기{">"}</div>
            </div>
            <div className="gb-slider-wrapper">
                <div className="gb-slider-track"
                style={{transform: `translageX(-${currentIndex & slideWidth}px)`}}>
                    {groupBuyingData.slice(0, 10).map((item, index) => (
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
                <div className="gb-slider-wrapper">
                    <div className="ad-slide-btn">
                        <button onClick={handlePrev} className="prev" title="이전이미지">
                            <img src={prevArrow} alt="prev" />
                        </button>
                        <button onClick={handleNext} className="next" title="다음이미지">
                            <img src={nextArrow} alt="next" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
