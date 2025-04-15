import React, { useEffect, useState } from 'react'
import './style.css'
import { getProductDetailRequest } from 'src/apis';
import { useNavigate, useParams } from 'react-router';
import { ACCESS_TOKEN, PRODUCT_ABSOLUTE_PATH } from 'src/constants';
import { Category } from 'src/types/aliases';
import { useCookies } from 'react-cookie';

export default function DetailProduct() {

  // state: 경로 변수 상태 //
  const { sequence } = useParams();
  // state: 이미지 상태 //
  const [image, setImage] = useState<File | null>(null);
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
  // state: 마감 여부 상태 //
  const [isSoldOut, setIsSoldOut] = useState<boolean>(false);
  // state: 평점 상태 //
  const [rating, setRating] = useState<number>(0.0);
  // state: 상품 설명 상태 //
  const [content, setContent] = useState<string>('');
  // state: cookie 상태 //
  const [cookies] = useCookies();
  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: navigator 함수 //
  const navigator = useNavigate();

  const jumbotronContent = '마늘 프랑크소시지\n\n통통한 몸집을 자랑하는 프랑크소시지예요. 한입 먹어보면 뽀득뽀득하고 탱탱한 식감을 선사하지요. 마늘로 더한 알싸한 감칠맛이 입맛을 사로잡는답니다. 꼬치에 꽂혀있어 손으로 들고 간편하게 즐기기 좋아요.\n\n통통한 몸집을 자랑하는 프랑크소시지예요. 한입 먹어보면 뽀득뽀득하고 탱탱한 식감을 선사하지요. 마늘로 더한 알싸한 감칠맛이 입맛을 사로잡는답니다. 꼬치에 꽂혀있어 손으로 들고 간편하게 즐기기 좋아요.\n\n통통한 몸집을 자랑하는 프랑크소시지예요. 한입 먹어보면 뽀득뽀득하고 탱탱한 식감을 선사하지요. 마늘로 더한 알싸한 감칠맛이 입맛을 사로잡는답니다. 꼬치에 꽂혀있어 손으로 들고 간편하게 즐기기 좋아요.';
  
  // function: get product detail response 처리 함수 //
  const getProductDetailResponse = () => {

  }
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
            <div className='content category bold'>식품</div>
            <div className='info-box'>
              <div className='content sub'>닉네임</div>
              <div className='title bold'>의성마늘 프랑크, 70g, 100개 제목 텍스트 680px 최대 2줄</div>
              <div className='price-box'>
                <div className='title bold'>128,900원</div>
                <div className='title sub'>(개당 1,289원)</div>
              </div>
            </div>
            <div className='participation-box'>
              <div className='content bold'>777명 구매</div>
              <div className='content bold red'>78% 달성</div>
              <div className='content-box'>
                <div className='content sub'>잔여 수량</div>
                <div className='content bold'>30개</div>
              </div>
              <div className='rating-box'>
                <div className='star'></div>
                <div className='content'>5.0점</div>
              </div>
            </div>
            <div className='button complete'>참여하기</div>
          </div>
        </div>
        <div className='product-detail'>
          <div className='product-utility-bar'>
            <div className='product-tab-menu'>
              <div className='content active'>상품 설명</div>
              <div className='content'>상품 후기</div>
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
            {jumbotronContent}
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
