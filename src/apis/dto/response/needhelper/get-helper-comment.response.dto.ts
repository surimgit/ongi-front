import ResponseDto from "../response.dto";

// interface: get helper comment response body DTO //
export default interface GetHelperCommentResponse extends ResponseDto {
    userId: string;
    nickname: string;
    postSequence: string;
    content: string;
}