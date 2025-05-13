import { Board, CommunityCategory, SearchCategory } from "src/types/aliases";
import County from "src/types/aliases/community-county.alias";

// variable: 상대 path 변수 //
export const ROOT_PATH = '/';
export const AUTH_PATH = 'auth';
export const MAIN_PATH = 'main';
export const PRODUCT_PATH = 'product';
export const SHOPPING_CART_PATH = 'shopping-cart';
export const PAYMENTS_PATH = 'payments'
export const ADDRESS_PATH = 'address';
export const WRITE_PATH = 'write';
export const PRODUCT_VIEW_PATH = ':productNumber';
export const CALENDAR_PATH = 'calendar';
export const POLICY_PATH = 'policy-view';

export const AUTH_FIND_ID_PATH = 'find-id';
export const AUTH_FIND_PASSWORD_PATH = 'find-password';
export const AUTH_FIND_USER_RESULT_PATH = 'find-result';

export const COMMUNITY_PATH = 'community';
export const COMMUNITY_POST_PATH = 'post';
export const COMMUNITY_WRITE_PATH = 'write';
export const COMMUNITY_VIEW_PATH = ':postSequence';
export const COMMUNITY_EDIT_PATH = 'edit';
export const COMMUNITY_HOTBOARD_PATH = 'hot';
export const COMMUNITY_INFOBOARD_PATH = 'info';
export const COMMUNITY_COUNTYBOARD_PATH = 'county';
export const COMMUNITY_SEARCH_PATH = 'search';

export const MYPAGE_PATH = 'mypage';
export const MYPAGE_PATCH_PATH = 'patch';
export const MYPAGE_KEYWORD_PATH = 'keyword';
export const MYPAGE_KEYWORD_PATCH_PATH = 'patch';
export const MYPAGE_ACCOUNT_PATH = 'account';
export const MYPAGE_ACCOUNT_PATCH_PATH = 'patch';

export const EVENT_PATH = 'event';

export const MY_GROUPBUYING_PATH = 'group-buying';
export const MY_GROUPBUYING_WISH_LIST_PATH = 'wish-list';
export const MY_GROUPBUYING_BUY_PATH = 'buy';
export const MY_GROUPBUYING_SELL_PATH = 'sell';

export const MY_REVIEW_PATH = 'review';

export const MY_ACTIVITY_PATH = 'activity';

export const MY_NEEDHELLPER_PATH = 'need-helper';
export const MY_NEEDHELLPER_ASK_PATH = 'ask';
export const MY_NEEDHELLPER_APPLY_PATH = 'apply';
export const MY_NEEDHELLPER_LIKED_PATH = 'liked';

export const MY_COMMUNITY_PATH = 'community';
export const MY_COMMUNITY_POST_PATH = 'post';
export const MY_COMMUNITY_COMMENT_PATH = 'comment';
export const MY_COMMUNITY_LIKED_PATH = 'liked';

export const OTHER_MYPAGE_PATH = 'other';
export const OTHER_MYPAGE_VIEW_PATH = ':userId';

export const QUESTION_PATH = 'question';
export const QUESTION_WRTIE_PATH = 'write';
export const QUESTION_PATCH_PATH = 'patch';
export const QUESTION_VIEW_PATH = ':questionSequence';
export const QUESTION_ANSWER_PATH = 'answer';

export const NOTICE_PATH = 'notice';
export const NOTICE_WRITE_PATH = 'write';
export const NOTICE_PATCH_PATH = 'patch';
export const NOTICE_VIEW_PATH = ':sequence';

export const FAQ_PATH = 'faq';

export const NEEDHELPER_PATH = 'needHelper';
export const NEEDHELPER_WRITE_PATH = 'write';
export const NEEDHELPER_VIEW_PATH = ':sequence';

export const REPORT_PATH = 'report';

// variable: 절대 path 상수 //
export const ROOT_ABSOLUTE_PATH = `${ROOT_PATH}`;
export const AUTH_ABSOLUTE_PATH = `${ROOT_PATH}${AUTH_PATH}`;
export const MAIN_ABSOLUTE_PATH = `${ROOT_PATH}${MAIN_PATH}`;

export const AUTH_FIND_ID_ABSOLUTE_PATH = `${ROOT_PATH}${AUTH_PATH}/${AUTH_FIND_ID_PATH}`;
export const AUTH_FIND_PASSWORD_ABSOLUTE_PATH = `${ROOT_PATH}${AUTH_PATH}/${AUTH_FIND_PASSWORD_PATH}`;
export const AUTH_FIND_USER_RESULT_ABSOLUTE_PATH = `${ROOT_PATH}${AUTH_PATH}/${AUTH_FIND_USER_RESULT_PATH}`;

export const PRODUCT_ABSOLUTE_PATH = `${ROOT_PATH}${PRODUCT_PATH}`;
export const PRODUCT_WRITE_PATH = `${ROOT_PATH}${PRODUCT_PATH}/${WRITE_PATH}`;
export const PRODUCT_VIEW_ABSOLUTE_PATH = (sequence: number) => `${ROOT_PATH}${PRODUCT_PATH}/${sequence}`;

export const SHOPPING_CART_ABSOLUTE_PATH = `${ROOT_PATH}${SHOPPING_CART_PATH}`;
export const SHOPPING_CART_ADDRESS_ABSOLUTE_PATH = `${ROOT_PATH}${SHOPPING_CART_PATH}/${ADDRESS_PATH}`;

export const PAYMENTS_ABSOLUTE_PATH = `${ROOT_PATH}${PAYMENTS_PATH}`;

export const COMMUNITY_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}`;
export const COMMUNITY_OVERALL_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}?board=${'전체 글'}`;
export const COMMUNITY_PAGE_ABSOLUTE_URL = (boardType: Board, page: number) => `${ROOT_PATH}${COMMUNITY_PATH}?board=${boardType}&page=${page}`;
export const COMMUNITY_BOARD_ABSOLUTE_PATH = (boardType: Board) => `${ROOT_PATH}${COMMUNITY_PATH}?board=${boardType}`;
export const COMMUNITY_CATEGORY_ABSOLUTE_PATH = (boardType: Board, category: CommunityCategory) => `${ROOT_PATH}${COMMUNITY_PATH}?board=${boardType}&category=${category}`;
export const COMMUNITY_POST_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_POST_PATH}`;
export const COMMUNITY_WRITE_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_WRITE_PATH}`;
export const COMMUNITY_VIEW_ABSOLUTE_PATH = (postSequence: number | string) => `${ROOT_PATH}${COMMUNITY_PATH}/${postSequence}`;
export const COMMUNITY_EDIT_ABSOLUTE_PATH = (postSequence: number | string) => `${ROOT_PATH}${COMMUNITY_PATH}/${postSequence}/${COMMUNITY_EDIT_PATH}`;
export const COMMUNITY_SEARCH_ABSOLUTE_PATH = (searchCategory: SearchCategory, keyword: string) => `${ROOT_PATH}${COMMUNITY_PATH}/search?type=${searchCategory}&keyword=${keyword}`;

export const COMMUNITY_INFOBOARD_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_INFOBOARD_PATH}`;
export const COMMUNITY_HOTBOARD_ABSOLUTE_PATH = (boardType: Board) => `${ROOT_PATH}${COMMUNITY_PATH}?board=${boardType}`;
export const COMMUNITY_COUNTYBOARD_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_COUNTYBOARD_PATH}`;

export const COUNTY_MAIN_ABSOLUTE_PATH = (boardType: Board) => `${ROOT_PATH}${COMMUNITY_PATH}?board=${boardType}}`;
export const COUNTY_ABSOLUTE_PATH = (boardType: Board, region: string, county: string | undefined) => `${ROOT_PATH}${COMMUNITY_PATH}?board=${boardType}&region=${region}&county=${county}`;
export const COUNTY_CATEGORY_ABSOLUTE_PATH = (boardType: Board, categoryType: CommunityCategory, region: string, county: string | undefined) => `${ROOT_PATH}${COMMUNITY_PATH}?board=${boardType}&region=${region}&county=${county}`;

export const MYPAGE_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}`;
export const MYPAGE_PATCH_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MYPAGE_PATCH_PATH}`;
export const MYPAGE_ACCOUNT_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MYPAGE_ACCOUNT_PATH}`;
export const MYPAGE_ACCOUNT_PATCH_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MYPAGE_ACCOUNT_PATH}/${MYPAGE_ACCOUNT_PATCH_PATH}`;
export const MYPAGE_KEYWORD_ABSOULUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MYPAGE_KEYWORD_PATH}`;
export const MYPAGE_KEYWORD_PATCH_ABSOULUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MYPAGE_KEYWORD_PATH}/${MYPAGE_KEYWORD_PATCH_PATH}`;

export const OTHER_MYPAGE_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${OTHER_MYPAGE_PATH}`;
export const OTHER_MYPAGE_VIEW_ABSOULTE_PATH = (userId : string) => `${ROOT_PATH}${MYPAGE_PATH}/${OTHER_MYPAGE_PATH}/${userId}`;

export const EVENT_ABSOLURE_PATH = `${ROOT_PATH}${EVENT_PATH}`;

export const QUESTION_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${QUESTION_PATH}`;
export const QUESTION_WRTIE_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${QUESTION_PATH}/${QUESTION_WRTIE_PATH}`;
export const QUESTION_PATCH_ABSOLUTE_PATH =  (questionSequence: number | string) => `${ROOT_PATH}${MYPAGE_PATH}/${QUESTION_PATH}/${questionSequence}/${QUESTION_PATCH_PATH}`;
export const QUESTION_VIEW_ABSOLUTE_PATH = (questionSequence: number | string) => `${ROOT_PATH}${MYPAGE_PATH}/${QUESTION_PATH}/${questionSequence}`;
export const QUESTION_ANSWER_ABSOLUTE_PATH = (questionSequence: number | string) => `${ROOT_PATH}${MYPAGE_PATH}/${QUESTION_PATH}/${questionSequence}`;

export const NOTICE_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${NOTICE_PATH}`;
export const NOTICE_WRITE_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${NOTICE_PATH}/${NOTICE_WRITE_PATH}`;
export const NOTICE_PATCH_ABSOLUTE_PATH = (sequence: number | string) => `${ROOT_PATH}${MYPAGE_PATH}/${NOTICE_PATH}/${sequence}/${NOTICE_PATCH_PATH}`;
export const NOTICE_VIEW_ABSOLUTE_PATH = (sequence: number | string) =>  `${ROOT_PATH}${MYPAGE_PATH}/${NOTICE_PATH}/${sequence}`;

export const FAQ_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${FAQ_PATH}`;

export const MY_REVIEW_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MY_REVIEW_PATH}`;

export const MY_ACTIVITY_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MY_ACTIVITY_PATH}`;

export const MY_NEEDHELLPER_ASK_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MY_NEEDHELLPER_PATH}/${MY_NEEDHELLPER_ASK_PATH}`;
export const MY_NEEDHELLPER_APPLY_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MY_NEEDHELLPER_PATH}/${MY_NEEDHELLPER_APPLY_PATH}`;
export const MY_NEEDHELLPER_LIKED_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MY_NEEDHELLPER_PATH}/${MY_NEEDHELLPER_LIKED_PATH}`;

export const MY_COMMUNITY_POST_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MY_COMMUNITY_PATH}/${MY_COMMUNITY_POST_PATH}`;
export const MY_COMMUNITY_COMMENT_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MY_COMMUNITY_PATH}/${MY_COMMUNITY_COMMENT_PATH}`;
export const MY_COMMUNITY_LIKED_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MY_COMMUNITY_PATH}/${MY_COMMUNITY_LIKED_PATH}`;

export const MY_GROUPBUYING_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MY_GROUPBUYING_PATH}`;
export const MY_GROUPBUYING_WISH_LIST_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MY_GROUPBUYING_PATH}/${MY_GROUPBUYING_WISH_LIST_PATH}`;
export const MY_GROUPBUYING_BUY_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MY_GROUPBUYING_PATH}/${MY_GROUPBUYING_BUY_PATH}`;
export const MY_GROUPBUYING_SELL_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MY_GROUPBUYING_PATH}/${MY_GROUPBUYING_SELL_PATH}`;

export const NEEDHELPER_ABSOLUTE_PATH = `${ROOT_PATH}${NEEDHELPER_PATH}`;
export const NEEDHELPER_WRITE_ABSOLUTE_PATH = `${ROOT_PATH}${NEEDHELPER_PATH}/${NEEDHELPER_WRITE_PATH}`;
export const NEEDHELPER_VIEW_ABSOLUTE_PATH = (postSequence: number | string) => `${ROOT_PATH}${NEEDHELPER_PATH}/${postSequence}`;

export const CALENDAR_ABSOLUTE_PATH = `${ROOT_PATH}${CALENDAR_PATH}`;
export const POLICY_ABSOLUTE_PATH = (plcyNo: string, plcyNm: string, keyword?: string, regions?: string, categories?: string, page?: string, section?: string) => {
    const queryString = buildQueryString({ plcyNo, plcyNm: plcyNm, keyword, regions, categories, page, section }); return `/${POLICY_PATH}?${queryString}`;};

export const REPORT_ABSOLUTE_PATH = `${ROOT_PATH}${REPORT_PATH}`;

// variable: access token 속성명 //
export const ACCESS_TOKEN = 'accessToken';

// function: policy absolute path 쿼리 함수 //
export const buildQueryString = (params: Record<string, string | undefined>) => {
    const query = new URLSearchParams();
    for (const key in params) {
        const value = params[key];
        if (value) query.append(key, value);
    }
    return query.toString();
};