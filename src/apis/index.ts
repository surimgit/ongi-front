import axios, { AxiosError, AxiosResponse } from 'axios';
import { ResponseDto } from './dto/response';
import { SignInRequestDto } from './dto/request/auth';
import { SignInResponseDto } from './dto/response/auth';
import { GetSignInUserResponseDto } from './dto/response/user';

// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const AUTH_MODULE_URL = `${API_DOMAIN}/api/v1/auth`;

const SIGN_IN_URL = `${AUTH_MODULE_URL}/sign-in`;

const USER_MODULE_URL = `${API_DOMAIN}/api/v1/user`;

const GET_SIGN_IN_USER_URL = `${USER_MODULE_URL}/sign-in`;


// function: Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } })

// function: response 성공 처리 함수 //
const responseSuccessHandler = <T = ResponseDto>(response: AxiosResponse<T>) => {
  // response.data: Response Body
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
};