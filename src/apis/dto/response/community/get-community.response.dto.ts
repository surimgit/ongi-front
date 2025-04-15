import { CommunityPost } from "src/types/interfaces";
import ResponseDto from "../response.dto";

// interface: get community response body DTO //
export default interface GetCommunityResponseDto extends ResponseDto {
    posts: CommunityPost[];
}