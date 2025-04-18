import ResponseDto from "../response.dto";

// interface: get community liked response body DTO //
export default interface GetCommunityLikedResponseDto extends ResponseDto {
    likes: string[];
}