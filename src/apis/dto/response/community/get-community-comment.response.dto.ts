import { CommunityComment } from "src/types/interfaces";
import ResponseDto from "../response.dto";

// interface: get community comment response body DTO //
export default interface GetCommunityCommentResponse extends ResponseDto {
    comments: CommunityComment[];
}