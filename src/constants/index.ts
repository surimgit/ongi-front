import { Board, CommunityCategory, SearchCategory } from "src/types/aliases";

// variable: 상대 path 변수 //
export const ROOT_PATH = '/';
export const AUTH_PATH = 'auth';
export const PRODUCT_PATH = 'product';
export const WRITE_PATH = 'write';
export const PRODUCT_VIEW_PATH = ':productNumber';

export const COMMUNITY_PATH = 'community';
export const COMMUNITY_POST_PATH = 'post';
export const COMMUNITY_WRITE_PATH = 'write';
export const COMMUNITY_VIEW_PATH = ':postSequence';
export const COMMUNITY_EDIT_PATH = 'edit';
export const COMMUNITY_HOTBOARD_PATH = 'hot';
export const COMMUNITY_INFOBOARD_PATH = 'info';
export const COMMUNITY_COUNTYBOARD_PATH = 'county';

// variable: 절대 path 상수 //
export const ROOT_ABSOLUTE_PATH = ROOT_PATH;
export const AUTH_ABSOLUTE_PATH = `${ROOT_PATH}${AUTH_PATH}`;

export const PRODUCT_ABSOLUTE_PATH = `${ROOT_PATH}${PRODUCT_PATH}`;
export const PRODUCT_WRITE_PATH = `${ROOT_PATH}${PRODUCT_PATH}/${WRITE_PATH}`;
export const PRODUCT_VIEW_ABSOLUTE_PATH = (sequence: number) => `${ROOT_PATH}${PRODUCT_PATH}/${sequence}`;

export const COMMUNITY_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}`;
export const COMMUNITY_OVERALL_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}?board=${'전체 글'}`;
export const COMMUNITY_BOARD_ABSOLUTE_PATH = (boardType: Board) => `${ROOT_PATH}${COMMUNITY_PATH}?board=${boardType}`;
export const COMMUNITY_CATEGORY_ABSOLUTE_PATH = (boardType: Board, category: CommunityCategory) => `${ROOT_PATH}${COMMUNITY_PATH}?board=${boardType}&category=${category}`;
export const COMMUNITY_POST_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_POST_PATH}`;
export const COMMUNITY_WRITE_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_WRITE_PATH}`;
export const COMMUNITY_VIEW_ABSOLUTE_PATH = (postSequence: number | string) => `${ROOT_PATH}${COMMUNITY_PATH}/${postSequence}`;
export const COMMUNITY_EDIT_ABSOLUTE_PATH = (postSequence: number | string) => `${ROOT_PATH}${COMMUNITY_PATH}/${postSequence}/${COMMUNITY_EDIT_PATH}`;
export const COMMUNITY_SEARCH_ABSOLUTE_PATH = (searchCategory: SearchCategory, keyword: string) => `${ROOT_PATH}${COMMUNITY_PATH}/search?type=${searchCategory}&keyword=${keyword}`;

export const COMMUNITY_INFOBOARD_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_INFOBOARD_PATH}`;
export const COMMUNITY_HOTBOARD_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_HOTBOARD_PATH}`;
export const COMMUNITY_COUNTYBOARD_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}/${COMMUNITY_COUNTYBOARD_PATH}`;


// variable: access token 속성명 //
export const ACCESS_TOKEN = 'accessToken';