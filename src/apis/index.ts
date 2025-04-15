import axios, { AxiosError, AxiosResponse } from 'axios';
import ResponseDto from "./dto/response/response.dto";
import { PostProductRequestDto } from './dto/request/product';
import { Category } from 'src/types/aliases';
import { GetProductResponseDto } from './dto/response';
import GetProductDetailResponseDto from './dto/response/get-product-detail.request.dto';

// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const PRODUCT_MODULE_URL = `${API_DOMAIN}/api/v1/product`
const POST_PRODUCT_URL = `${PRODUCT_MODULE_URL}/write`;
const GET_PRODUCT_CATEGORY_NAME_URL = (category: Category, name:string) =>  `${PRODUCT_MODULE_URL}?category=${category}&name=${name}`;
const GET_PRODUCT_DETAIL_URL = (sequence:number | string) => `${PRODUCT_MODULE_URL}/${sequence}`; 

const FILE_UPLOAD_URL = `${API_DOMAIN}/file/upload`;
const multipartFormData = { headers: { 'Content-Type': 'multipart/form-data' } };

const FAKE_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2RmMTIzNCIsImlhdCI6MTc0NDY4NzIzMSwiZXhwIjoxNzQ0NzE5NjMxfQ.icMvql_rjZLTw78lW6u6REQbKXTqxHf5K_9vygog10I";


// function: Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } });

// function: response 성공 처리 함수 //
const responseSuccessHandler = <T = ResponseDto>(response: AxiosResponse<T>) => {
  // response.data: Response Body
  const { data } = response;
  return data;
};

// function: response 실패 처리 함수 //
const responseErrorHandler = (error: AxiosError<ResponseDto>) => {
  if (!error.response) return null;
  const { data } = error.response;
  return data;
};

// function: get product category list API 요청 함수 //
export const getProductCategoryRequest = async (category:Category, name: string) => {
  const responseBody = await axios.get(GET_PRODUCT_CATEGORY_NAME_URL(category, name),{
    headers: {
      Authorization: `Bearer ${FAKE_TOKEN}`,
    }
  }
  ).then(responseSuccessHandler<GetProductResponseDto>)
   .catch(responseErrorHandler);
  return responseBody;
}

// function: get product detail API 요청 함수 //
export const getProductDetailRequest = async (sequence: number | string) => {
  const responseBody = await axios.get(GET_PRODUCT_DETAIL_URL(sequence), {
    headers: {
      Authorization: `Bearer ${FAKE_TOKEN}`,
    }
  })
    .then(responseSuccessHandler<GetProductDetailResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: write product API 요청 함수 //
export const postProductRequest = async (requestBody: PostProductRequestDto) => {
  const responseBody = await axios.post(POST_PRODUCT_URL, requestBody,{
    headers: {
      Authorization: `Bearer ${FAKE_TOKEN}`,
    }
  })
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: file upload 요청 함수 //
export const fileUploadRequest = async (requestBody: FormData) => {
  const responseBody = await axios.post(FILE_UPLOAD_URL, requestBody, multipartFormData)
    .then(responseSuccessHandler<string>)
    .catch(error => null);
  return responseBody;
};

