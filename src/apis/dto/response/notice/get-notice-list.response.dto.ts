import { Notice } from "src/types/interfaces";
import ResponseDto from "../response.dto";

export default interface GetNoticeListResponseDto extends ResponseDto{
  notices: Notice[];
}