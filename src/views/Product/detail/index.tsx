import React, { useEffect, useMemo, useState } from 'react'
import './style.css'
import { getProductDetailRequest } from 'src/apis';
import { useNavigate, useParams } from 'react-router';
import { ACCESS_TOKEN, PRODUCT_ABSOLUTE_PATH } from 'src/constants';
import { Category } from 'src/types/aliases';
import { useCookies } from 'react-cookie';
import GetProductDetailResponseDto from 'src/apis/dto/response/get-product-detail.request.dto';
import { ResponseDto } from 'src/apis/dto/response';
import { responseMessage } from 'src/utils';

export default function DetailProduct() {

  // state: 경로 변수 상태 //
  const { sequence } = useParams();
  // state: 이미지 상태 //
  const [image, setImage] = useState<string>('');
  // state: 카테고리 상태 //
  const [category, setCategory] = useState<Category>('전체');
  // state: 제목 상태 //
  const [name, setName] = useState<string>('');
  // state: 게시자 아이디 상태 //
  const [userId, setUserId] = useState<string>('');
  // state: 가격 상태 //
  const [price, setPrice] = useState<number>(0);
  // state: 판매 제한 수량 상태 //
  const [productQuantity, setProductQuantity] = useState<number>(0);
  // state: 구매 인원 상태 //
  const [purchasedPeople, setPurchasedPeople] = useState<number>(0);
  // state: 판매 수량 상태 //
  const [boughtAmount, setBoughtAmount] = useState<number>(0);
  // state: 마감 기한 상태 //
  const [deadline, setDeadline] = useState<string>('');
  // state: 마감 여부 상태 //
  const [isSoldOut, setIsSoldOut] = useState<boolean>(false);
  // state: 평점 상태 //
  const [rating, setRating] = useState<number>(0.0);
  // state: 상품 설명 상태 //
  const [productContent, setProductContent] = useState<string>('');
  // state: 상품 설명/후기 클릭 상태 //
  const [click, setClick] = useState<string>('설명');
  // state: cookie 상태 //
  const [cookies] = useCookies();

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 버튼 클래스 //
  // const buttonClass = 

  // variable: 탭 메뉴 클래스 //
  const descriptionClass = click === '설명' ? 'content active' : 'content';
  const reviewClass = click === '후기' ? 'content active' : 'content';

  // function: navigator 함수 //
  const navigator = useNavigate();

  const jumbotronContent = '마늘 프랑크소시지\n\n통통한 몸집을 자랑하는 프랑크소시지예요. 한입 먹어보면 뽀득뽀득하고 탱탱한 식감을 선사하지요. 마늘로 더한 알싸한 감칠맛이 입맛을 사로잡는답니다. 꼬치에 꽂혀있어 손으로 들고 간편하게 즐기기 좋아요.\n\n통통한 몸집을 자랑하는 프랑크소시지예요. 한입 먹어보면 뽀득뽀득하고 탱탱한 식감을 선사하지요. 마늘로 더한 알싸한 감칠맛이 입맛을 사로잡는답니다. 꼬치에 꽂혀있어 손으로 들고 간편하게 즐기기 좋아요.\n\n통통한 몸집을 자랑하는 프랑크소시지예요. 한입 먹어보면 뽀득뽀득하고 탱탱한 식감을 선사하지요. 마늘로 더한 알싸한 감칠맛이 입맛을 사로잡는답니다. 꼬치에 꽂혀있어 손으로 들고 간편하게 즐기기 좋아요.';
  
  // function: get product detail response 처리 함수 //
  const getProductDetailResponse = (responseBody: GetProductDetailResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);
    
    if(!isSuccess){
      alert(message);
      return;
    }

    const { image, name, userId, price, category, productQuantity,
            boughtAmount, purchasedPeople, deadline, isSoldOut, content, openDate
    } = responseBody as GetProductDetailResponseDto;

    setImage(image);
    setName(name);
    setUserId(userId);
    setPrice(price);
    setCategory(category);
    setProductQuantity(productQuantity);
    setBoughtAmount(boughtAmount);
    setPurchasedPeople(purchasedPeople);
    setDeadline(deadline);
    setIsSoldOut(isSoldOut);
    setProductContent(content);
  }

  // event handler: 상품 설명, 후기 변경 이벤트 핸들러 //
  const onChangeProductHandler = (click: string) => {
    setClick(click);
  }

  const unitPrice = useMemo(() => {
    if (productQuantity === 0) return 0;
    return Math.floor(price / productQuantity);
  }, [price, productQuantity]);
  
  const achievement = useMemo(() => {
    if (productQuantity === 0) return 0;
    return Math.floor((boughtAmount / productQuantity) * 100);
  }, [boughtAmount, productQuantity]);

  const remainingQuantity = useMemo(() => {
    if(productQuantity === 0) return 0;
    return Math.floor(productQuantity - boughtAmount);
  }, [productQuantity, boughtAmount]);

  // effect: 컴포넌트 렌더링 시 실행할 함수 //
  useEffect(() => {
    if(!sequence){
      navigator(PRODUCT_ABSOLUTE_PATH);
      return;
    }

    getProductDetailRequest(sequence, accessToken).then(getProductDetailResponse);
  },[]);

  return (
    <div id='detail-product-wrapper'>
      <div className='detail-product-container'>
        <div className='detail-product-content'>
          <div className='detail-image'></div>
          <div className='detail-product-info'>
            <div className='content category bold'>{category}</div>
            <div className='info-box'>
              <div className='content sub'>{userId}</div>
              <div className='title bold'>{name}</div>
              <div className='price-box'>
                <div className='title bold'>{price.toLocaleString()}원</div>
                <div className='title sub'>(개당 {unitPrice.toLocaleString()}원)</div>
              </div>
            </div>
            <div className='participation-box'>
              <div className='content bold'>{boughtAmount}명 구매</div>
              <div className='content bold red'>{achievement}% 달성</div>
              <div className='content-box'>
                <div className='content sub'>{}잔여 수량</div>
                <div className='content bold'>{remainingQuantity} 개</div>
              </div>
              <div className='rating-box'>
                <div className='star'></div>
                <div className='content'>5.0점</div>
              </div>
            </div>
            <div className='button black'>참여하기</div>
          </div>
        </div>
        <div className='product-detail'>
          <div className='product-utility-bar'>
            <div className='product-tab-menu'>
              <div className={descriptionClass} onClick={() => onChangeProductHandler('설명')}>상품 설명</div>
              <div className={reviewClass} onClick={() => onChangeProductHandler('후기')}>상품 후기</div>
            </div>
            <div className='product-toolbox'>
              <div className='product-tool favorite'></div>
              <div className='product-tool shopping-cart'></div>
              <div className='product-tool share'></div>
              <div className='product-tool report'></div>
              <div className='button ask'>문의하기</div>
            </div>
          </div>
          <div className='jumbotron'>
            <div className='jumbotron-box'>
              {productContent}
            </div>
          </div>
        </div>
        <div className='detail-product-similar'>
          <div className='title'>유사 상품</div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
