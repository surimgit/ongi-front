import { OrderItems } from "src/types/interfaces";
import ResponseDto from "../response.dto";

export default interface GetOrderItemsResponseDto extends ResponseDto {
  orderItems: OrderItems[];
}