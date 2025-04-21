import axios, { AxiosError, AxiosResponse } from 'axios';
import { ResponseDto } from './dto/response';
import { IdCheckRequestDto, ResignedCheckRequestDto, SignInRequestDto, SignUpRequestDto, VerificationRequestDto } from './dto/request/auth';
import { SignInResponseDto } from './dto/response/auth';
import { GetSignInUserResponseDto } from './dto/response/user';
import { PostProductRequestDto } from './dto/request/product';
import { Category } from 'src/types/aliases';
import { GetProductResponseDto } from './dto/response';
import GetProductDetailResponseDto from './dto/response/product/get-product-detail.request.dto';
import { ACCESS_TOKEN, COMMUNITY_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { GetCommunityPostResponseDto } from './dto/response/community';
import { PostShoppingCartRequestDto } from './dto/request/shopping-cart';
import PostPaymentConfirmRequestDto from './dto/request/payment/post-payment-confirm.request.dto';
import PostOrderRequestDto from './dto/request/payment/post-order.request.dto';
import { GetShoppingCartResponseDto } from './dto/response/shoppingCart';
import { GetOrderResponseDto } from './dto/response/payment';
import PostCommunityRequestDto from './dto/request/community/post-community.request.dto';
import GetCommunityCommentResponse from './dto/response/community/get-community-comment.response.dto';
import PostCommunityCommentRequestDto from './dto/request/community/post-community-comment.request.dto';
import { Board, CommunityCategory, SearchCategory } from 'src/types/aliases';
import PatchCommunityPostRequestDto from './dto/request/community/patch-community-post.request.dto';
import PostAlertRequestDto from './dto/request/alert/post-alert.request.dto';
import GetAlertResponseDto from './dto/response/alert/get-alert.response.dto';


// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const USER_MODULE_URL = `${API_DOMAIN}/api/v1/user`;
const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;

const ID_CHECK_URL = `${AUTH_MODULE_URL}/id-check`;
const SIGN_UP_URL = `${AUTH_MODULE_URL}/sign-up`;
const SEND_VERIFY_CODE_URL = `${AUTH_MODULE_URL}/send-verify-code`;
const VERIFY_CODE_URL = `${AUTH_MODULE_URL}/verify-code`;
const RESIGNED_CHECK_URL = `${AUTH_MODULE_URL}/resigned-check`;

const PAYMENT_URL = `${API_DOMAIN}/api/v1/payments`;
const SIGN_IN_URL = `${AUTH_MODULE_URL}/sign-in`;
const GET_SIGN_IN_USER_URL = `${USER_MODULE_URL}/sign-in`;

// 공동구매 API 경로
const PRODUCT_MODULE_URL = `${API_DOMAIN}/api/v1/product`
const POST_PRODUCT_URL = `${PRODUCT_MODULE_URL}/write`;

const GET_PRODUCT_CATEGORY_NAME_URL = (category: Category, name:string) =>  `${PRODUCT_MODULE_URL}?category=${category}&name=${name}`;
const GET_PRODUCT_DETAIL_URL = (sequence:number | string) => `${PRODUCT_MODULE_URL}/${sequence}`; 

const COMMUNITY_MODULE_URL = `${API_DOMAIN}/api/v1/community`;
const POST_COMMUNITY_URL = `${COMMUNITY_MODULE_URL}/write`;

const FILE_UPLOAD_URL = `${API_DOMAIN}/file/upload`;
const multipartFormData = { headers: { 'Content-Type': 'multipart/form-data' } };

const ALERT_MODULE_URL = `${API_DOMAIN}/api/v1/alert`;

const GET_COMMUNITY_MODULE_URL = `${COMMUNITY_MODULE_URL}`;
const GET_COMMUNITY_POST_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}`;
const PATCH_COMMUNITY_POST_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}`;
const PATCH_COMMUNITY_VIEW_COUNT_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}/view`;
const DELETE_COMMUNITY_POST_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}`;

// 장바구니 API 경로
const SHOPPING_CART_MODULE_URL = `${API_DOMAIN}/api/v1/cart`;
const POST_SHOPPING_CART_URL = `${SHOPPING_CART_MODULE_URL}/product`;
const GET_SHOPPING_CART_URL = `${SHOPPING_CART_MODULE_URL}/product`;
const DELETE_SHOPPING_CART_URL = `${SHOPPING_CART_MODULE_URL}/product`

const POST_ORDER_URL = `${PAYMENT_URL}/`;
const GET_ORDER_URL = `${PAYMENT_URL}/`;
const POST_PAYMENT_CONFIRM_URL =  `${PAYMENT_URL}/confirm`;

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

// function: id check API 요청 함수 //
export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
  const responseBody = await axios.post(ID_CHECK_URL, requestBody)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: sign up API 요청 함수 //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const responseBody = await axios.post(SIGN_UP_URL, requestBody)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: send verify code API 요청 함수 //
export const sendVerifyCodeRequest = async (telNumber: string) => {
  const responseBody = await axios.post(SEND_VERIFY_CODE_URL, {telNumber})
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: verify code API 요청 함수 //
export const verifyCodeRequest = async (requestBody: VerificationRequestDto) => {
  const responseBody = await axios.post(VERIFY_CODE_URL, requestBody)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: resigned check API 요청 함수 //
export const resignedCheckRequest = async (
  requestBody: ResignedCheckRequestDto
): Promise<any> => {
  try {
    const response = await axios.post(RESIGNED_CHECK_URL, requestBody, {
      headers: {
        Authorization: undefined,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('서버에서 반환한 에러:', error.response?.data);

    const statusCode = error.response?.status;

    if (statusCode === 403) {
      throw new Error("RESIGNED_USER");
    }

    responseErrorHandler(error);
    return null;
  }
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

// function: post shopping cart API 요청 함수 //
export const postShoppingCartRequest = async (requestBody: PostShoppingCartRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_SHOPPING_CART_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: get shopping cart API 요청 함수 //
export const getShoppingCartRequest = async (accessToken: string) => {
  const responseBody = await axios.get(GET_SHOPPING_CART_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetShoppingCartResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: delete shopping cart API 요청 함수 //
export const deleteShoppingCartRequest = async (shoppingCartSequence: number, accessToken: string) => {
  const responseBody = await axios.delete(DELETE_SHOPPING_CART_URL, {
    ...bearerAuthorization(accessToken),
    data: {
      shoppingCartSequence: shoppingCartSequence
    }
  })
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: post order API 요청 함수 //
export const postOrderRequest = async (requestBody: PostOrderRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_ORDER_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: get order API 요청 함수 //
export const getOrderRequest = async(accessToken: string) => {
  const responseBody = await axios.get(GET_ORDER_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetOrderResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: post payment confirm API 요청 함수 //
export const postPaymentConfirm = async(requestBody: PostPaymentConfirmRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_PAYMENT_CONFIRM_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

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

// function: post alert API 요청 함수 //
export const postAlertRequest = async (requestBody: PostAlertRequestDto, accessToken: string) => {
  const responseBody = await axios.post(ALERT_MODULE_URL, requestBody, bearerAuthorization(accessToken))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
}

// function: get alert API 요청 함수 //
export const getAlertRequest = async (accessToken: string) => {
  const responseBody = await axios.get(ALERT_MODULE_URL, bearerAuthorization(accessToken))
  .then(responseSuccessHandler<GetAlertResponseDto>)
  .catch(responseErrorHandler);
  return responseBody;
}

