import { ProductReviewImages } from "src/types/interfaces";
import ResponseDto from "../response.dto";

export default interface GetReviewImagesResponseDto extends ResponseDto {
  reviewImages: ProductReviewImages[];
}