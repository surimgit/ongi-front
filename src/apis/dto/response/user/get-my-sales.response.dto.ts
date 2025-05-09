import { MySale } from "src/types/interfaces";
import ResponseDto from "../response.dto";

export default interface GetMySalesResponseDto extends ResponseDto {
  mySales: MySale[];
}