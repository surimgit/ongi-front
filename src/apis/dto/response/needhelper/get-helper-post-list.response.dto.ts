import NeedHelperPost from "src/types/interfaces/need-helper-post.interface";
import ResponseDto from "../response.dto";

// interface: get community response body DTO //
export default interface GetHelperPostListResponseDto extends ResponseDto {
    posts: NeedHelperPost[];
}