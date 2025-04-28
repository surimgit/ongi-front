import { Wish } from "src/types/interfaces";
import ResponseDto from "../response.dto";
import WishList from "src/types/interfaces/wish-list.interface";

export default interface GetWishListResponseDto extends ResponseDto {
  wishListEntities: WishList[];
}