import { Product } from "src/types/interfaces";
import { ResponseDto } from "src/apis/dto/response";

// interface: get product response body DTO //
export default interface GetProductResponseDto extends ResponseDto {
  products: Product[];
  filterType: 'category' | 'name' | 'categoryAndName' | 'all';
}