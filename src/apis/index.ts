import axios, { AxiosError, AxiosResponse } from 'axios';
import ResponseDto from "./dto/response/response.dto";
import { PostProductRequestDto } from './dto/request/product';

// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const PRODUCT_MODULE_URL = `${API_DOMAIN}/api/v1/product`
const POST_PRODUCT_URL = `${PRODUCT_MODULE_URL}/write`;


const FAKE_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJxd2VyMTIzNCIsImlhdCI6MTc0NDM0MjIyMiwiZXhwIjoxNzQ0Mzc0NjIyfQ.gppCuwhZrBbgmAtshkT6nMSaEHUEdbp8gRObuxUGJSs";


// function: Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } });

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

// function: write product API 요청 함수 //
export const postProductRequest = async (requestBody: PostProductRequestDto) => {
  const responseBody = await axios.post(POST_PRODUCT_URL, requestBody,{
    headers: {
      Authorization: `Bearer ${FAKE_TOKEN}`,
    }
  })
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
  return responseBody;
}