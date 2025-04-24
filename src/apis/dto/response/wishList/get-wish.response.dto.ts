import { Wish } from "src/types/interfaces";
import ResponseDto from "../response.dto";

export default interface GetWishResponseDto extends ResponseDto {
  wish: Wish;
}