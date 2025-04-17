import { Category } from "src/types/aliases";
import { ResponseDto } from "src/apis/dto/response";

// interface: get product detail response body DTO //
export default interface GetProductDetailResponseDto extends ResponseDto {
  sequence: number | string;
  image: string;
  name: string;
  userId: string;
  price: number;
  category: Category;
  productQuantity: number;
  boughtAmount: number;
  purchasedPeople: number;
  deadline: string;
  isSoldOut: boolean;
  content: string;
  openDate: string;
}