import { MyBuying } from "src/types/interfaces";
import ResponseDto from "../response.dto";

export default interface GetMyBuyingResponseDto extends ResponseDto {
  myBuying: MyBuying[];
}