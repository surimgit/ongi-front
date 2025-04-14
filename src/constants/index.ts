// variable: 상대 path 상수 //
export const ROOT_PATH = '/';
export const COMMUNITY_PATH = 'community';
export const COMMUNITY_VIEW_PATH = ':postSequence';

// variable: 절대 path 상수 //
export const ROOT_ABSOLUTE_PATH = ROOT_PATH;

export const COMMUNITY_ABSOLUTE_PATH = `${ROOT_PATH}${COMMUNITY_PATH}`;
export const COMMUNITY_VIEW_ABSOLUTE_PATH = (postSequence: number | string) => `${ROOT_PATH}${COMMUNITY_PATH}/${postSequence}`;

// variable: access Token 속성명 //
export const ACCESS_TOKEN = 'accessToken';