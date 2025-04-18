import { Product } from "src/types/interfaces";
import ResponseDto from "./response.dto";

// interface: get product response body DTO //
export default interface GetProductResponseDto extends ResponseDto {
  products: Product[];
}