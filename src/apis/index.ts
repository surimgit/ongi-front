import axios, { AxiosError, AxiosResponse } from "axios";
import {
  GetWishListResponseDto,
  GetWishResponseDto,
  ResponseDto,
} from "./dto/response";
import {
  FindIdRequestDto,
  FindPasswordRequestDto,
  IdCheckRequestDto,
  ResignedCheckRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
  VerificationRequestDto,
} from "./dto/request/auth";
import { SignInResponseDto } from "./dto/response/auth";
import {
  GetLikeKeywordListResponseDto,
  GetMyActivityCountResponseDto,
  GetMyBuyingResponseDto,
  GetSignInUserResponseDto,
  GetUserAccountResponseDto,
  GetUserIntroductionResponseDto,
} from "./dto/response/user";
import {
  PatchProductQuantityRequestDto,
  PostProductRequestDto,
} from "./dto/request/product";
import { Category } from "src/types/aliases";
import { GetProductResponseDto } from "./dto/response";
import GetProductDetailResponseDto from "./dto/response/product/get-product-detail.response.dto";
import {
  ACCESS_TOKEN,
  COMMUNITY_VIEW_ABSOLUTE_PATH,
  MY_COMMUNITY_COMMENT_ABSOLUTE_PATH,
  MY_COMMUNITY_COMMENT_PATH,
  MY_COMMUNITY_LIKED_PATH,
  MY_COMMUNITY_POST_PATH,
} from "src/constants";
import {
  GetCommunityPostResponseDto,
  GetCommunityResponseDto,
} from "./dto/response/community";
import {
  PostShoppingCartRequestDto,
  PostStockReservationRequestDto,
} from "./dto/request/shopping-cart";
import PostPaymentConfirmRequestDto from "./dto/request/payment/post-payment-confirm.request.dto";
import PostOrderRequestDto from "./dto/request/payment/post-order.request.dto";
import { GetShoppingCartResponseDto } from "./dto/response/shoppingCart";
import { GetOrderResponseDto } from "./dto/response/payment";
import PostCommunityRequestDto from "./dto/request/community/post-community.request.dto";
import GetCommunityCommentResponse from "./dto/response/community/get-community-comments.response.dto";
import PostCommunityCommentRequestDto from "./dto/request/community/post-community-comment.request.dto";
import { Board, CommunityCategory, SearchCategory } from "src/types/aliases";
import PatchCommunityPostRequestDto from "./dto/request/community/patch-community-post.request.dto";
import {
  PatchAnswerRequestDto,
  PatchNoticeRequestDto,
  PostNoticeRequestDto,
} from "./dto/request/admin";
import {
  PatchQuestionRequestDto,
  PostQuestionRequestDto,
} from "./dto/request/question";

import { PostWaybillNumberRequestDto } from "./dto/request/user";
import {
  AddLikeKeywordRequestDto,
  DeleteLikeKeywordRequestDto,
  PatchUserAddressRequestDto,
  PatchUserPasswordRequestDto,
  PatchUserIntroductionRequestDto,
  PostProductReviewRequestDto,
  PatchBadgeRequestDto,
} from "./dto/request/user";
import {
  GetNoticeListResponseDto,
  GetNoticeResponseDto,
} from "./dto/response/notice";
import {
  GetQuestionListResponseDto,
  GetQuestionResponseDto,
} from "./dto/response/question";
import PostAlertRequestDto from "./dto/request/alert/post-alert.request.dto";
import GetAlertResponseDto from "./dto/response/alert/get-alert.response.dto";

import {
  PostOrderItemRequestDto,
  PostPaymentCancelRequestDto,
} from "./dto/request/payment";
import { GetProductReviewsResponseDto } from "./dto/response/product";
import {
  PatchCalendarRequestDto,
  PostScheduleRequestDto,
} from "./dto/request/calendar";
import {
  GetAllScheduleResponseDto,
  PostScheduleResponseDto,
} from "./dto/response/calendar";
import { FindIdResponseDto } from "./dto/response/auth/find-id.response.dto";
import PatchCommunityCommentRequestDto from "./dto/request/community/patch-community-comment.request.dto";
import PostReportRequestDto from "./dto/request/report/post-report.request.dto";
import GetReportsResponseDto from "./dto/response/report/get-reports.response.dto";
import GetReportResponseDto from "./dto/response/report/get-report.response.dto";
import PatchReportProcessRequestDto from "./dto/request/report/patch-report-process.request.dto";
import PatchResignRequestDto from "./dto/request/user/patch-resign.request.dto";
import GetAlertedCountResponseDto from "./dto/response/report/get-alerted-count.response.dto";
import { GetReviewImagesResponseDto } from "./dto/response/product";
import GetCommunityCommentsResponse from "./dto/response/community/get-community-comments.response.dto";

import GetMySalesResponseDto from "./dto/response/user/get-my-sales.response.dto";
import GetOrderItemsResponseDto from "./dto/response/user/get-order-items.response.dto";

import { access } from "fs";
import GetBadgeListResponseDto from "./dto/response/user/get-badge-list.responseDto";
import PostHelperRequestDto from "./dto/request/needhelper/post-helper.request.dto";
import GetHelperPostResponseDto from "./dto/response/needhelper/get-helper-post.response.dto";
import PatchHelperPostRequestDto from "./dto/request/needhelper/patch-helper.request.dto";
import PostHelperCommentRequestDto from "./dto/request/needhelper/post-helper-comment.request.dto";
import { GetChatRoomResponseDto } from "./dto/response/chat";
import GetMyHelperPostResponseDto from "./dto/response/needhelper/get-my-helper-post-list.responsedto";

// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const USER_MODULE_URL = `${API_DOMAIN}/api/v1/user`;
const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;

const ID_CHECK_URL = `${AUTH_MODULE_URL}/id-check`;
const SIGN_UP_URL = `${AUTH_MODULE_URL}/sign-up`;
const SEND_VERIFY_CODE_URL = `${AUTH_MODULE_URL}/send-verify-code`;
const VERIFY_CODE_URL = `${AUTH_MODULE_URL}/verify-code`;
const RESIGNED_CHECK_URL = `${AUTH_MODULE_URL}/resigned-check`;
const FIND_ID_URL = `${AUTH_MODULE_URL}/find-id`;
const FIND_PASSWORD_URL = `${AUTH_MODULE_URL}/find-password`;

const PAYMENT_URL = `${API_DOMAIN}/api/v1/payments`;
const SIGN_IN_URL = `${AUTH_MODULE_URL}/sign-in`;
const GET_SIGN_IN_USER_URL = `${USER_MODULE_URL}/sign-in`;
const RESIGN_URL = `${USER_MODULE_URL}/resign`;

// 공동구매 API 경로
const PRODUCT_MODULE_URL = `${API_DOMAIN}/api/v1/product`;
const POST_PRODUCT_URL = `${PRODUCT_MODULE_URL}/write`;
const POST_STOCK_RESERVE_URL = `${PRODUCT_MODULE_URL}/reserve`;

const GET_STOCK_RESERVE_URL = (sequence: number | string) =>
  `${PRODUCT_MODULE_URL}/${sequence}/reserve`;

const PATCH_PRODUCT_QUANTITY_URL = (sequence: number | string) =>
  `${PRODUCT_MODULE_URL}/${sequence}/quantity`;

const GET_PRODUCT_CATEGORY_NAME_URL = (category: Category, name: string) =>
  `${PRODUCT_MODULE_URL}?category=${category}&name=${name}`;
const GET_PRODUCT_DETAIL_URL = (sequence: number | string) =>
  `${PRODUCT_MODULE_URL}/${sequence}`;
const GET_PRODUCT_REVIEWS_URL = (sequence: number | string) =>
  `${PRODUCT_MODULE_URL}/${sequence}/review`;
const GET_PRODUCT_REVIEW_IMAGES_URL = (sequence: number | string) =>
  `${PRODUCT_MODULE_URL}/${sequence}/review-images`;

const DELETE_PRODUCT_URL = (sequence: number | string) =>
  `${PRODUCT_MODULE_URL}/${sequence}`;

// 찜목록 API 경로
const WISHLIST_MODULE_URL = `${API_DOMAIN}/api/v1/wish`;
const POST_WISHLIST_URL = (postSequence: number | string) =>
  `${WISHLIST_MODULE_URL}/${postSequence}`;
const GET_WISHLIST_URL = `${WISHLIST_MODULE_URL}`;
const GET_WISH_URL = (postSequence: number | string) =>
  `${WISHLIST_MODULE_URL}/${postSequence}`;
const DELETE_WISH_URL = (postSequence: number | string) =>
  `${WISHLIST_MODULE_URL}/${postSequence}`;
const GET_COUNT_WISH_URL = `${WISHLIST_MODULE_URL}/count`;

const COMMUNITY_MODULE_URL = `${API_DOMAIN}/api/v1/community`;
const POST_COMMUNITY_URL = `${COMMUNITY_MODULE_URL}/write`;

const FILE_UPLOAD_URL = `${API_DOMAIN}/file/upload`;
const FILE_UPLOADS_URL = `${API_DOMAIN}/file/uploads`;
const multipartFormData = {
  headers: { "Content-Type": "multipart/form-data" },
};

const ALERT_MODULE_URL = `${API_DOMAIN}/api/v1/alert`;
const ALERT_READ_URL = (alertSequence: number | string) => `${ALERT_MODULE_URL}/${alertSequence}`;
const ALERT_READ_ALL_URL = `${ALERT_MODULE_URL}/read-all-alert`;
const ALERT_DELETE_URL = (alertSequence: number | string | null) => `${ALERT_MODULE_URL}/${alertSequence}`;

const GET_COMMUNITY_MODULE_URL = `${COMMUNITY_MODULE_URL}`;
const GET_COMMUNITY_POST_URL = (postSequence: number | string) =>
  `${COMMUNITY_MODULE_URL}/${postSequence}`;
const PATCH_COMMUNITY_POST_URL = (postSequence: number | string) =>
  `${COMMUNITY_MODULE_URL}/${postSequence}`;
const PATCH_COMMUNITY_VIEW_COUNT_URL = (postSequence: number | string) =>
  `${COMMUNITY_MODULE_URL}/${postSequence}/view`;
const DELETE_COMMUNITY_POST_URL = (postSequence: number | string) =>
  `${COMMUNITY_MODULE_URL}/${postSequence}`;

// 장바구니 API 경로
const SHOPPING_CART_MODULE_URL = `${API_DOMAIN}/api/v1/cart`;
const POST_SHOPPING_CART_URL = `${SHOPPING_CART_MODULE_URL}/product`;
const GET_SHOPPING_CART_URL = `${SHOPPING_CART_MODULE_URL}/product`;
const DELETE_SHOPPING_CART_URL = `${SHOPPING_CART_MODULE_URL}/product`;
const GET_COUNT_SHOPPINGCART_URL = `${SHOPPING_CART_MODULE_URL}/count`;

// 결제 API 경로
const POST_ORDER_URL = `${PAYMENT_URL}/`;
const GET_ORDER_URL = `${PAYMENT_URL}/`;
const POST_PAYMENT_CONFIRM_URL = `${PAYMENT_URL}/confirm`;
const POST_ORDER_ITEM_URL = `${PAYMENT_URL}/order-items`;
const POST_PAYMENT_CANCEL_URL = `${PAYMENT_URL}/cancel`;

const GET_COMMUNITY_SEARCH_URL = (
  searchCategory: SearchCategory,
  keyword: string
) => `${COMMUNITY_MODULE_URL}/search?type=${searchCategory}&keyword=${keyword}`;
const POST_COMMUNITY_COMMENT_URL = (postSequence: number | string) =>
  `${COMMUNITY_MODULE_URL}/${postSequence}/comment`;
const PATCH_COMMUNITY_COMMENT_URL = (
  postSequence: number | string,
  commentSequence: number | string
) => `${COMMUNITY_MODULE_URL}/${postSequence}/comment/${commentSequence}`;
const DELETE_COMMUNITY_COMMENT_URL = (
  postSequence: number | string,
  commentSequence: number | string
) => `${COMMUNITY_MODULE_URL}/${postSequence}/comment/${commentSequence}`;
const GET_COMMUNITY_COMMENTS_URL = (postSequence: number | string) =>
  `${COMMUNITY_MODULE_URL}/${postSequence}/comment`;
const GET_COMMUNITY_COMMENT_URL = (
  postSequence: number | string,
  commentSequence: number | string
) => `${COMMUNITY_MODULE_URL}/${postSequence}/comment/${commentSequence}`;
const PUT_COMMUNITY_LIKED_URL = (postSequence: number | string) =>
  `${COMMUNITY_MODULE_URL}/${postSequence}/liked`;
const GET_COMMUNITY_LIKED_URL = (postSequence: number | string) =>
  `${COMMUNITY_MODULE_URL}/${postSequence}/liked`;

// 마이페이지 관련 경로

const MYPAGE_MODULE_URL = `${API_DOMAIN}/api/v1/mypage`;
const MYPAGE_ACTIVITY_URL = `${API_DOMAIN}/api/v1/mypage/activity`;
const OTHER_MYPAGE_MODULE_URL = `${API_DOMAIN}/api/v1/mypage/other`;
const OTHER_MYPAGE_VIEW_URL = (userId: string) =>
  `${OTHER_MYPAGE_MODULE_URL}/${userId}`;
const OTHER_MYPAGE_BADGE_URL = (userId: string) =>
  `${OTHER_MYPAGE_MODULE_URL}/${userId}/badge`;
const OTHER_MYPAGE_COMMUNITY_POST_URL = (userId: string) =>
  `${OTHER_MYPAGE_MODULE_URL}/${userId}/community/post`;
const PATCH_MYPAGE_URL = `${MYPAGE_MODULE_URL}`;
const MYPAGE_ACCOUNT_URL = `${API_DOMAIN}/api/v1/mypage/account`;
const PATCH_MYPAGE_PASSWORD_URL = `${MYPAGE_ACCOUNT_URL}/patch`;
const PATCH_MYPAGE_ADDRESS_URL = `${MYPAGE_ACCOUNT_URL}`;
const MYPAGE_KEYWORD_URL = `${MYPAGE_MODULE_URL}/keyword`;
const ADD_MYPAGE_KEYWORD_URL = `${MYPAGE_KEYWORD_URL}`;
const DELETE_MYPAGE_KEYWORD_URL = `${MYPAGE_KEYWORD_URL}`;
const ADD_BADGE_URL = `${MYPAGE_MODULE_URL}/badge`;
const PATCH_BADGE_URL = `${MYPAGE_MODULE_URL}/badge`;
const GET_BADGE_URL = `${MYPAGE_MODULE_URL}/badge`;

const QUESTION_MODULE_URL = `${API_DOMAIN}/api/v1/mypage/question`;
const POST_QUESTION_URL = `${QUESTION_MODULE_URL}`;
const GET_QUESTION_LIST_URL = `${QUESTION_MODULE_URL}`;
const GET_QUESTION_POST_URL = (questionSequence: number | string) =>
  `${QUESTION_MODULE_URL}/${questionSequence}`;
const PATCH_QUESTION_POST_URL = (questionSequence: number | string) =>
  `${QUESTION_MODULE_URL}/${questionSequence}`;
const PATCH_QUESTION_ANSWER_URL = (questionSequence: number | string) =>
  `${QUESTION_MODULE_URL}/${questionSequence}/answer`;
const DELETE_QUESTION_POST_URL = (questionSequence: number | string) =>
  `${QUESTION_MODULE_URL}/${questionSequence}`;

const NOTICE_MODULE_URL = `${API_DOMAIN}/api/v1/mypage/notice`;
const GET_NOTICE_LIST_URL = `${NOTICE_MODULE_URL}`;
const POST_NOTICE_URL = `${NOTICE_MODULE_URL}`;
const PATCH_NOTICE_URL = (sequence: number | string) =>
  `${NOTICE_MODULE_URL}/${sequence}`;
const DELETE_NOTICE_URL = (sequence: number | string) =>
  `${NOTICE_MODULE_URL}/${sequence}`;
const GET_NOTICE_POST_URL = (sequence: number | string) =>
  `${NOTICE_MODULE_URL}/${sequence}`;
const CALENDAR_MODULE_URL = `${API_DOMAIN}/api/v1/calendar`;
const GET_SCHEDULE_URL = `${CALENDAR_MODULE_URL}`;
const POST_SCHEDULE_URL = `${CALENDAR_MODULE_URL}`;
const PATCH_SCHEDULE_URL = (calendarSequence: number | string) =>
  `${CALENDAR_MODULE_URL}/${calendarSequence}`;
const DELETE_SCHEDULE_URL = (calendarSequence: number | string) =>
  `${CALENDAR_MODULE_URL}/${calendarSequence}`;

const REPORT_MODULE_URL = `${API_DOMAIN}/api/v1/report`;
const GET_PROCESSED_REPORTS_URL = `${REPORT_MODULE_URL}/processed`;
const GET_REPORT_URL = (reportSequence: number | string) =>
  `${REPORT_MODULE_URL}/${reportSequence}`;
const PATCH_REPORT_URL = (reportSequence: number | string) =>
  `${REPORT_MODULE_URL}/${reportSequence}`;
const GET_ALERTED_COUNT_URL = (reportedId: string) =>
  `${REPORT_MODULE_URL}/alerted-count?reported-id=${reportedId}`;

const GET_NICKNAME_MODULE_URL = (userId: string) =>
  `${USER_MODULE_URL}/?nickname=${userId}`;
const GET_IS_ADMIN_MODULE_URL = `${USER_MODULE_URL}/is-admin`;

const BUYING_MODULE_URL = `${API_DOMAIN}/api/v1/mypage`;
const GET_MY_BUYING_URL = `${BUYING_MODULE_URL}/buy/my`;
const GET_MY_SALES_URL = `${BUYING_MODULE_URL}/sales`;
const POST_PRODUCT_REVIEW_URL = `${BUYING_MODULE_URL}/buy/my/review`;
const GET_PRODUCT_ORDER_ITEMS_URL = (sequence: number | string) =>
  `${BUYING_MODULE_URL}/product-sequence?productSequence=${sequence}`;
const POST_WAYBILL_NUMBER_URL = `${BUYING_MODULE_URL}/waybill`;

const GET_MY_COMMUNTY_POST_URL = `${API_DOMAIN}/api/v1/mypage/community/post`;
const GET_MY_COMMUNTY_COMMENT_URL = `${API_DOMAIN}/api/v1/mypage/community/comment`;
const GET_MY_COMMUNTY_LIKED_POST_URL = `${API_DOMAIN}/api/v1/mypage/community/liked`;

const GET_MY_REQUEST_HELPER_POST_URL = `${API_DOMAIN}/api/v1/mypage/need-helper/request`;
const GET_MY_APPLY_HELPER_POST_URL = `${API_DOMAIN}/api/v1/mypage/need-helper/apply`;
const GET_MY_LIKED_HELPER_POST_URL = `${API_DOMAIN}/api/v1/mypage/need-helper/liked`;

// 도우미 관련 경로
const HELPER_MODULE_URL = `${API_DOMAIN}/api/v1/needHelper`;
const MAIN_HELPER_MODULE_URL = `${API_DOMAIN}/api/v1/main/need-helper`;
const POST_HELPER_URL = `${HELPER_MODULE_URL}/write`;
const GET_MAIN_HELPER_MODULE_URL = (userId: string) => `${MAIN_HELPER_MODULE_URL}/{userId}`;
const GET_HELPER_POST_URL = (postSequence: number | string) => `${HELPER_MODULE_URL}/${postSequence}`;
const PATCH_HELPER_POST_URL = (postSequence: number | string) => `${HELPER_MODULE_URL}/${postSequence}`;
const DELETE_HELPER_POST_URL = (postSequence: number | string) => `${HELPER_MODULE_URL}/${postSequence}`;

const POST_HELPER_COMMENT_URL = (postSequence: number | string) =>
  `${HELPER_MODULE_URL}/${postSequence}/comment`;
const DELETE_HELPER_COMMENT_URL = (
  postSequence: number | string,
  commentSequence: number | string
) => `${HELPER_MODULE_URL}/${postSequence}/comment/${commentSequence}`;
const GET_HELPER_COMMENTS_URL = (postSequence: number | string) =>
  `${HELPER_MODULE_URL}/${postSequence}/comment`;
const GET_HELPER_COMMENT_URL = (
  postSequence: number | string,
  commentSequence: number | string
) => `${HELPER_MODULE_URL}/${postSequence}/comment/${commentSequence}`;

const PUT_HELPER_LIKED_URL = (postSequence: number | string) =>
  `${HELPER_MODULE_URL}/${postSequence}/liked`;
const GET_HELPER_LIKED_URL = (postSequence: number | string) =>
  `${HELPER_MODULE_URL}/${postSequence}/liked`;
const POST_HELPER_APPLY_URL = (postSequence: number | string) =>
  `${HELPER_MODULE_URL}/${postSequence}/apply`;
const DELETE_HELPER_APPLY_URL = (postSequence: number | string) =>
  `${HELPER_MODULE_URL}/${postSequence}/apply`;
const GET_HELPER_APPLY_URL = (postSequence: number | string) =>
  `${HELPER_MODULE_URL}/${postSequence}/apply`;
const ACCEPT_HELPER_APPLY_URL = (postSequence: number | string) =>
  `${HELPER_MODULE_URL}/${postSequence}/apply`;

const CHAT_MODULE_URL = `${API_DOMAIN}/api/v1/chat`;
const GET_CHAT_ROOM_URL = (chatSequence: number | string) =>
  `${HELPER_MODULE_URL}/${chatSequence}`;
const ACCEPT_CHAT_URL = (chatSequence: number | string) =>
  `${HELPER_MODULE_URL}/${chatSequence}`;

// function: Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({
  headers: { Authorization: `Bearer ${accessToken}` },
});

// function: response 성공 처리 함수 //
const responseSuccessHandler = <T = ResponseDto>(
  response: AxiosResponse<T>
) => {
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
export const getProductCategoryRequest = async (
  category: Category,
  name: string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(
      GET_PRODUCT_CATEGORY_NAME_URL(category, name),
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler<GetProductResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get product detail API 요청 함수 //
export const getProductDetailRequest = async (
  sequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(GET_PRODUCT_DETAIL_URL(sequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetProductDetailResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get product reviews API 요청 함수 //
export const getProductReviewsRequest = async (sequence: number | string) => {
  const responseBody = await axios
    .get(GET_PRODUCT_REVIEWS_URL(sequence))
    .then(responseSuccessHandler<GetProductReviewsResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get product reviews images API 요청 함수 //
export const getProductReviewImagesRequest = async (
  sequence: number | string
) => {
  const responseBody = await axios
    .get(GET_PRODUCT_REVIEW_IMAGES_URL(sequence))
    .then(responseSuccessHandler<GetReviewImagesResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: id check API 요청 함수 //
export const idCheckRequest = async (requestBody: IdCheckRequestDto) => {
  const responseBody = await axios
    .post(ID_CHECK_URL, requestBody)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: sign up API 요청 함수 //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const responseBody = await axios
    .post(SIGN_UP_URL, requestBody)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: send verify code API 요청 함수 //
export const sendVerifyCodeRequest = async (telNumber: string) => {
  const responseBody = await axios
    .post(SEND_VERIFY_CODE_URL, { telNumber })
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: verify code API 요청 함수 //
export const verifyCodeRequest = async (
  requestBody: VerificationRequestDto
) => {
  const responseBody = await axios
    .post(VERIFY_CODE_URL, requestBody)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch resign API 요청 함수 //
export const patchResignRequest = async (
  requestBody: PatchResignRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .patch(RESIGN_URL, requestBody, bearerAuthorization(accessToken))
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
    console.error("서버에서 반환한 에러:", error.response?.data);

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
  const responseBody = await axios
    .post(SIGN_IN_URL, requestBody)
    .then(responseSuccessHandler<SignInResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get sign in user API 요청 함수 //
export const getSignInUserRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_SIGN_IN_USER_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetSignInUserResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: find id API 요청 함수 //
export const findIdRequest = async (requestBody: FindIdRequestDto) => {
  const responseBody = await axios
    .post(FIND_ID_URL, requestBody)
    .then(responseSuccessHandler<FindIdResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: find Password API 요청 함수 //
export const findPasswordRequest = async (
  requestBody: FindPasswordRequestDto
) => {
  const responseBody = await axios
    .post(FIND_PASSWORD_URL, requestBody)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get product list API 요청 함수 //
export const getProductRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(PRODUCT_MODULE_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetProductDetailResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post product API 요청 함수 //
export const postProductRequest = async (
  requestBody: PostProductRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(POST_PRODUCT_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch product quantity API 요청 함수 //
export const patchProductRequest = async (
  requestBody: PatchProductQuantityRequestDto,
  sequence: number,
  accessToken: string
) => {
  const responseBody = await axios
    .post(
      PATCH_PRODUCT_QUANTITY_URL(sequence),
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: delete product API 요청 함수 //
export const deleteProductRequest = async (
  sequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(DELETE_PRODUCT_URL(sequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: file upload 요청 함수 //
export const fileUploadRequest = async (requestBody: FormData) => {
  const responseBody = await axios
    .post(FILE_UPLOAD_URL, requestBody, multipartFormData)
    .then(responseSuccessHandler<string>)
    .catch((error) => null);
  return responseBody;
};

// function: file uploads 요청 함수 //
export const fileUploadsRequest = async (requestBody: FormData) => {
  const responseBody = await axios
    .post(FILE_UPLOADS_URL, requestBody)
    .then(responseSuccessHandler<string[]>)
    .catch((error) => null);
  return responseBody;
};

// function: post wish API 요청 함수//
export const postWishRequest = async (
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .post(
      POST_WISHLIST_URL(postSequence),
      null,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get wish API 요청 함수//
export const getWishRequest = async (
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(GET_WISH_URL(postSequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetWishResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get wish list API 요청 함수//
export const getWishListRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_WISHLIST_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetWishListResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: delete wish API 요청 함수//
export const deleteWishRequest = async (
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(DELETE_WISH_URL(postSequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};
// function: get community post API 요청 함수 //
export const getCommunityPostRequest = async (
  postSequence: number | string
) => {
  const responseBody = await axios
    .get(GET_COMMUNITY_POST_URL(postSequence))
    .then(responseSuccessHandler<GetCommunityPostResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get community API 요청 함수 //
export const getCommunityRequest = async (boardType:Board | string | null, categoryType: CommunityCategory | string | null, region: string | null, county: string | null) => {
  const responseBody = await axios.get(GET_COMMUNITY_MODULE_URL, { params: { board: boardType, category: categoryType, region: region, county: county}} )
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: post community API 요청 함수 //
export const postCommunityRequest = async (
  requestBody: PostCommunityRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(POST_COMMUNITY_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch community post API 요청 함수 //
export const patchCommunityPostRequest = async (
  postSequence: number | string,
  requestBody: PatchCommunityPostRequestDto,
  accessToken: string
) => {
  const resopnseBody = await axios
    .patch(
      PATCH_COMMUNITY_POST_URL(postSequence),
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return resopnseBody;
};

// function: patch community view count API 요청 함수 //
export const patchCommunityViewCountRequest = async (
  postSequence: number | string
) => {
  const responseBody = await axios
    .patch(PATCH_COMMUNITY_VIEW_COUNT_URL(postSequence))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: delete community post API 요청 함수 //
export const deleteCommunityPostRequest = async (
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(
      DELETE_COMMUNITY_POST_URL(postSequence),
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post shopping cart API 요청 함수 //
export const postShoppingCartRequest = async (
  requestBody: PostShoppingCartRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(POST_SHOPPING_CART_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get shopping cart API 요청 함수 //
export const getShoppingCartRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_SHOPPING_CART_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetShoppingCartResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: delete shopping cart API 요청 함수 //
export const deleteShoppingCartRequest = async (
  shoppingCartSequence: number,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(DELETE_SHOPPING_CART_URL, {
      ...bearerAuthorization(accessToken),
      data: {
        shoppingCartSequence: shoppingCartSequence,
      },
    })
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post order API 요청 함수 //
export const postOrderRequest = async (
  requestBody: PostOrderRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(POST_ORDER_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post order items API 요청 함수 //
export const postOrderItemsRequest = async (
  requestBody: PostOrderItemRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(POST_ORDER_ITEM_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post stock reserve API 요청 함수 //
export const postReserveRequest = async (
  requestBody: PostStockReservationRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(POST_STOCK_RESERVE_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get count shopping cart API 요청 함수 //
export const getCountShoppingCartRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_COUNT_SHOPPINGCART_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get count wish API 요청 함수 //
export const getCountWishRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_COUNT_WISH_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get stock API 요청 함수 //
export const getReserveRequest = async (sequence: number | string) => {
  const responseBody = await axios
    .get(GET_STOCK_RESERVE_URL(sequence))
    .then(responseSuccessHandler<GetOrderResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get order API 요청 함수 //
export const getOrderRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_ORDER_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetOrderResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post payment confirm API 요청 함수 //
export const postPaymentConfirmRequest = async (
  requestBody: PostPaymentConfirmRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(
      POST_PAYMENT_CONFIRM_URL,
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);

  return responseBody;
};

// function: post payment cancel API 요청 함수 //
export const postPaymentCancelRequest = async (
  requestBody: PostPaymentCancelRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(
      POST_PAYMENT_CANCEL_URL,
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get community search API 요청 함수 //
export const getCommunitySearchRequest = async (
  searchCategory: SearchCategory,
  keyword: string
) => {
  const responseBody = await axios
    .get(GET_COMMUNITY_SEARCH_URL(searchCategory, keyword))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post community comment API 요청 함수 //
export const postCommunityCommentRequest = async (
  requestBody: PostCommunityCommentRequestDto,
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .post(
      POST_COMMUNITY_COMMENT_URL(postSequence),
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch community comment API 요청 함수 //
export const patchCommunityCommentRequest = async (
  requestBody: PatchCommunityCommentRequestDto,
  postSequence: number | string,
  commentSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .patch(
      PATCH_COMMUNITY_COMMENT_URL(postSequence, commentSequence),
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseSuccessHandler);
  return responseBody;
};

// function: delete community comment API 요청 함수 //
export const deleteCommunityCommentRequest = async (
  postSequence: number | string,
  commentSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(
      DELETE_COMMUNITY_COMMENT_URL(postSequence, commentSequence),
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get community comment API 요청 함수 //
export const getCommunityCommentRequest = async (
  postSequence: number | string,
  commentSequence: number | string
) => {
  const responseBody = await axios
    .get(GET_COMMUNITY_COMMENT_URL(postSequence, commentSequence))
    .then(responseSuccessHandler<GetCommunityCommentResponse>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get community comments API 요청 함수 //
export const getCommunityCommentsRequest = async (
  postSequence: number | string
) => {
  const responseBody = await axios
    .get(GET_COMMUNITY_COMMENTS_URL(postSequence))
    .then(responseSuccessHandler<GetCommunityCommentResponse>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: put community liked API 요청 함수 //
export const putCommunityLikedRequest = async (
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .put(
      PUT_COMMUNITY_LIKED_URL(postSequence),
      {},
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get community liked API 요청 함수 //
export const getCommunityLikedRequest = async (
  postSequence: number | string
) => {
  const responseBody = await axios
    .get(GET_COMMUNITY_LIKED_URL(postSequence))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post notice API 요청 함수 //
export const postNoticeRequest = async (
  requestBody: PostNoticeRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(POST_NOTICE_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get notice list API 요청 함수 //
export const getNoticeListRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_NOTICE_LIST_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetNoticeListResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get notice API 요청 함수 //
export const getNoticeRequest = async (
  sequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(GET_NOTICE_POST_URL(sequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetNoticeResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch notice API 요청 함수 //
export const patchNoticeRequest = async (
  requestBody: PatchNoticeRequestDto,
  sequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .patch(
      PATCH_NOTICE_URL(sequence),
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: delete notice API 요청 함수 //
export const deleteNoticeRequest = async (
  sequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(DELETE_NOTICE_URL(sequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get question list API 요청 함수 //
export const getQuestionListRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_QUESTION_LIST_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetQuestionListResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get question post API 요청 함수 //
export const getQuestionRequest = async (
  questionSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(
      GET_QUESTION_POST_URL(questionSequence),
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler<GetQuestionResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post question API 요청 함수 //
export const postQuestionRequest = async (
  requestBody: PostQuestionRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(POST_QUESTION_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch question API 요청 함수 //
export const patchQuestionRequest = async (
  questionSequence: number | string,
  requestBody: PatchQuestionRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .patch(
      PATCH_QUESTION_POST_URL(questionSequence),
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch question answer API 요청 함수 //
export const patchAnswerRequest = async (
  questionSequence: number | string,
  requestBody: PatchAnswerRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .patch(
      PATCH_QUESTION_ANSWER_URL(questionSequence),
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: delete question API 요청 함수 //
export const deleteQuestionRequest = async (
  questionSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(
      DELETE_QUESTION_POST_URL(questionSequence),
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: add like keyword API 요청 함수 //
export const addLikeKeywordRequest = async (
  requestBody: AddLikeKeywordRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(ADD_MYPAGE_KEYWORD_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get like keyword API 요청 함수 //
export const getLikeKeywordListRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(MYPAGE_KEYWORD_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetLikeKeywordListResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: delete like keyword API 요청 함수 //
export const deleteLikeKeywordRequest = async (
  requestBody: DeleteLikeKeywordRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(DELETE_MYPAGE_KEYWORD_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: requestBody,
    })
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get user introductrion API 요청 함수 //
export const getUserIntroductionRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(MYPAGE_MODULE_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetUserIntroductionResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch user introduction API 요청 함수 //
export const patchUserIntroductionRequest = async (
  requestBody: PatchUserIntroductionRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .patch(PATCH_MYPAGE_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch user password API 요청 함수 //
export const patchUserPasswordRequest = async (
  requestBody: PatchUserPasswordRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .patch(
      PATCH_MYPAGE_PASSWORD_URL,
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch user address API 요청 함수 //
export const patchUserAddressRequest = async (
  requestBody: PatchUserAddressRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .patch(
      PATCH_MYPAGE_ADDRESS_URL,
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get user account API 요청 함수 //
export const getUserAccountRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(MYPAGE_ACCOUNT_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetUserAccountResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get my community post API 요청 함수 //
export const getMyCommunityPostRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_MY_COMMUNTY_POST_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetCommunityResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get my community comment API 요청 함수 //
export const getMyCommunityCommentRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_MY_COMMUNTY_COMMENT_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetCommunityCommentsResponse>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get my community liked post API 요청 함수 //
export const getMyCommunityLikedPostComment = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_MY_COMMUNTY_LIKED_POST_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetCommunityResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get my request helperPost post API 요청 함수 //
export const getMyHelperRequestPostRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_MY_REQUEST_HELPER_POST_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetMyHelperPostResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get my apply helper Post post API 요청 함수 //
export const getMyHelperApplyPostRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_MY_APPLY_HELPER_POST_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetMyHelperPostResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// // function: get my community post API 요청 함수 //
// export const getMyCommunityPostRequest = async (accessToken: string) => {
//   const responseBody = await axios
//     .get(GET_MY_COMMUNTY_POST_URL, bearerAuthorization(accessToken))
//     .then(responseSuccessHandler<GetCommunityResponseDto>)
//     .catch(responseErrorHandler);
//   return responseBody;
// };

// function: post alert API 요청 함수 //
export const postAlertRequest = async (
  requestBody: PostAlertRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(ALERT_MODULE_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get alert API 요청 함수 //
export const getAlertRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(ALERT_MODULE_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetAlertResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post Schedule API 요청 함수 //
export const postScheduleRequest = async (
  requestBody: PostScheduleRequestDto,
  accessToken: string
): Promise<PostScheduleResponseDto | ResponseDto | null> => {
  const responseBody = await axios
    .post(POST_SCHEDULE_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<PostScheduleResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get Schedule API 요청 함수 //
export const getAllScheduleRequest = async (
  accessToken: string
): Promise<GetAllScheduleResponseDto | ResponseDto | null> => {
  const responseBody = await axios
    .get(GET_SCHEDULE_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetAllScheduleResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch Schedule API 요청 함수 //
export const patchScheduleRequest = async (
  calendarSequence: number,
  requestBody: PatchCalendarRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .patch(
      PATCH_SCHEDULE_URL(calendarSequence),
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post product review API 요청 함수 //
export const postProductReviewRequest = async (
  requestBody: PostProductReviewRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(
      POST_PRODUCT_REVIEW_URL,
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: delete schedule API 요청 함수 //
export const deleteScheduleRequest = async (
  calendarSequence: number,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(
      DELETE_SCHEDULE_URL(calendarSequence),
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch alert read API 요청 함수 //
export const patchAlertReadRequest = async (alertSequence: number | string, accessToken: string) => {
  const responseBody = await axios.patch(ALERT_READ_URL(alertSequence), {}, bearerAuthorization(accessToken))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: patch all alert read API 요청 함수 //
export const patchAllAlertReadRequest = async (accessToken: string) => {
  const responseBody = await axios.patch(ALERT_READ_ALL_URL, {}, bearerAuthorization(accessToken))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
};


// function: delete alert API 요청 함수 //
export const deleteAlertRequest = async (
  alertSequence: number | string | null,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(ALERT_DELETE_URL(alertSequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post report API 요청 함수 //
export const postReportRequest = async (
  requestBody: PostReportRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(REPORT_MODULE_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get reports API 요청 함수 //
export const getReportsRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(REPORT_MODULE_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetReportsResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get processed reports API 요청 함수 //
export const getProcessedReportsRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_PROCESSED_REPORTS_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetReportResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get report API 요청 함수 //
export const getReportRequest = async (
  reportSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(GET_REPORT_URL(reportSequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetReportResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: patch report process API 요청 함수 //
export const patchReportProcessRequest = async (
  requestBody: PatchReportProcessRequestDto,
  reportSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .patch(
      PATCH_REPORT_URL(reportSequence),
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get alerted count API 요청 함수 //
export const getAlertedCountRequest = async (
  reportedId: string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(GET_ALERTED_COUNT_URL(reportedId), bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetAlertedCountResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get user nickname API 요청 함수 //
export const getUserNicknameRequest = async (
  reportedId: string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(GET_NICKNAME_MODULE_URL(reportedId), bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get is admin API 요청 함수 //
export const getIsAdminRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_IS_ADMIN_MODULE_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get my buying API 요청 함수 //
export const getMyBuyingRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_MY_BUYING_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetMyBuyingResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get my sales API 요청 함수 //
export const getMySalesRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(GET_MY_SALES_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetMySalesResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get order items APi 요청 함수 //
export const getProductOrderItemsRequest = async (
  sequence: number | string
) => {
  const responseBody = await axios
    .get(GET_PRODUCT_ORDER_ITEMS_URL(sequence))
    .then(responseSuccessHandler<GetOrderItemsResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
}

// function: add badge API 요청 함수 //
export const addBadgeRequest = async (accessToken: string) => {
  const reseponseBody = await axios
    .post(ADD_BADGE_URL, {}, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return reseponseBody;
};

// function: get badge list API 요청 함수 //
export const getBadgeListRequest = async (accessToken: string) => {
  const reseponseBody = await axios
    .get(GET_BADGE_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetBadgeListResponseDto>)
    .catch(responseErrorHandler);
  return reseponseBody;
};

// function: choose badge API 요청 함수 //
export const chooseBadgeRequest = async (
  requestBody: PatchBadgeRequestDto,
  accessToken: string
) => {
  const reseponseBody = await axios
    .patch(PATCH_BADGE_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return reseponseBody;
};

// function: get other user  badge API 요청 함수 //
export const getOtherUserBadgeRequest = async (userId: string) => {
  const reseponseBody = await axios
    .get(OTHER_MYPAGE_BADGE_URL(userId))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return reseponseBody;
};

// function: get other user introductrion API 요청 함수 //
export const getOtherUserIntroductionRequest = async (userId: string) => {
  const responseBody = await axios
    .get(OTHER_MYPAGE_VIEW_URL(userId))
    .then(responseSuccessHandler<GetUserIntroductionResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};
// function: post Helper API 요청 함수 //
export const postHelperRequest = async (
  requestBody: PostHelperRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(POST_HELPER_URL, requestBody, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get Helper list API 요청 함수 //
export const getHelperPostListRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(HELPER_MODULE_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get Helper list to main API 요청 함수 //
export const getHelperPostMainRequest = async () => {
  const responseBody = await axios.get(MAIN_HELPER_MODULE_URL)
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: get Helper post API 요청 함수 //
export const getHelperPostRequest = async (
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(GET_HELPER_POST_URL(postSequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get Helper match list to main API 요청 함수 //
export const getMatchPostMainRequest = async (userId: string) => {
  const responseBody = await axios.get(GET_MAIN_HELPER_MODULE_URL(userId))
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: patch Helper post API 요청 함수
export const patchHelperPostRequest = async (
  requestBody: PatchHelperPostRequestDto,
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .patch(
      PATCH_HELPER_POST_URL(postSequence),
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: delete Helper post API 요청 함수
export const deleteHelperPostRequest = async (
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(
      DELETE_HELPER_POST_URL(postSequence),
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  console.log("accessToken", accessToken);
  return responseBody;
};

// function: post Helper comment API 요청 함수
export const postHelperCommentRequest = async (
  requestBody: PostHelperCommentRequestDto,
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .post(
      POST_HELPER_COMMENT_URL(postSequence),
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: delete Helper comment API 요청 함수
export const deleteHelperCommentRequest = async (
  postSequence: number | string,
  commentSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(
      DELETE_HELPER_COMMENT_URL(postSequence, commentSequence),
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get Helper comment list API 요청 함수
export const getHelperCommentsRequest = async (
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(
      GET_HELPER_COMMENTS_URL(postSequence),
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get Helper comment API 요청 함수
export const getHelperCommentRequest = async (
  postSequence: number | string,
  commentSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(
      GET_HELPER_COMMENT_URL(postSequence, commentSequence),
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: 좋아요 토글
export const putHelperLikedRequest = async (
  postSequence: number | string,
  liked: boolean,
  accessToken: string
) => {
  const responseBody = await axios
    .put(
      PUT_HELPER_LIKED_URL(postSequence),
      { liked },
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get other user community post API 요청 함수 //
export const getOtherUserCommunityPostRequest = async (userId: string) => {
  const responseBody = await axios
    .get(OTHER_MYPAGE_COMMUNITY_POST_URL(userId))
    .then(responseSuccessHandler<GetCommunityResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post waybill number APi 요청 함수 //
export const postWaybillNumberRequest = async (
  requestBody: PostWaybillNumberRequestDto,
  accessToken: string
) => {
  const responseBody = await axios
    .post(
      POST_WAYBILL_NUMBER_URL,
      requestBody,
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get my activity count API 요청 함수 //
export const getMyActivityCountRequest = async (accessToken: string) => {
  const responseBody = await axios
    .get(MYPAGE_ACTIVITY_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetMyActivityCountResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get helper liked API 요청 함수 //
export const getHelperLikedRequest = async (
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(GET_HELPER_LIKED_URL(postSequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: post helper apply API 요청 함수 //
export const postHelperApplyRequest = async (
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .post(
      POST_HELPER_APPLY_URL(postSequence),
      {},
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  console.log("responseBody: ", responseBody);
  return responseBody;
};

// function: delete helper apply API 요청 함수 //
export const deleteHelperApplyRequest = async (
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .delete(
      DELETE_HELPER_APPLY_URL(postSequence),
      bearerAuthorization(accessToken)
    )
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: get helper apply API 요청 함수 //
export const getHelperApplyRequest = async (
  postSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(GET_HELPER_APPLY_URL(postSequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: 요청용 config를 만드는 함수 //
export const authorizedParams = (accessToken: string, params: any = {}) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  params: params,
});

// function: accept apply API 요청 함수 //
export const accpetHelperApplyRequest = async (
  postSequence: number | string,
  applicantId: string,
  accessToken: string
) => {
  const responseBody = await axios
  .patch(
    ACCEPT_HELPER_APPLY_URL(postSequence),
    null,
    authorizedParams(accessToken, { applicantId })
  )
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
};

// function: get chat room API 요청 함수 //
export const getChatRoomRequest = async (
  chatSequence: number | string,
  accessToken: string
) => {
  const responseBody = await axios
    .get(GET_CHAT_ROOM_URL(chatSequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetChatRoomResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: accept chat API 요청 함수 //
export const accpetChatRequest = async (
  chatSequence: number | string,
  applicantId: string,
  accessToken: string
) => {
  const responseBody = await axios
  .patch(
    ACCEPT_CHAT_URL(chatSequence),
    null,
    authorizedParams(accessToken, { applicantId })
  )
  .then(responseSuccessHandler)
  .catch(responseErrorHandler);
  return responseBody;
};

