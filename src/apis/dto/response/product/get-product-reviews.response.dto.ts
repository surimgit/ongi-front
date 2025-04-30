import { ProductReviews } from "src/types/interfaces";
import ResponseDto from "../response.dto";

export default interface GetProductReviewsResponseDto extends ResponseDto {
  productReviews: ProductReviews[]
}