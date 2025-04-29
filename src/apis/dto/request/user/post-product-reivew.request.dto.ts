export default interface PostProductReviewRequestDto {
  orderItemSequence: number;
  productSequence: number;
  rating: number;
  content: string;
  reviewImages: string[] | null;
}