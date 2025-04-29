import React, { useEffect, useMemo, useState } from 'react'
import './style.css'
import { deleteProductRequest, deleteWishRequest, getProductDetailRequest, getProductReviewImagesRequest, getProductReviewsRequest, getReserveRequest, getWishRequest, patchProductRequest, postShoppingCartRequest, postWishRequest } from 'src/apis';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ACCESS_TOKEN, PRODUCT_ABSOLUTE_PATH, SHOPPING_CART_ABSOLUTE_PATH } from 'src/constants';
import { Category } from 'src/types/aliases';
import { useCookies } from 'react-cookie';
import GetProductDetailResponseDto from 'src/apis/dto/response/product/get-product-detail.response.dto';
import { GetWishResponseDto, ResponseDto } from 'src/apis/dto/response';
import { responseMessage } from 'src/utils';
import Modal from 'src/components/Modal';
import { PostShoppingCartRequestDto } from 'src/apis/dto/request/shopping-cart';
import { Product, ProductReviewImages, ProductReviews, ShoppingCart } from 'src/types/interfaces';
import { GetProductReviewsResponseDto, GetReserveResponseDto, GetReviewImagesResponseDto } from 'src/apis/dto/response/product';
import { usePagination } from 'src/hooks';
import { Console } from 'console';
import activeStar from 'src/assets/images/icon-star-active.png';
import emptyStar from 'src/assets/images/icon-star-none.png';
import { useSignInUserStore } from 'src/stores';

interface CartUpdateProps {
  onModalViewChange: () => void;
  name:string;
  sequence: string;
}

interface ReviewProps {
  review: ProductReviews;
  reviewImages: ProductReviewImages[];
}

// function: 현재 날짜 구하기 함수 //
const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};


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

    postShoppingCartRequest(requestBody, accessToken).then(PostShoppingCartResponse);
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

// component: 상품 후기 컴포넌트 //
function ProductReview({review, reviewImages}: ReviewProps) {

  const { reviewSequence, userId, postDate, rating, content } = review;
  
  const imagesForReview = reviewImages.filter(
    (img) => img.reviewSequence === reviewSequence
  );

  return(
    <li>
      <div className='info'>
        <div className='profile-image'>
        
        </div>
        <div className='user'>{userId}</div>
      </div>
      <div className='content'>
        <div className='content-top'>
          <div className='review-rating'>
            {[...Array(5)].map((_,index) => (
              <img key={index} src={index < rating ? activeStar : emptyStar} alt='star' className='star'/>
            ))}
          </div>
          <div className='review-date'>{postDate.slice(0,10)}</div>
        </div>
        <div className='review-content'>{content}</div>
        <div className='review-images'>
          {imagesForReview.map(
            (image, index) => <div key={index} className='review-image'><img src={image.reviewImage}/></div>
          )}
        </div>
      </div>
      
    </li>
  )
}

// component: 상품 상세보기 페이지 컴포넌트 //
export default function DetailProduct() {

  // state: 페이지네이션 상태 //
  const { 
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList, totalList
  } = usePagination<ProductReviews>();

  // state: cookie 상태 //
  const [cookies] = useCookies();
  // state: 경로 변수 상태 //
  const { productNumber = "default" } = useParams<{productNumber:string}>();
  // state: 로그인 사용자 아이디 상태 //
  const { userId } = useSignInUserStore();

  // state: 이미지 상태 //
  const [image, setImage] = useState<string>('');
  // state: 카테고리 상태 //
  const [category, setCategory] = useState<Category>('전체');
  // state: 제목 상태 //
  const [name, setName] = useState<string>('');
  // state: 게시자 아이디 상태 //
  const [writerId, setWriterId] = useState<string>('');
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
  // state: 오픈예정 일자 상태 //
  const [openDate, setOpenDate] = useState<string>('');
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
  // state: 주문 예약 상품 개수 상태 //
  const [quantity, setQuantity] = useState<number>(0);
  // state: review 이미지 상태 //
  const [reviewImages, setReviewImages] = useState<ProductReviewImages[]>([]);

  // state: 장바구니 모달 오픈 상태 //
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // variable: 현재 경로 변수 //
  const pathname = useLocation().pathname;
  const url = "http://localhost:3000" + pathname;

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 찜 클릭여부 클래스 //
  const liked = isLiked ? 'product-tool liked active' : 'product-tool liked';

  // variable: 탭 메뉴 클래스 //
  const descriptionClass = tabMenu === '설명' ? 'content active' : 'content';
  const reviewClass = tabMenu === '후기' ? 'content active' : 'content';

  // variable: 오픈 예정 여부 클래스 //
  const isOpen = openDate === null ? true : openDate <= getToday() ? true : false;

  // function: 평점 라벨 구하는 함수 //
  const getRatingLabel = (rating: number):string => {
    switch(true) {
      case rating > 0 && rating < 1:
        return 'grade Bad';
      case rating >= 1 && rating < 2:
        return 'grade Soso';
      case rating >= 2 && rating < 3:
        return 'grade Good';
      case rating >= 3 && rating < 4:
        return 'grade Great';
      case rating >= 4 && rating <= 5:
        return 'grade Excellent';
      default:
        return 'grade Unknown';
    }
  }

  // variable: 리뷰 아이콘 클래스//
  const reviewIcon = getRatingLabel(rating);
  // variable: 리뷰 아이콘 변수 //
  const reviewFace = 
    reviewIcon === 'grade Bad' ? '정말 안 좋음' : 
    reviewIcon === 'grade Soso' ? '별로' :
    reviewIcon === 'grade Good' ? '평범함' : 
    reviewIcon === 'grade Great' ? '좋음' :
    reviewIcon === 'grade Excellent' ? '최고' : '아직 등록된 리뷰가 없습니다.';

  // function: navigate 함수 //
  const navigate = useNavigate();

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
    setWriterId(userId);
    setPrice(price);
    setCategory(category);
    setProductQuantity(productQuantity);
    setBoughtAmount(boughtAmount);
    setPurchasedPeople(purchasedPeople);
    setDeadline(deadline);
    setIsSoldOut(isSoldOut);
    setProductContent(content);
    setOpenDate(openDate);
  }

  // function: post shopping cart 처리 함수 //
  const postShoppingCartResponse = (responseBody: ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);
    
    if(!isSuccess){
      alert(message);
      return;
    }

    navigate(SHOPPING_CART_ABSOLUTE_PATH);
  }

  // function: get reserve cart 처리 함수 //
  const getReserveResponse = (responseBody: GetReserveResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);
    
    if(!isSuccess){
      alert(message);
      return;
    }

    const {quantity} = responseBody as GetReserveResponseDto;
    setQuantity(quantity);
  }

  // function: get wish 처리 함수 //
  const getWishResponse = (responseBody: GetWishResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    const {wishListEntity} = responseBody as GetWishResponseDto;

    if(isSuccess && responseBody && 'productSequence' in wishListEntity) setIsLiked(true);
  }

  // function: get product reviews 처리 함수 //
  const getProductReviewsResponse = (responseBody: GetProductReviewsResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess){
      alert(message);
      return;
    }

    const { productReviews } = responseBody as GetProductReviewsResponseDto;
    if(productReviews) setTotalList(productReviews);
  }

  // function: get product review Images 처리 함수 //
  const getProductReviewImagesResponse = (responseBody: GetReviewImagesResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess){
      alert(message);
      return;
    }

    const { reviewImages } = responseBody as GetReviewImagesResponseDto;
    setReviewImages(reviewImages);
  }

  // function: delete product 처리 함수 //
  const deleteProductResponse = (responseBody: ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess){
      alert(message);
      return;
    }
  }


  // event handler: 상품 설명, 후기 변경 이벤트 핸들러 //
  const onChangeProductHandler = (click: string) => {
    setTabMenu(click);
  }

  // event handler: 장바구니 클릭 이벤트 핸들러 //
  const onUpdateShoppingCartClickHandler = () => {
    if(!isOpen){
      alert('오픈 예정 상품입니다.');
      return;
    }
    setIsCartOpen(!isCartOpen);
  }

  // event handler: 찜 상태 변경 처리 핸들러 //
  const onChangeLikedHandler = () => {

    if(isLiked) {
      deleteWishRequest(+productNumber, accessToken);
    }else{
      postWishRequest(+productNumber, accessToken);
    }

    setIsLiked(!isLiked);
  }

  // event handler: 공유하기 클릭 이벤트 핸들러 //
  const copyToClipboard = async (text:string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('복사되었습니다!');
    } catch (err) {
      alert('복사 실패');
    }
  };
  

  // event handler: 공동구매 참여 버튼 클릭 이벤트 핸들러 //
  const onParticipationButtonClickHandler = () => {

    if(!isOpen){
      alert('오픈 예정 상품입니다.');
      return;
    }
    
    const requestBody: PostShoppingCartRequestDto = {
      productSequence: parseInt(productNumber), quantity:1
    }

    postShoppingCartRequest(requestBody, accessToken).then(postShoppingCartResponse);
  }

  // event handler: 공동구매 삭제 버튼 클릭 이벤트 핸들러 //
  const onRemoveProductClickHandler = () => {
    deleteProductRequest(productNumber, accessToken).then(deleteProductResponse);
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

  // effect: 제품 리뷰 리스트 변경시 실행할 함수 //
  useEffect(() => {
    if(totalList.length === 0) return;
    const avgRating = totalList.map(review => review.rating).reduce((sum, rating) => sum + rating, 0) / totalList.length;
    setRating(avgRating);
  }, [totalList]);

  // effect: 컴포넌트 렌더링 시 실행할 함수 //
  useEffect(() => {
    if(!productNumber){
      navigate(PRODUCT_ABSOLUTE_PATH);
      return;
    }

    getProductDetailRequest(productNumber, accessToken).then(getProductDetailResponse);
    getReserveRequest(productNumber).then(getReserveResponse);
    getWishRequest(productNumber, accessToken).then(getWishResponse);
    getProductReviewsRequest(productNumber).then(getProductReviewsResponse);
    getProductReviewImagesRequest(productNumber).then(getProductReviewImagesResponse);
  },[]);

  return (
    <div id='detail-product-wrapper'>
      <div className='detail-product-container'>
        <div className='detail-product-content'>
          <div className='detail-image'>
            <img src={image} alt='상품 이미지' style={{backgroundSize:'cover'}}/>
          </div>
          <div className='detail-product-info'>
            {openDate && openDate > getToday() && (
              <div className='content category bold'>
                {category} &nbsp; {openDate} 오픈 예정
              </div>
            )}
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
              <div className='content bold red-title'>{achievement}% 달성</div>
              <div className='content-box'>
                <div className='content sub'>{}잔여 수량</div>
                <div className='content bold'>{remainingQuantity - quantity} 개</div>
              </div>
              <div className='rating-box'>
                <div className='star'></div>
                <div className='content'>5.0점</div>
              </div>
            </div>
            <div className='button-box'>
              <div className='button black' onClick={onParticipationButtonClickHandler}>참여하기</div>
              {writerId === userId &&
              <div className='button cancel' onClick={onRemoveProductClickHandler}>공동구매 삭제하기</div>
              }
            </div>
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
              <div className='product-tool share' onClick={() => copyToClipboard(url)}></div>
              <div className='product-tool report'></div>
              <div className='button ask'>문의하기</div>
            </div>
          </div>
          {descriptionClass === 'content active' && 
            <div className='jumbotron'>
              <div className='jumbotron-box'>
                {productContent} 
              </div>
            </div>
          }
          {reviewClass === 'content active' && 
            <div className='review-container'>

              <div className='review-box'>
                <div className='grade-img'>
                  <div className={reviewIcon}></div>
                  <div className='img-face'>{reviewFace}</div>
                </div>
                <div className='review-info'>
                  <div className='review-len'>총 {totalList.length.toLocaleString()}건</div>
                  <div className='review-rating'>{rating} 점</div>
                  <div className='star-image'>
                    {[...Array(5)].map((_,index) => (
                      <img key={index} src={index < rating ? activeStar : emptyStar} alt='star' className='star'/>
                    ))}
                  </div>
                </div>
              </div>
              <div className='review-sort'>
                <div className='date'></div>
                <div className=''></div>
              </div>
              <div className='review-images-box'>
                {reviewImages.map((image, index) => <div className='review-image'><img src={image.reviewImage} alt={`리뷰 이미지${index}`}/></div>)}
              </div>
              <div className='review-list-container'>
                <ul className='review-list'>
                    {totalList.map((review, index) => <ProductReview key={index} review={review} reviewImages={reviewImages} />)}
                </ul>
              </div>
            </div>
          }
        </div>
        {isCartOpen && 
          <Modal 
            title='장바구니 담기'
            onClose={onUpdateShoppingCartClickHandler}
          >
            <CartUpdate onModalViewChange={onUpdateShoppingCartClickHandler} name={name} sequence={productNumber} />
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
