import axios, { AxiosError, AxiosResponse } from 'axios';
import { ResponseDto } from './dto/response';
import { SignInRequestDto } from './dto/request/auth';
import { SignInResponseDto } from './dto/response/auth';
import { GetSignInUserResponseDto } from './dto/response/user';
import { PostProductRequestDto } from './dto/request/product';
import { Category } from 'src/types/aliases';
import { GetProductResponseDto } from './dto/response';
import GetProductDetailResponseDto from './dto/response/get-product-detail.request.dto';
import { ACCESS_TOKEN, COMMUNITY_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { GetCommunityPostResponseDto } from './dto/response/community';
import { PostShoppingCartRequestDto } from './dto/request/shopping-cart';

// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;

const SIGN_IN_URL = `${AUTH_MODULE_URL}/sign-in`;

const USER_MODULE_URL = `${API_DOMAIN}/api/v1/user`;

const GET_SIGN_IN_USER_URL = `${USER_MODULE_URL}/sign-in`;

// 공동구매 API 경로
const PRODUCT_MODULE_URL = `${API_DOMAIN}/api/v1/product`
const POST_PRODUCT_URL = `${PRODUCT_MODULE_URL}/write`;
const GET_PRODUCT_CATEGORY_NAME_URL = (category: Category, name:string) =>  `${PRODUCT_MODULE_URL}?category=${category}&name=${name}`;
const GET_PRODUCT_DETAIL_URL = (sequence:number | string) => `${PRODUCT_MODULE_URL}/${sequence}`; 
const COMMUNITY_MODULE_URL = `${API_DOMAIN}/api/v1/community`;

const FILE_UPLOAD_URL = `${API_DOMAIN}/file/upload`;
const multipartFormData = { headers: { 'Content-Type': 'multipart/form-data' } };

const GET_COMMUNITY_MODULE_URL = `${COMMUNITY_MODULE_URL}`;
const GET_COMMUNITY_POST_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}`;
const DELETE_COMMUNITY_POST_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}`;

// 장바구니 API 경로
const SHOPPING_CART_MODULE_URL = `${API_DOMAIN}/api/v1/cart`;
const POST_SHOPPING_CART_URL = `${SHOPPING_CART_MODULE_URL}/product`;

// function: Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } });

// function: response 성공 처리 함수 //
const responseSuccessHandler = <T = ResponseDto>(response: AxiosResponse<T>) => {
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
export const getProductCategoryRequest = async (category:Category, name: string, accessToken:string) => {
  const responseBody = await axios.get(GET_PRODUCT_CATEGORY_NAME_URL(category, name), bearerAuthorization(accessToken)
  ).then(responseSuccessHandler<GetProductResponseDto>)
   .catch(responseErrorHandler);
  return responseBody;
}

// function: get product detail API 요청 함수 //
export const getProductDetailRequest = async (sequence: number | string, accessToken:string) => {
  const responseBody = await axios.get(GET_PRODUCT_DETAIL_URL(sequence), bearerAuthorization(accessToken))
  .then(responseSuccessHandler<GetProductDetailResponseDto>)
  .catch(responseErrorHandler);
return responseBody;
}
// function: sign in API 요청 함수 //
export const signInRequest = async (requestBody: SignInRequestDto) => {
  const responseBody = await axios.post(SIGN_IN_URL, requestBody)
    .then(responseSuccessHandler<SignInResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get sign in user API 요청 함수 //
export const getSignInUserRequest = async (accessToken: string) => {
  const responseBody = await axios.get(GET_SIGN_IN_USER_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetSignInUserResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}
// function: get product list API 요청 함수 //
export const getProductRequest = async (accessToken: string) => {
  const responseBody = await axios.get(PRODUCT_MODULE_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetProductDetailResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}
    

// function: write product API 요청 함수 //
export const postProductRequest = async (requestBody: PostProductRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_PRODUCT_URL, requestBody, bearerAuthorization(accessToken)
  )
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

// function: get community post API 요청 함수 //
export const getCommunityPostRequest = async (postSequence:number | string) => {
  const responseBody = await axios.get(GET_COMMUNITY_POST_URL(postSequence))
  .then(responseSuccessHandler<GetCommunityPostResponseDto>)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: get community API 요청 함수 //
export const getCommunityRequest = async () => {
  const responseBody = await axios.get(GET_COMMUNITY_MODULE_URL)
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: delete community post API 요청 함수 //
export const deleteCommunityPostRequest = async (postSequence: number | string, accessToken: string) => {
  const responseBody = await axios.delete(DELETE_COMMUNITY_POST_URL(postSequence), bearerAuthorization(accessToken))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: post shopping cart API 요청 함수 //
export const PostShoppingCartRequest = async (requestBody: PostShoppingCartRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_SHOPPING_CART_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}