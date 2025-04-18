import ShoppingCart from "src/types/interfaces/shopping-cart.interface";
import ResponseDto from "../response.dto";

export default interface GetShoppingCartResponseDto extends ResponseDto {
  shoppingCarts: ShoppingCart[];
}