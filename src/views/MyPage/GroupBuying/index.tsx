import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import MypageSidebar from 'src/layouts/MypageSidebar';
import { fileUploadsRequest, getMyBuyingRequest, postProductReviewRequest } from 'src/apis';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';
import { GetMyBuyingResponseDto } from 'src/apis/dto/response/user';
import { ResponseDto } from 'src/apis/dto/response';
import { responseMessage } from 'src/utils';
import { MyBuying } from 'src/types/interfaces';
import Pagination from 'src/components/Pagination';
import { usePagination } from 'src/hooks';
import Modal from 'src/components/Modal';
import { PostProductReviewRequestDto } from 'src/apis/dto/request/user';

interface ProductItemProps {
  buyingContent: MyBuying
}

// component: 리뷰작성 모달 컴포넌트 //
function ProductReview({buyingContent}: ProductItemProps) {

  const { name, image, orderItemSequence } = buyingContent;

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // state: 평점 상태 //
  const [rating, setRating] = useState<number>(0);
  // state: 리뷰 이미지 상태 //
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null, null]);
  // state: 리뷰 글 상태 //
  const [content, setContent] = useState<string>('');
  // state: 파일 인풋 참조 상태 //
  const fileRefs = useRef<HTMLInputElement[]>([]);
  const [previewImages, setPreviewImages] = useState<(string | null)[]>([null, null, null, null, null]);


  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];

  const starClass = (value:number) => {
    return rating >= value ? 'star active' : 'star';
  } 

  // function: post product review response 함수 //
  const postProductReviewResponse = (responseBody: ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);
    
    if(!isSuccess){
      alert(message)
      return;
    }

    alert('리뷰를 작성했습니다!');
  }

  // event handler: 별점 아이콘 클릭 이벤트 핸들러 //
  const onStarRatingClickHandler = (e:React.MouseEvent<HTMLLIElement>) => {
    const value = Number(e.currentTarget.dataset.value);
    
    setRating(value);
  }

  // event handler: 리뷰 컨텐츠 변경 이벤트 핸들러 //
  const onReviewContentChangeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setContent(value);
  }

  // event handler: 사진 등록 클릭 이벤트 핸들러 //
  const onFileClickHandler = (index: number) => {
    if(fileRefs.current[index]){
      fileRefs.current[index].click();
    }
  }

  // event handler: 사진 등록 이벤트 핸들러 //
  // event handler: 사진 등록 이벤트 핸들러 //
const onFileChangeHandler = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; // 선택한 파일을 가져옵니다.
  if (file) {
    // 새 이미지 배열을 만들고 선택한 파일을 해당 인덱스에 할당합니다.
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = file;
    setImageFiles(newImageFiles); // imageFiles 상태를 업데이트합니다.

    // FileReader로 미리보기 이미지를 생성합니다.
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file); // 파일을 읽어 data URL로 변환합니다.

    fileReader.onloadend = () => {
      // 파일 읽기가 끝나면, 미리보기 이미지를 상태로 저장합니다.
      const newPreviewImages = [...previewImages];
      newPreviewImages[index] = fileReader.result as string; // 미리보기 이미지 URL을 저장
      setPreviewImages(newPreviewImages); // previewImages 상태를 업데이트합니다.
    };
    }

    console.log(imageFiles); // 이미지 파일 목록 출력 (디버깅용)
  };


  // event handler: 사진 삭제 이벤트 핸들러 //
  const onImageDeleteClickHandler = (index: number) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = null;
    setImageFiles(newImageFiles);
  }

  // event handler: 리뷰 작성 버튼 클릭 이벤트 핸들러 //
  const onClickReviewPost = async () => {
    let reviewImages: string[] | null = null ;
    const formData = new FormData();

    imageFiles.forEach((file, index) => {
      if(file !== null) {
        formData.append('files', file);
      }
    });

    if(imageFiles){
      reviewImages = await fileUploadsRequest(formData);
    }

    const requestBody: PostProductReviewRequestDto = {
      productSequence: orderItemSequence, rating, content , reviewImages
    }

    console.log(imageFiles);

    postProductReviewRequest(requestBody, accessToken).then(postProductReviewResponse);
  }
  
  return (
    <div className='review-container'>
      <div className='product-info'>
        <img src={image} alt='제품 이미지'/>
        <div className='product-name'>{name}</div>
      </div>
      <div className='rating-box'>
        <div className='question'>상품은 어떠셨나요?</div>
        <ul>
          {[1,2,3,4,5].map((num) => (
            <li 
              key={num}
              data-value={num}
              className='on'
              onClick={onStarRatingClickHandler}
            >
              <div className={starClass(num)}></div>
            </li>
          ))}
        </ul>
      </div>
      <div className='review-text-box'>
        <div className='question'>솔직한 상품 리뷰를 남겨주세요</div>
        <textarea value={content} maxLength={400} placeholder='꿀팁 가득, 상세한 리뷰를 작성해보세요!' onChange={onReviewContentChangeHandler}/>
      </div>
      <div className='review-image-list'>
        <div className='question'>사진</div>
        <ul>
          {[1,2,3,4,5].map((index) => (
            <li key={index} className='review-image'>
            
            {!imageFiles[index] ? (
              // 이미지가 없는 경우, 파일 입력 버튼을 표시
              <div>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  style={{ display: 'none' }}
                  ref={(el) => {
                    if (el) fileRefs.current[index] = el;
                  }}
                  onChange={(e) => onFileChangeHandler(index, e)}
                />
                <div className='img-upload' onClick={() => onFileClickHandler(index)}>
                </div>
              </div>
            ) : (
              // 이미지가 있으면 해당 이미지를 표시
              <div className='image-container'>
                {previewImages[index] && (
                    <img 
                      src={previewImages[index] as string} 
                      alt={`리뷰 이미지 ${index + 1}`} 
                    />
                  )}
                <div className='icon-class' onClick={() => onImageDeleteClickHandler(index)}></div>
              </div>
            )}
          </li>
          
          ))}
        </ul>
      </div>
      <div className='button primary fullwidth' style={{cursor: 'pointer'}} onClick={onClickReviewPost}>리뷰 등록하기</div>
    </div>
  )

  
}


// component: 구매목록 상품 컴포넌트 //
function ProductItem({
  buyingContent
}: ProductItemProps) {

  // state: 리뷰작성 버튼 클릭 상타 //
  const [isReviewClick, setIsReviewClick] = useState<boolean>(false);

  const { orderItemSequence, name, image, quantity, price, approvedTime } = buyingContent;

  // variable: 구매일자 변수 //
  const buyingDay = approvedTime.slice(0,10);
  // variable: 총 결제 금액 변수 //
  const totalPrice = quantity * price;

  // event handler: 리뷰작성 버튼 클릭 이벤트 핸들러 //
  const onReviewClickHandler = () => {
    setIsReviewClick(!isReviewClick);
  }

  // render: 구매목록 상품 컴포넌트 렌더링 //
  return (
    <div className='tr'>
      <div className='td date'>{buyingDay}</div>
      <div className='td detail-box'>
        <img src={image} alt='제품 사진'/>
        <div className='text-box'>
          <div className='title'>{name}</div>
          <div className='review-button' onClick={onReviewClickHandler}>리뷰 작성</div>
        </div>
      </div>
      <div className='td quantity'>{quantity}</div>
      <div className='td amount'>{totalPrice.toLocaleString()}원</div>
      <div className='td order-number'>F45242Sx</div>
      {isReviewClick &&
        <Modal title='리뷰 작성' onClose={onReviewClickHandler}>
          <ProductReview buyingContent={buyingContent}/>
        </Modal>
      }
    </div>
  );
}


export default function GroupBuying() {

  // state: 페이지네이션 상태 //
  const { 
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList, totalList
  } = usePagination<MyBuying>();

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // state: 구매 목록 상태 //
  const [buyList, setBuyList] = useState<MyBuying[]>([]);

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];
  
  // function: get my buying response 함수 //
  const getMyBuyingResponse = (responseBody: GetMyBuyingResponseDto | ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess){
      alert(message);
      return message;
    }

    const { myBuying } = responseBody as GetMyBuyingResponseDto;
    setBuyList(myBuying);
    setTotalList(buyList);
  }

  useEffect(() => {
    getMyBuyingRequest(accessToken).then(getMyBuyingResponse);
  },[])

  return (
    <div id='group-buying-main-wrapper'>
      <MypageSidebar/>
      <div className='body'>
          <div className='select-bar'>
            <div className='content'>찜한 목록</div>
            <div className='content active'>구매목록</div>
            <div className='content'>판매목록</div>
          </div>
          <div className='product-list-table'>
            <div className='tr'>
              <div className='th date'>주문일자</div>
              <div className='th detail-box'>상품명</div>
              <div className='th quantity'>수량</div>
              <div className='th amount'>주문금액</div>
              <div className='th order-number'>배송조회</div>
            </div>
            {buyList.map((product, index) => (
            <ProductItem key={index}  buyingContent={product} />
            ))}
          </div>
          <div className='pagination-container'>
            {totalSection !== 0 &&
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                pageList={pageList}
                totalSection={totalSection}
              />
            }
          </div>
      </div>
      
    </div>
  )
}
