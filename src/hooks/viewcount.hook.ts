import { ResponseDto } from "src/apis/dto/response";

// function: patch community view count response 처리 함수 //
const patchCommunityViewCountResponse = (responseBody: ResponseDto | null) => {
    const message = 
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'NPS' ? '존재하지 않는 게시물입니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
        alert(message);
        return;
    }
};

export default patchCommunityViewCountResponse;