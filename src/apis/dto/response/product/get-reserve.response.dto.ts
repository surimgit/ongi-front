import { StockReservation } from "src/types/interfaces";
import ResponseDto from "../response.dto";

export default interface GetReserveResponseDto extends ResponseDto {
  quantity: number;
}