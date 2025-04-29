import ResponseDto from "../response.dto";

// interface: get user nickname response body DTO //
export default interface GetUserNicknameResponseDto extends ResponseDto {
    nickname: string;
}