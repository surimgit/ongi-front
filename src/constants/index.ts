import { Board, CommunityCategory, SearchCategory } from "src/types/aliases";

// variable: 상대 path 변수 //
export const ROOT_PATH = '/';
export const AUTH_PATH = 'auth';
export const MAIN_PATH = 'main';
export const PRODUCT_PATH = 'product';
export const SHOPPING_CART_PATH = 'shoppingCart';
export const PAYMENTS_PATH = 'payments'
export const ADDRESS_PATH = 'address';
export const WRITE_PATH = 'write';
export const PRODUCT_VIEW_PATH = ':sequence';

export const COMMUNITY_PATH = 'community';
export const COMMUNITY_POST_PATH = 'post';
export const COMMUNITY_WRITE_PATH = 'write';
export const COMMUNITY_VIEW_PATH = ':postSequence';
export const COMMUNITY_EDIT_PATH = 'edit';
export const COMMUNITY_HOTBOARD_PATH = 'hot';
export const COMMUNITY_INFOBOARD_PATH = 'info';
export const COMMUNITY_COUNTYBOARD_PATH = 'county';

export const MYPAGE_PATH = 'mypage';
export const MYPAGE_UPDATE_PATH = 'update';
export const MYPAGE_KEYWORD_PATH = 'keyword';
export const MYPAGE_KEYWORD_UPDATE_PATH = 'update';
export const MYPAGE_ACCOUNT_PATH = 'account';
export const MYPAGE_ACCOUNT_UPDATE_PATH = 'update';

export const OTHER_MYPAGE_PATH = `${MYPAGE_PATH}/other`;
export const OTHER_MYPAGE_VIEW_PATH = ':userId';

export const QUESTION_PATH = 'question';
export const QUESTION_WRTIE_PATH = 'write';
export const QUESTION_VIEW_PATH = ':questionSequence';
export const QUESTION_ANSWER_PATH = 'answer';

export const NOTICE_PATH = 'notice';
export const NOTICE_WRITE_PATH = 'notice';
export const NOTICE_VIEW_PATH = 'sequence';

export const NEEDHELPER_PATH = 'needHelper';

export const REPORT_PATH = 'report';

// variable: 절대 path 상수 //
export const ROOT_ABSOLUTE_PATH = ROOT_PATH;
export const AUTH_ABSOLUTE_PATH = `${ROOT_PATH}${AUTH_PATH}`;
export const MAIN_ABSOLUTE_PATH = `${ROOT_PATH}${MAIN_PATH}`;

export const PRODUCT_ABSOLUTE_PATH = `${ROOT_PATH}${PRODUCT_PATH}`;
export const PRODUCT_WRITE_PATH = `${ROOT_PATH}${PRODUCT_PATH}/${WRITE_PATH}`;
export const PRODUCT_VIEW_ABSOLUTE_PATH = (sequence: number) => `${ROOT_PATH}${PRODUCT_PATH}/${sequence}`;

export const SHOPPING_CART_ABSOLUTE_PATH = `${ROOT_PATH}${SHOPPING_CART_PATH}`;
export const SHOPPING_CART_ADDRESS_ABSOLUTE_PATH = `${ROOT_PATH}${SHOPPING_CART_PATH}/${ADDRESS_PATH}`;

export const PAYMENTS_ABSOLUTE_PATH = `${ROOT_PATH}${PAYMENTS_PATH}`;

export const COMMUNITY_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}`;
export const COMMUNITY_OVERALL_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}?board=${'전체 글'}`;
export const COMMUNITY_PAGE_ABSOLUTE_URL = (boardType: Board, page: number) => `${COMMUNITY_BOARD_ABSOLUTE_PATH(boardType)}&page=${page}`;
export const COMMUNITY_BOARD_ABSOLUTE_PATH = (boardType: Board) => `${ROOT_PATH}${COMMUNITY_PATH}?board=${boardType}`;
export const COMMUNITY_CATEGORY_ABSOLUTE_PATH = (boardType: Board, category: CommunityCategory) => `${COMMUNITY_BOARD_ABSOLUTE_PATH(boardType)}&category=${category}`;
export const COMMUNITY_POST_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_POST_PATH}`;
export const COMMUNITY_WRITE_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_WRITE_PATH}`;
export const COMMUNITY_VIEW_ABSOLUTE_PATH = (postSequence: number | string) => `${ROOT_PATH}${COMMUNITY_PATH}/${postSequence}`;
export const COMMUNITY_EDIT_ABSOLUTE_PATH = (postSequence: number | string) => `${ROOT_PATH}${COMMUNITY_PATH}/${postSequence}/${COMMUNITY_EDIT_PATH}`;
export const COMMUNITY_SEARCH_ABSOLUTE_PATH = (searchCategory: SearchCategory, keyword: string) => `${ROOT_PATH}${COMMUNITY_PATH}/search?type=${searchCategory}&keyword=${keyword}`;

export const COMMUNITY_INFOBOARD_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_INFOBOARD_PATH}`;
export const COMMUNITY_HOTBOARD_ABSOLUTE_PATH = (boardType: Board) => `${ROOT_PATH}${COMMUNITY_PATH}?board=${boardType}`;
export const COMMUNITY_COUNTYBOARD_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_COUNTYBOARD_PATH}`;

export const MYPAGE_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}`;
export const MYPAGE_PATCH_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MYPAGE_UPDATE_PATH}`;
export const MYPAGE_ACCOUNT_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MYPAGE_ACCOUNT_PATH}`;
export const MYPAGE_ACCOUNT_PATCH_ABSOLUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MYPAGE_ACCOUNT_PATH}/${MYPAGE_ACCOUNT_UPDATE_PATH}`;
export const MYPAGE_KEYWORD_ABSOULUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MYPAGE_KEYWORD_PATH}`;
export const MYPAGE_KEYWORD_PATCH_ABSOULUTE_PATH = `${ROOT_PATH}${MYPAGE_PATH}/${MYPAGE_KEYWORD_PATH}/${MYPAGE_KEYWORD_UPDATE_PATH}`;

export const OTHER_MYPAGE_ABSOLUTE_PATH = `${ROOT_PATH}/${OTHER_MYPAGE_PATH}`;
export const OTHER_MYPAGE_VIEW_ABSOULTE_PATH = (userId : string) => `${ROOT_PATH}/${OTHER_MYPAGE_PATH}/${userId}`;

export const QUESTION_ABSOLUTE_PATH = `${ROOT_PATH}${QUESTION_PATH}`;
export const QUESTION_WRTIE_ABSOLUTE_PATH = `${ROOT_PATH}${QUESTION_PATH}/${QUESTION_WRTIE_PATH}`;
export const QUESTION_VIEW_ABSOLUTE_PATH = (questionSequence: number | string) => `${ROOT_PATH}${QUESTION_PATH}/${questionSequence}`;
export const QUESTION_ANSWER_ABSOLUTE_PATH = (questionSequence: number | string) => `${ROOT_PATH}${QUESTION_PATH}/${questionSequence}/${QUESTION_ANSWER_PATH}`;

export const NOTICE_ABSOLUTE_PATH = `${ROOT_PATH}${NOTICE_PATH}`;
export const NOTICE_WRITE_ABSOLUTE_PATH = `${ROOT_PATH}${NOTICE_PATH}/${NOTICE_WRITE_PATH}`;
export const NOTICE_VIEW_ABSOLUTE_PATH = (sequence: number | string) =>  `${ROOT_PATH}${NOTICE_PATH}`;

export const NEEDHELPER_ABSOLUTE_PATH = `${ROOT_PATH}${NEEDHELPER_PATH}`;

export const REPORT_ABSOLUTE_PATH = `${ROOT_PATH}${REPORT_PATH}`;

// variable: access token 속성명 //
export const ACCESS_TOKEN = 'accessToken';
