import React, { useEffect, useMemo, useState } from 'react'
import './style.css'
import { getProductDetailRequest, PostShoppingCartRequest } from 'src/apis';
import { useNavigate, useParams } from 'react-router';
import { ACCESS_TOKEN, PRODUCT_ABSOLUTE_PATH } from 'src/constants';
import { Category } from 'src/types/aliases';
import { useCookies } from 'react-cookie';
import GetProductDetailResponseDto from 'src/apis/dto/response/get-product-detail.request.dto';
import { ResponseDto } from 'src/apis/dto/response';
import { responseMessage } from 'src/utils';
import Modal from 'src/components/Modal';
import { PostShoppingCartRequestDto } from 'src/apis/dto/request/shopping-cart';

interface CartUpdateProps {
  onModalViewChange: () => void;
  name:string;
  sequence: string;
}

// component: 장바구니 담기 컴포넌트 //
function CartUpdate({onModalViewChange, name, sequence}: CartUpdateProps) {

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // state: 수량 상태 //
  const [quantity, setQuantity] = useState<number>(0);

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: post shopping cart response 처리 함수 //
  const PostShoppingCartResponse = (responseBody: ResponseDto | null) => {
    const {isSuccess, message} = responseMessage(responseBody);

    if(!isSuccess){
      alert(message);
      return;
    }

    onModalViewChange();
  }

  // event handler: 수량 증가 버튼 클릭 이벤트 //
  const onClickPlusButtonHandler = () => {
    setQuantity(quantity + 1);
  }

  // event handler: 수량 증가 버튼 클릭 이벤트 //
  const onClickMinusButtonHandler = () => {
    if(quantity > 0)setQuantity(quantity - 1);
  }

  // event handler: 장바구니 담기 버튼 클릭 이벤트 //
  const onClickPutCartButtonHandler = () => {
    if(quantity === 0) {
      alert("수량을 선택해주세요!");
      return;
    }

    const productSequence = parseInt(sequence);

    const requestBody: PostShoppingCartRequestDto = {
      quantity, productSequence
    }

    PostShoppingCartRequest(requestBody, accessToken).then(PostShoppingCartResponse);
  }

  // render: 장바구니 담기 컴포넌트 렌더링 //
  return(
    <div className='cart-update-container'>
      <div className='header-box'>
        <div className='title'>{name}</div>
        <div className='close-button'></div>
      </div>
      <div className='cart-update-box'>
        <div className='minus-button' onClick={onClickMinusButtonHandler}></div>
        <div className='quantity'>{quantity}</div>
        <div className='plus-button' onClick={onClickPlusButtonHandler}></div>
      </div>
      <div className='button primary fullwidth' onClick={onClickPutCartButtonHandler}>장바구니 담기</div>
    </div>
  )
}

export default function DetailProduct() {

  // state: cookie 상태 //
  const [cookies] = useCookies();
  // state: 경로 변수 상태 //
  const { sequence = "default" } = useParams<{sequence:string}>();

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
  const [tabMenu, setTabMenu] = useState<string>('설명');
  // state: 찜 클릭 상태 //
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // state: 장바구니 모달 오픈 상태 //
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 찜 클릭여부 클래스 //
  const liked = isLiked ? 'product-tool liked active' : 'product-tool liked';

  // variable: 탭 메뉴 클래스 //
  const descriptionClass = tabMenu === '설명' ? 'content active' : 'content';
  const reviewClass = tabMenu === '후기' ? 'content active' : 'content';

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
    setTabMenu(click);
  }

  // event handler: 장바구니 클릭 이벤트 핸들러 //
  const onUpdateShoppingCartClickHandler = () => {
    setIsCartOpen(!isCartOpen);
  }

  // event handler: 찜 상태 변경 처리 핸들러 //
  const onChangeLikedHandler = () => {
    setIsLiked(!isLiked);
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
          <div className='detail-image'>
            <img src={image} alt='상품 이미지' style={{backgroundSize:'cover'}}/>
          </div>
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
              <div className={liked} onClick={onChangeLikedHandler}></div>
              <div className='product-tool shopping-cart' onClick={onUpdateShoppingCartClickHandler}></div>
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
        {isCartOpen && 
          <Modal 
            title='장바구니 담기'
            onClose={onUpdateShoppingCartClickHandler}
          >
            <CartUpdate onModalViewChange={onUpdateShoppingCartClickHandler} name={name} sequence={sequence} />
          </Modal>
        }
        <div className='detail-product-similar'>
          <div className='title'>유사 상품</div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
