import { Wish } from "src/types/interfaces";
import ResponseDto from "../response.dto";

export default interface GetWishListResponseDto extends ResponseDto {
  wish: Wish[];
}