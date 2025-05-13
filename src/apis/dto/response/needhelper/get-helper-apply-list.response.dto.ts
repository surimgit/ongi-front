import { HelperApplyList } from "src/types/interfaces";
import ResponseDto from "../response.dto";

export default interface GetHelperApplyListResponseDto extends ResponseDto{
  applies: HelperApplyList[];
}