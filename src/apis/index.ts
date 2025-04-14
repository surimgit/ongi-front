import axios, { AxiosError, AxiosResponse } from 'axios';
import { ResponseDto } from './dto/response';
import { COMMUNITY_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { GetCommunityPostResponseDto } from './dto/response/community';

// variable: URL 상수 //
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const COMMUNITY_MODULE_URL = `${API_DOMAIN}/api/v1/community`;

const GET_COMMUNITY_MODULE_URL = `${COMMUNITY_MODULE_URL}`;
const GET_COMMUNITY_POST_URL = (postSequence: number | string) => `${COMMUNITY_MODULE_URL}/${postSequence}`;

// function: Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` }})

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
}

// function: get community post API 요청 함수 //
export const getCommunityPostRequest = async (postSequence:number | string, accessToken: string) => {
    const responseBody = await axios.get(GET_COMMUNITY_POST_URL(postSequence), bearerAuthorization(accessToken))
    .then(responseSuccessHandler<GetCommunityPostResponseDto>)
    .catch(responseErrorHandler);
    return responseBody;
}

// function: get community API 요청 함수 //
export const getCommunityRequest = async (accessToken: string) => {
    const responseBody = await axios.get(GET_COMMUNITY_MODULE_URL, bearerAuthorization(accessToken))
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
    return responseBody;
}