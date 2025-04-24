import ResponseDto from "src/apis/dto/response/response.dto";

// interface: response message 인터페이스 //
interface ResponseMessage {
  isSuccess: boolean;
  message: string;
}

// function: response message 처리 함수 //
export function responseMessage(responseBody: ResponseDto | null) {
  
  const message =
    !responseBody ? '서버에 문제가 있습니다.' :
    responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
    responseBody.code === 'AF' ? '인증에 실패했습니다.' :
    responseBody.code === 'VF' ? '입력이 잘못되었습니다.' :
    responseBody.code === 'SF' ? '로그인에 실패했습니다.' :
    responseBody.code === 'EU' ? '인증에 실패했습니다.' :
    responseBody.code === 'ND' ? '존재하지 않는 일기입니다.' :
    responseBody.code === 'NEP' ? '존재하지 않는 상품입니다.' :
    responseBody.code === 'NP' ? '권한이 없습니다.' : '';

  const isSuccess = responseBody !== null && responseBody.code === 'SU';

  return { isSuccess, message };
}