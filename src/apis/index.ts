import axios, { AxiosError, AxiosResponse } from 'axios';
import { ResponseDto } from './dto/response';
import { SignInRequestDto } from './dto/request/auth';
import { SignInResponseDto } from './dto/response/auth';
import { GetSignInUserResponseDto } from './dto/response/user';
import { PostProductRequestDto } from './dto/request/product';
import { ACCESS_TOKEN } from 'src/constants';
import { GetCommunityPostResponseDto } from './dto/response/community';
import PostCommunityRequestDto from './dto/request/community/post-community.request.dto';
import GetCommunityCommentResponse from './dto/response/community/get-community-comment.response.dto';
import PostCommunityCommentRequestDto from './dto/request/community/post-community-comment.request.dto';
import { Board, CommunityCategory, SearchCategory } from 'src/types/aliases';
import PatchCommunityPostRequestDto from './dto/request/community/patch-community-post.request.dto';

// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;

const SIGN_IN_URL = `${AUTH_MODULE_URL}/sign-in`;

const USER_MODULE_URL = `${API_DOMAIN}/api/v1/user`;

const GET_SIGN_IN_USER_URL = `${USER_MODULE_URL}/sign-in`;

const PRODUCT_MODULE_URL = `${API_DOMAIN}/api/v1/product`
const POST_PRODUCT_URL = `${PRODUCT_MODULE_URL}/write`;

const COMMUNITY_MODULE_URL = `${API_DOMAIN}/api/v1/community`;
const POST_COMMUNITY_URL = `${COMMUNITY_MODULE_URL}/write`;

const FILE_UPLOAD_URL = `${API_DOMAIN}/file/upload`
const multipartFormData = { headers: { 'Content-Type': 'multipart/form-data' } };

const GET_COMMUNITY_MODULE_URL = `${COMMUNITY_MODULE_URL}`;
const GET_COMMUNITY_POST_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}`;
const PATCH_COMMUNITY_POST_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}`;
const PATCH_COMMUNITY_VIEW_COUNT_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}/view`;
const DELETE_COMMUNITY_POST_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}`;
const GET_COMMUNITY_SEARCH_URL = (searchCategory: SearchCategory, keyword: string) => `${COMMUNITY_MODULE_URL}/search?type=${searchCategory}&keyword=${keyword}`;
const POST_COMMUNITY_COMMENT_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}/comment`;
const DELETE_COMMUNITY_COMMENT_URL = (postSequence: number | string, commentSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}/comment/${commentSequence}`;
const GET_COMMUNITY_COMMENT_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}/comment`;
const PUT_COMMUNITY_LIKED_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}/liked`;
const GET_COMMUNITY_LIKED_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}/liked`;

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
export const getProductRequest = async () => {
  const responseBody = await axios.get(PRODUCT_MODULE_URL, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    }
  })
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: write product API 요청 함수 //
export const postProductRequest = async (requestBody: PostProductRequestDto) => {
  const responseBody = await axios.post(POST_PRODUCT_URL, requestBody,{
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
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

// function: get community post API 요청 함수 //
export const getCommunityPostRequest = async (postSequence:number | string) => {
  const responseBody = await axios.get(GET_COMMUNITY_POST_URL(postSequence))
  .then(responseSuccessHandler<GetCommunityPostResponseDto>)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: get community API 요청 함수 //
export const getCommunityRequest = async (boardType:Board | string | null, categoryType: CommunityCategory | string | null) => {
  const responseBody = await axios.get(GET_COMMUNITY_MODULE_URL, { params: { board: boardType, category: categoryType}} )
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: post community API 요청 함수 //
export const postCommunityRequest = async (requestBody: PostCommunityRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_COMMUNITY_URL, requestBody, bearerAuthorization(accessToken))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
}

// function: patch community view count API 요청 함수 //
export const patchCommunityViewCountRequest = async (postSequence: number | string) => {
  const responseBody = await axios.patch(PATCH_COMMUNITY_VIEW_COUNT_URL(postSequence))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
}

// function: delete community post API 요청 함수 //
export const deleteCommunityPostRequest = async (postSequence: number | string, accessToken: string) => {
  const responseBody = await axios.delete(DELETE_COMMUNITY_POST_URL(postSequence), bearerAuthorization(accessToken))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: get community search API 요청 함수 //
export const getCommunitySearchRequest = async (searchCategory: SearchCategory, keyword: string) => {
  const responseBody = await axios.get(GET_COMMUNITY_SEARCH_URL(searchCategory, keyword))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: post community comment API 요청 함수 //
export const postCommunityCommentRequest = async (requestBody:PostCommunityCommentRequestDto, postSequence: number | string, accessToken: string) => {
  const responseBody = await axios.post(POST_COMMUNITY_COMMENT_URL(postSequence), requestBody, bearerAuthorization(accessToken))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
}

// function: delete community comment API 요청 함수 //
export const deleteCommunityCommentRequest = async (postSequence: number | string, commentSequence: number | string, accessToken: string) => {
  const responseBody = await axios.delete(DELETE_COMMUNITY_COMMENT_URL(postSequence, commentSequence), bearerAuthorization(accessToken))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
}

// function: get community comment API 요청 함수 //
export const getCommunityCommentRequest = async (postSequence: number | string) => {
  const responseBody = await axios.get(GET_COMMUNITY_COMMENT_URL(postSequence))
  .then(responseSuccessHandler<GetCommunityCommentResponse>)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: put community liked API 요청 함수 //
export const putCommunityLikedRequest = async (postSequence: number | string, accessToken: string) => {
  const responseBody = await axios.put(PUT_COMMUNITY_LIKED_URL(postSequence), {}, bearerAuthorization(accessToken))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
}

// function: get community liked API 요청 함수 //
export const getCommunityLikedRequest = async (postSequence: number | string) => {
  const responseBody = await axios.get(GET_COMMUNITY_LIKED_URL(postSequence))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
}