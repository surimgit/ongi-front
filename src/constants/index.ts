// variable: 상대 path 변수 //
export const ROOT_PATH = '/';
export const PRODUCT_PATH = 'product';
export const WRITE_PATH = 'write';
export const PRODUCT_VIEW_PATH = ':sequence';

// variable: 절대 path 상수 //
export const ROOT_ABSOLUTE_PATH = ROOT_PATH;
export const PRODUCT_ABSOLUTE_PATH = `${ROOT_PATH}${PRODUCT_PATH}`
export const PRODUCT_WRITE_PATH = `${ROOT_PATH}${PRODUCT_PATH}/${WRITE_PATH}`
export const PRODUCT_VIEW_ABSOLUTE_PATH = (sequence: number) => `${ROOT_PATH}${PRODUCT_PATH}/${sequence}`

// variable: access token 속성명 //
export const ACCESS_TOKEN = 'accessToken';