import ResponseDto from "../response.dto";

// interface: get community post response body DTO //
export default interface GetCommunityPostResponseDto extends ResponseDto {
    postSequence: number;
    userId: string;
    nickname: string;
    postDate: string;
    category: string;
    title: string;
    content: string;
    liked: number;
    viewCount: number;
}