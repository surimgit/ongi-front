import React, { useEffect, useState } from "react";
import './style.css';
import productImg from 'src/assets/images/product-sample-image1.png';
import iconStar from 'src/assets/images/icon-star.png';
import pageLeft from 'src/assets/images/page-left.png';
import pageRight from 'src/assets/images/page-right.png';
import fire from 'src/assets/images/fire.png';
import { getProductRequest } from "src/apis";
import { GetProductResponseDto, ResponseDto } from "src/apis/dto/response";
import { responseMessage } from "src/utils";
import { Product } from "src/types/interfaces";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, PRODUCT_ABSOLUTE_PATH, PRODUCT_VIEW_ABSOLUTE_PATH } from "src/constants";
import { useNavigate } from "react-router";

interface HotProps{
  hotList:Product[];
  handlers:{
    onProductClick: (sequence: number) => void;
    onMoreClick: () => void;
  }
}

// component: 메인화면 공동구매 핫 상품 컴포넌트 //
export default function HotGroupBuyingData({hotList, handlers}:HotProps) {

    
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideWidth = 205; 
    const containerWidth = 1134; 
    const visibleCount = Math.floor(containerWidth / slideWidth);
    const maxIndex = hotList.length - visibleCount;
    
    // variable: navigator //
    const navigator = useNavigate();
    
    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    };
  
    const {onProductClick, onMoreClick} = handlers;
    
    

    return (
        <div id="container">
            <div className="main-subtext">
                <div className="main-subtitle">HOT<img src={fire}/></div>
                <div className="main-more" onClick={onMoreClick}>더보기{">"}</div>
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
                    {hotList && hotList.map((item, index) => (
                        <div className="group-bying-inner" key={item.sequence || index} onClick={() => onProductClick(item.sequence)}>
                            <div className="gb-image">
                                <img src={item.image} alt={`product-${index}`} />
                            </div>
                            <div className="gb-inner-title">{item.name}</div>
                            <div className="gb-inner-price">{item.price.toLocaleString()}원</div>
                            <div className="gb-inner-content">
                                <div className="gb-buyers">{item.boughtAmount.toLocaleString()}개/{item.productQuantity.toLocaleString()}개</div>
                                <div className="gb-rating">
                                    <img src={iconStar} alt="rating" />
                                    {item.rating}점
                                </div>
                                <div className="gb-review">({item.rating})</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {hotList.length > visibleCount && 
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
            }
            
        </div>
    );
}
