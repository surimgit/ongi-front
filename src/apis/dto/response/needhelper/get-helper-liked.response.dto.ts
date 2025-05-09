import ResponseDto from "../response.dto";

// interface: get Helper liked response body DTO //
export default interface GetHelperLikedResponseDto extends ResponseDto {
    likes: string[];
}