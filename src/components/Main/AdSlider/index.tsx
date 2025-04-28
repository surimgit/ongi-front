import React, { useState } from 'react';
import './style.css';

import adImage1 from 'src/assets/images/ad-sample-image.png';
import adImage2 from 'src/assets/images/ad-sample-image2.png';
import adImage3 from 'src/assets/images/ad-sample-image3.png';
import nextArrow from 'src/assets/images/next-arrow.png';
import prevArrow from 'src/assets/images/prev-arrow.png';

const adItems = [
    {
        img: adImage1,
        content: '완전 완전 대박 좋은\n비타민 C, D',
        price: '34,000원',
    },
    {
        img: adImage2,
        content: '맛있는 충전\n단백질바 4종 묶음',
        price: '16,500원',
    },
    {
        img: adImage3,
        content: '산뜻한 두피케어\n미장센 샴푸 세트',
        price: '12,000원',
    }
];

export default function AdSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex(prev => prev === 0 ? adItems.length - 1 : prev - 1);
    };

    const handleNext = () => {
        setCurrentIndex(prev => prev === adItems.length - 1 ? 0 : prev + 1);
    };

    return (
        <div className="ad-container">
            <div className="ad-inner-wrapper">
                <div 
                    className="ad-inner"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: 'transform 0.5s ease-in-out'
                    }}
                >
                    {adItems.map((item, index) => (
                        <div className="ad-slide" key={index}>
                            <img className="ad-image" src={item.img} alt={`ad-${index}`} />
                            <div className="ad-text">
                                <div className="ad-content">
                                    {item.content.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
                                </div>
                                <div className="ad-price">{item.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="ad-slide-btn">
                <button onClick={handlePrev} className="prev" title="이전이미지">
                    <img src={prevArrow} alt="prev" />
                </button>
                <button onClick={handleNext} className="next" title="다음이미지">
                    <img src={nextArrow} alt="next" />
                </button>
            </div>
        </div>
    );
}
