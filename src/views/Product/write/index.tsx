import React, { ChangeEvent, useRef, useState } from 'react'
import TextEditor from 'src/components/TextEditor';
import "./style.css"
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, PRODUCT_ABSOLUTE_PATH } from 'src/constants';
import { PostProductRequestDto } from 'src/apis/dto/request/product';
import Category from 'src/types/aliases/category.alias';
import { fileUploadRequest, postProductRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import { responseMessage } from 'src/utils';

const getToday = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export default function ProductWrite() {

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // state: 제목 상태 //
  const [name, setName] = useState<string>('');
  // state: 이미지 상태 //
  const [image, setImage] = useState<File | null>(null);
  // state: 카테고리 상태 //
  const [category, setCategory] = useState<'' | Category>('');
  // state: 마감일자 상태 //
  const [deadline, setDeadLine] = useState<string>(getToday());
  // state: 오픈예정 일자 상태 //
  const [openDate, setOpenDate] = useState<string>(getToday());
  // state: 판매가 상태 //
  const [price, setPrice] = useState<number>(0);
  // state: 판매 개수 상태 //
  const [productQuantity, setProductQuantity] = useState<number>(0);
  // state: 상품 설명 상태 //
  const [content, setContent] = useState<string>('');

  // state: 파일 인풋 참조 상태 //
  const fileRef = useRef<HTMLInputElement | null>(null);
  // state: 제품 이미지 상태 //
  const [imageFile, setImageFile] = useState<File | null>(null);
  // state: 제품 이미지 미리보기 상태 //
  const [previewProduct, setPreviewProduct] = useState<string | null>(null);

  // variable: access token //
  const accessToken = cookies[ACCESS_TOKEN];
  // variable: 상품 작성 가능 여부 //
  const isActive = name !== '' && category !== '' && deadline !== '' && price !== 0 && productQuantity !== 0 && content !== '';


  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: post product response 함수 //
  const postProductResponse = (responseBody: ResponseDto | null) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if(!isSuccess) {
      alert(message);
      return;
    }

    navigator(PRODUCT_ABSOLUTE_PATH);
  }

  // event handler: 제목 입력 이벤트 핸들러 //
  const onTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setName(value);
  }

  // event handler: 내용 변경 이벤트 처리 //
  const onContentChangeHandler = (content: string) => {
    setContent(content);
  };

  // event handler: 카테고리 변경 이벤트 처리 //
  const onCategoryChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value  = e.currentTarget.value as Category | '';
    if(value === '') return;
    setCategory(value);
  }

  // event handler: 마감기한 변경 이벤트 처리 //
  const onDueDateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDeadLine(e.target.value);
  }

  const onOpenDateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setOpenDate(e.target.value);
  }
  // event handler: 마감기한 변경 이벤트 처리 //
  const onPriceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setPrice(value === '' ? 0 : parseInt(value));
  }

  // event handler: 마감기한 변경 이벤트 처리 //
  const onSoldQuantityChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setProductQuantity(value === '' ? 0 : parseInt(value));
  }

  // event handler: 이미지 파일 업로드 버튼 이벤트 처리 //
  const onFileUploadButtonClickHandler = () => {
    if (!fileRef.current) return;
    fileRef.current.click();
  }

  // event handler: 파일 인풋 변경 이벤트 처리 //
  const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || !files.length) return;

    const file = files[0];
    setImageFile(file);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setPreviewProduct(fileReader.result as string);
    };
  };

  // event handler: 제품작성 취소 이벤트 처리 //
  const onCancelButtonClickHandler = () => {
    navigator(PRODUCT_ABSOLUTE_PATH);
  }

  // event handler: 제품작성 이벤트 처리 //
  const onWriteButtonClickHandler = async () => {
    let productImage: string | null = null;
    if(!isActive) return;
    
    if(imageFile){
      const formData = new FormData();
      formData.append('file', imageFile);

      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      
      productImage = await fileUploadRequest(formData);
      console.log(formData);
    }
    
    if(!productImage) return;

    const requestBody: PostProductRequestDto = {
      name, price, category, content, productQuantity, deadline, image: productImage, openDate
    }
    
    console.log('response: ', requestBody);
    postProductRequest(requestBody, accessToken).then(postProductResponse);
  }

  return (
    <div id='product-write-wrapper'>
      <div className='write-container'>
        <div className='write-title'>공동구매 판매글 작성</div>
        <div className='contents-container'>
          <div className='title-box'>
            <div className='title'>제목</div>
            <input type='text' value={name} placeholder='제목을 입력해 주세요.' onChange={onTitleChangeHandler}/>
          </div>
          <div className='img-box'>
            <div className='product-img'>
              {previewProduct && (
                <img src={previewProduct} alt='미리보기' className='preview-image' style={{width:'100%'}}/>
              )}
              </div>
            <div className='product-img-content'>
              <div className='title'>판매 이미지 등록</div>
              <div className='button middle' onClick={onFileUploadButtonClickHandler}>이미지 선택</div>
              <input ref={fileRef} type='file' accept='image/png, image/jpeg' onChange={onFileChangeHandler} />
            </div>
          </div>
          <div className='input-box'>
            <div className='category-box'>
              <div className='title'>카테고리</div>
              <select value={category} onChange={onCategoryChangeHandler}>
                <option value="">카테고리를 선택하세요</option>
                <option value="식품">식품</option>
                <option value="패션의류">의류</option>
                <option value="생필품">생필품</option>
                <option value="가전제품">가전제품</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div className='date-box'>
              <div className='due-date-box'>
                <div className='title'>모집 마감일자</div>
                <input
                  type='date'
                  id='start'
                  name='trip-start'
                  value={deadline}
                  onChange={onDueDateChangeHandler}
                  min={getToday()}  
                />
              </div>
              <div className='due-date-box'>
                <div className='title'>오픈예정 일자</div>
                <input
                  type='date'
                  id='start'
                  name='trip-end'
                  value={openDate}
                  onChange={onOpenDateChangeHandler}
                  min={getToday()}
                  max={deadline}  
                />
              </div>
            </div>
            <div className='price-box'>
              <div className='title'>개당 판매가</div>
              <input type='text' value={price} onChange={onPriceChangeHandler}/> 원
            </div>
            <div className='price-box'>
              <div className='title'>판매 개수</div>
              <input type='text' value={productQuantity} onChange={onSoldQuantityChangeHandler}/> 개
            </div>
          </div>
          <div className='input-content-box'>
            <div className='title'>내용</div>
            <TextEditor content={content} setContent={onContentChangeHandler} />
          </div>
        </div>
        <div className='write-button-box'>
          <div className='write-button cancel' onClick={onCancelButtonClickHandler}>취소</div>
          <div className='write-button' onClick={onWriteButtonClickHandler}>게시</div>
        </div>
      </div>
    </div>
  )
}
