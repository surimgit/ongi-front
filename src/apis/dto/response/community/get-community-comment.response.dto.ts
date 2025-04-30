import ResponseDto from "../response.dto";

// interface: get community comment response body DTO //
export default interface GetCommunityCommentResponse extends ResponseDto {
    userId: string;
    nickname: string;
    postSequence: string;
    content: string;
}