import ResponseDto from "../response.dto";

// interface: get helper comment response body DTO //
export default interface GetUserRankDto extends ResponseDto {
    userId: string;
    nickname: string;
    totalActivity: number;
}