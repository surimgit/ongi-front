import { CommunityComment } from "src/types/interfaces";
import ResponseDto from "../response.dto";

// interface: get helper comment response body DTO //
export default interface GetHelperCommentsResponse extends ResponseDto {
    comments: CommunityComment[];
}