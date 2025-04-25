import axios, { AxiosError, AxiosResponse } from 'axios';
import { GetWishListResponseDto, GetWishResponseDto, ResponseDto } from './dto/response';
import { IdCheckRequestDto, ResignedCheckRequestDto, SignInRequestDto, SignUpRequestDto, VerificationRequestDto } from './dto/request/auth';
import { SignInResponseDto } from './dto/response/auth';
import { GetLikeKeywordListResponseDto, GetSignInUserResponseDto, GetUserAccountResponseDto, GetUserIntroductionResponseDto } from './dto/response/user';
import { PatchProductQuantityRequestDto, PostProductRequestDto } from './dto/request/product';
import { Category } from 'src/types/aliases';
import { GetProductResponseDto } from './dto/response';
import GetProductDetailResponseDto from './dto/response/product/get-product-detail.response.dto';
import { ACCESS_TOKEN, COMMUNITY_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { GetCommunityPostResponseDto } from './dto/response/community';
import { PostShoppingCartRequestDto, PostStockReservationRequestDto } from './dto/request/shopping-cart';
import PostPaymentConfirmRequestDto from './dto/request/payment/post-payment-confirm.request.dto';
import PostOrderRequestDto from './dto/request/payment/post-order.request.dto';
import { GetShoppingCartResponseDto } from './dto/response/shoppingCart';
import { GetOrderResponseDto } from './dto/response/payment';
import PostCommunityRequestDto from './dto/request/community/post-community.request.dto';
import GetCommunityCommentResponse from './dto/response/community/get-community-comment.response.dto';
import PostCommunityCommentRequestDto from './dto/request/community/post-community-comment.request.dto';
import { Board, CommunityCategory, SearchCategory } from 'src/types/aliases';
import PatchCommunityPostRequestDto from './dto/request/community/patch-community-post.request.dto';
import { PatchAnswerRequestDto, PostNoticeRequestDto } from './dto/request/admin';
import { PatchQuestionRequestDto, PostQuestionRequestDto } from './dto/request/question';
import { AddLikeKeywordRequestDto, DeleteLikeKeywordRequestDto, PatchUserIntroductionRequestDto } from './dto/request/user';
import { GetNoticeListResponseDto, GetNoticeResponseDto } from './dto/response/notice';
import { GetQuestionListResponseDto, GetQuestionResponseDto } from './dto/response/question';
import PostAlertRequestDto from './dto/request/alert/post-alert.request.dto';
import GetAlertResponseDto from './dto/response/alert/get-alert.response.dto';
import { PostOrderItemRequestDto } from './dto/request/payment';

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
const POST_STOCK_RESERVE_URL = `${PRODUCT_MODULE_URL}/reserve`;
const GET_STOCK_RESERVE_URL = (sequence: number | string) => `${PRODUCT_MODULE_URL}/${sequence}/reserve`;

const PATCH_PRODUCT_QUANTITY_URL = (sequence: number | string) => `${PRODUCT_MODULE_URL}/${sequence}/quantity`;

const GET_PRODUCT_CATEGORY_NAME_URL = (category: Category, name:string) =>  `${PRODUCT_MODULE_URL}?category=${category}&name=${name}`;
const GET_PRODUCT_DETAIL_URL = (sequence:number | string) => `${PRODUCT_MODULE_URL}/${sequence}`; 

// 찜목록 API 경로
const WISHLIST_MODULE_URL = `${API_DOMAIN}/api/v1/wish`;
const POST_WISHLIST_URL = (postSequence: number | string) => `${WISHLIST_MODULE_URL}/${postSequence}`;
const GET_WISHLIST_URL = `${WISHLIST_MODULE_URL}`;
const GET_WISH_URL = (postSequence: number | string) => `${WISHLIST_MODULE_URL}/${postSequence}`;
const DELETE_WISH_URL = (postSequence: number | string) => `${WISHLIST_MODULE_URL}/${postSequence}`;

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

// 결제 API 경로
const POST_ORDER_URL = `${PAYMENT_URL}/`;
const GET_ORDER_URL = `${PAYMENT_URL}/`;
const POST_PAYMENT_CONFIRM_URL =  `${PAYMENT_URL}/confirm`;
const POST_ORDER_ITEM_URL = `${PAYMENT_URL}/order-items`;


const GET_COMMUNITY_SEARCH_URL = (searchCategory: SearchCategory, keyword: string) => `${COMMUNITY_MODULE_URL}/search?type=${searchCategory}&keyword=${keyword}`;
const POST_COMMUNITY_COMMENT_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}/comment`;
const DELETE_COMMUNITY_COMMENT_URL = (postSequence: number | string, commentSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}/comment/${commentSequence}`;
const GET_COMMUNITY_COMMENT_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}/comment`;
const PUT_COMMUNITY_LIKED_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}/liked`;
const GET_COMMUNITY_LIKED_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}/liked`;

// 마이페이지 관련 경로

const MYPAGE_MODULE_URL =  `${API_DOMAIN}/api/v1/mypage`;
const OTHER_MYPAGE_MODULE_URL =  `${API_DOMAIN}/api/v1/mypage/other`;
const OTHER_MYPAGE_VIEW_URL = (userId: string) => `${OTHER_MYPAGE_MODULE_URL}/${userId}`;
const PATCH_MYPAGE_URL = `${MYPAGE_MODULE_URL}`;
const MYPAGE_ACCOUNT_URL = `${API_DOMAIN}/api/v1/mypage/account`;
const PATCH_MYPAGE_ACCOUNT_URL = `${MYPAGE_ACCOUNT_URL}`;
const MYPAGE_KEYWORD_URL = `${MYPAGE_MODULE_URL}/keyword`;
const ADD_MYPAGE_KEYWORD_URL =  `${MYPAGE_KEYWORD_URL}`;
const DELETE_MYPAGE_KEYWORD_URL =  `${MYPAGE_KEYWORD_URL}`;

const QUESTION_MODULE_URL = `${API_DOMAIN}/api/v1/mypage/question`;
const POST_QUESTION_URL = `${QUESTION_MODULE_URL}`;
const GET_QUESTION_LIST_URL= `${QUESTION_MODULE_URL}`;
const GET_QUESTION_POST_URL= (questionSequence: number | string) => `${QUESTION_MODULE_URL}/${questionSequence}`;
const PATCH_QUESTION_POST_URL= (questionSequence: number | string) => `${QUESTION_MODULE_URL}/${questionSequence}`;
const PATCH_QUESTION_ANSWER_URL = (questionSequence: number | string) => `${QUESTION_MODULE_URL}/${questionSequence}`;

const NOTICE_MODULE_URL = `${API_DOMAIN}/api/v1/mypage/notice`;
const GET_NOTICE_LIST_URL = `${NOTICE_MODULE_URL}`;
const POST_NOTICE_URL = `${NOTICE_MODULE_URL}`;
const GET_NOTICE_POST_URL = (sequence: number | string) =>  `${NOTICE_MODULE_URL}/${sequence}`;

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
    
// function: post product API 요청 함수 //
export const postProductRequest = async (requestBody: PostProductRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_PRODUCT_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: patch product quantity API 요청 함수 //
export const patchProductRequest = async (requestBody: PatchProductQuantityRequestDto, sequence: number, accessToken:string) => {
  const responseBody = await axios.post(PATCH_PRODUCT_QUANTITY_URL(sequence), requestBody, bearerAuthorization(accessToken))
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

// function: post wish API 요청 함수//
export const postWishRequest = async(postSequence: number | string, accessToken: string) => {
  const responseBody = await axios.post(POST_WISHLIST_URL(postSequence), null , bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: get wish API 요청 함수//
export const getWishRequest = async(postSequence: number | string, accessToken: string) => {
  const responseBody = await axios.get(GET_WISH_URL(postSequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetWishResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: get wish list API 요청 함수//
export const getWishListRequest = async(accessToken: string) => {
  const responseBody = await axios.post(GET_WISHLIST_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetWishListResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: delete wish API 요청 함수//
export const deleteWishRequest = async(postSequence: number | string, accessToken: string) => {
  const responseBody = await axios.delete(DELETE_WISH_URL(postSequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}
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

// function: post order items API 요청 함수 //
export const postOrderItemsRequest = async (requestBody: PostOrderItemRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_ORDER_ITEM_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: post stock reserve API 요청 함수 //
export const postReserveRequest = async (requestBody: PostStockReservationRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_STOCK_RESERVE_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: get stock API 요청 함수 //
export const getReserveRequest = async(sequence: number | string) => {
  const responseBody = await axios.get(GET_STOCK_RESERVE_URL(sequence))
    .then(responseSuccessHandler<GetOrderResponseDto>)
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

// function: patch question answer API 요청 함수 //
export const patchAnswerRequest = async (questionSequence: number | string, requestBody: PatchAnswerRequestDto, accessToken: string) => {
  const responseBody = await axios.patch(PATCH_QUESTION_ANSWER_URL(questionSequence), requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler)
  return responseBody;
}

// function: post notice API 요청 함수 //
export const postNoticeRequest = async (requestBody: PostNoticeRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_NOTICE_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler)
  return responseBody;
}

// function: get notice list API 요청 함수 //
export const getNoticeListRequest = async (accessToken: string) => {
  const responseBody = await axios.get(GET_NOTICE_LIST_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetNoticeListResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: get notice post API 요청 함수 //
export const getNoticeRequest = async (sequence: number | string, accessToken: string) => {
  const responseBody = await axios.get(GET_NOTICE_POST_URL(sequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetNoticeResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: get question list API 요청 함수 //
export const getQuestionListRequest = async (accessToken: string) => {
  const responseBody = await axios.get(GET_QUESTION_LIST_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetQuestionListResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: get question post API 요청 함수 //
export const getQuestionRequest = async (questionSequence: number | string, accessToken: string) => {
  const responseBody = await axios.get(GET_QUESTION_POST_URL(questionSequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetQuestionResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}


// function: post question API 요청 함수 //
export const postQuestionRequest = async (requestBody: PostQuestionRequestDto, accessToken: string) => {
  const responseBody = await axios.post(POST_QUESTION_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler)
  return responseBody;
}

// function: patch question API 요청 함수 //
export const patchQuestionRequest = async (questionSequence: number | string, requestBody: PatchQuestionRequestDto, accessToken: string) => {
  const responseBody = await axios.patch(PATCH_QUESTION_ANSWER_URL(questionSequence), requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler)
  return responseBody;
}

// function: add like keyword API 요청 함수 //
export const addLikeKeywordRequest = async (requestBody: AddLikeKeywordRequestDto, accessToken: string) => {
  const responseBody = await axios.post(ADD_MYPAGE_KEYWORD_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler)
  return responseBody;
}

// function: delete like keyword API 요청 함수 //
export const deleteLikeKeywordRequest = async (requestBody: DeleteLikeKeywordRequestDto, accessToken: string) => {
  const responseBody = await axios.delete(DELETE_MYPAGE_KEYWORD_URL, {
    headers: {
      Authorization:  `Bearer ${accessToken}`,
    },
    data: requestBody
  })
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: get like keyword API 요청 함수 //
export const getLikeKeywordListRequest = async (accessToken: string) => {
  const responseBody = await axios.get(MYPAGE_KEYWORD_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetLikeKeywordListResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: get user introductrion API 요청 함수 //
export const getUserIntroductionRequest = async (accessToken: string) => {
  const responseBody = await axios.get(MYPAGE_MODULE_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetUserIntroductionResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: get other user introductrion API 요청 함수 //
export const getOtherUserIntroductionRequest = async (userId: string) => {
  const responseBody = await axios.get(OTHER_MYPAGE_VIEW_URL(userId))
    .then(responseSuccessHandler<GetUserIntroductionResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: patch user introduction API 요청 함수 //
export const patchUserIntroductionRequest = async (requestBody: PatchUserIntroductionRequestDto, accessToken: string) => {
  const responseBody = await axios.patch(PATCH_MYPAGE_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler)
  return responseBody;
}

// function: patch user account API 요청 함수 //
export const patchUserAccountRequest = async (requestBody: PatchQuestionRequestDto, accessToken: string) => {
  const responseBody = await axios.patch(PATCH_MYPAGE_ACCOUNT_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler)
  return responseBody;
}

// function: get user account API 요청 함수 //
export const getUserAccountRequest = async (accessToken: string) => {
  const responseBody = await axios.get(MYPAGE_ACCOUNT_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetUserAccountResponseDto>)
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

