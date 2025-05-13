import { MyNeedHelperPost } from "src/types/interfaces";
import ResponseDto from "../response.dto";

export default interface GetMyHelperPostResponseDto extends ResponseDto {
  posts: MyNeedHelperPost[];
}