import React, { useEffect, useState } from "react";
import "./style.css";
import MypageSidebar from "src/layouts/MypageSidebar";
import { useNavigate } from "react-router";

import {
  getCountShoppingCartRequest,
  getCountWishRequest,
  getShoppingCartRequest,
  getWishListRequest,
} from "src/apis";
import { useCookies } from "react-cookie";
import { GetShoppingCartResponseDto } from "src/apis/dto/response/shoppingCart";
import { GetWishListResponseDto, ResponseDto } from "src/apis/dto/response";
import { responseMessage } from "src/utils";
import {
  ACCESS_TOKEN,
  MY_COMMUNITY_COMMENT_ABSOLUTE_PATH,
  MY_COMMUNITY_POST_ABSOLUTE_PATH,
  MY_GROUPBUYING_WISH_LIST_ABSOLUTE_PATH,
  MY_NEEDHELLPER_APPLY_ABSOLUTE_PATH,
  MY_NEEDHELLPER_ASK_ABSOLUTE_PATH,
  MY_REVIEW_ABSOLUTE_PATH,
  MYPAGE_ABSOLUTE_PATH,
  SHOPPING_CART_ABSOLUTE_PATH,
} from "src/constants";
import { getMyActivityCountRequest } from "src/apis";
import { GetMyActivityCountResponseDto } from "src/apis/dto/response/user";

export default function Activity() {
  // state: cookie 상태 //
  const [cookies] = useCookies();
  // state: 장바구니 개수 상태 //
  const [shoppingCartLen, setShoppingCartLen] = useState<number>(0);
  // state: 찜목록 개수 상태 //
  const [wishLen, setWishLen] = useState<number>(0);

  // state: my activity count 상태 //
  const [communityCommentCount, setCommunityCommentCount] = useState<
    number | string
  >("0");
  const [communityPostCount, setcommunityPostCount] = useState<number | string>(
    "0"
  );
  const [reviewCount, setReviewCount] = useState<number | string>("0");
  const [reviewedCount, setReviewedCount] = useState<number | string>("0");

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get shopping cart response 처리 함수 //
  const getShoppingCartResponse = (
    responseBody: GetShoppingCartResponseDto | ResponseDto | null
  ) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if (!isSuccess) {
      alert(message);
      return;
    }
  };

  // function: get my activity count response 처리 함수 //
  const getMyActivityCountResponse = (
    responseBody: GetMyActivityCountResponseDto | ResponseDto | null
  ) => {
    const message = !responseBody
      ? "서버에 문제가 있습니다."
      : responseBody.code === "DBE"
      ? "서버에 문제가 있습니다."
      : responseBody.code === "AF"
      ? "인증에 실패했습니다."
      : "";

    const isSuccess = responseBody !== null && responseBody.code === "SU";
    if (!isSuccess) {
      alert(message);
      return;
    }

    const {
      communityCommentCount,
      communityPostCount,
      reviewCount,
      reviewedCount,
      shoppingCartCount,
      wishListCount,
    } = responseBody as GetMyActivityCountResponseDto;
    setCommunityCommentCount(communityCommentCount);
    setcommunityPostCount(communityPostCount);
    setReviewCount(reviewCount);
    setReviewedCount(reviewedCount);
    setShoppingCartLen(shoppingCartCount);
    setWishLen(wishListCount);
  };

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if (!accessToken) return;
    getMyActivityCountRequest(accessToken).then(getMyActivityCountResponse);
  }, []);

  // event handler: 내가 쓴 도우미 후기 클릭 이벤트 처리 //
  const onReviewClickHandler = () => {
    navigator(MY_REVIEW_ABSOLUTE_PATH);
  };

  // event handler: 받은 도우미 후기 클릭 이벤트 처리 //
  const onReviewedClickHandler = () => {
    navigator(MY_REVIEW_ABSOLUTE_PATH);
  };

  // event handler: 장바구니 클릭 이벤트 처리 //
  const onShoppingCartClickHandler = () => {
    navigator(SHOPPING_CART_ABSOLUTE_PATH);
  };

  // event handler: wish list 클릭 이벤트 처리 //
  const onWishListClickHandler = () => {
    navigator(MY_GROUPBUYING_WISH_LIST_ABSOLUTE_PATH);
  };

  // event handler: 내가 쓴 글 클릭 이벤트 처리 //
  const onCommunityPostClickHandler = () => {
    navigator(MY_COMMUNITY_POST_ABSOLUTE_PATH);
  };

  // event handler: 내가 쓴 댓글 클릭 이벤트 처리 //
  const onCommunityCommnetClickHandler = () => {
    navigator(MY_COMMUNITY_COMMENT_ABSOLUTE_PATH);
  };

  // function: get response 처리 함수 //
  const getWishListResponse = (
    responseBody: GetWishListResponseDto | ResponseDto | null
  ) => {
    const { isSuccess, message } = responseMessage(responseBody);

    if (!isSuccess) {
      alert(message);
      return;
    }
  };

  // event handler: 내 정보 버튼 클릭 이벤트 처리 //
  const onMyInfoButtonClickHandler = () => {
    navigator(MYPAGE_ABSOLUTE_PATH);
  };

  useEffect(() => {
    getCountShoppingCartRequest(accessToken).then((length: number) => {
      setShoppingCartLen(length);
    });
    getCountWishRequest(accessToken).then((length: number) => {
      setWishLen(length);
    });
    getShoppingCartRequest(accessToken).then(getShoppingCartResponse);
    getWishListRequest(accessToken).then(getWishListResponse);
  }, []);

  return (
    <div id="my-activity-main-wrapper">
      <MypageSidebar />
      <div className="contents-wrapper">
        <div className="title-area">
          <div className="title">마이페이지</div>
          <div className="current" onClick={onMyInfoButtonClickHandler}>
            내 정보
          </div>
          <div className="current active">내 활동</div>
        </div>
        <div className="body">
          <div className="my-container">
            <div className="title">내가 받은 후기</div>
            <div className="category-container">
              <div className="category-box">
                <div className="category">• 도우미 후기</div>
                <div className="category-number" onClick={onReviewClickHandler}>
                  {reviewCount}개
                </div>
              </div>
              <div className="category-box">
                <div className="category">• 도움 받은 후기</div>
                <div
                  className="category-number"
                  onClick={onReviewedClickHandler}
                >
                  {reviewedCount}개
                </div>
              </div>
            </div>
          </div>
          <div className="my-container">
            <div className="title">내 공동구매</div>
            <div className="category-container">
              <div className="category-box">
                <div className="category">• 장바구니 상품</div>

                <div className='category-number' onClick={onShoppingCartClickHandler}>{shoppingCartLen}개</div>
              </div>
              <div className='category-box'>
                <div className='category'>• 찜한 상품 수</div>
                <div className='category-number' onClick={onWishListClickHandler}>{wishLen}개</div>
              </div>
            </div>
          </div>
          <div className="my-container">
            <div className="title">내 커뮤니티</div>
            <div className="category-container">
              <div className="category-box">
                <div className="category">• 내가 쓴 게시글</div>
                <div
                  className="category-number"
                  onClick={onCommunityPostClickHandler}
                >
                  {communityPostCount}개
                </div>
              </div>
              <div className="category-box">
                <div className="category">• 내 댓글</div>
                <div
                  className="category-number"
                  onClick={onCommunityCommnetClickHandler}
                >
                  {communityCommentCount}개
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
