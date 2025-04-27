export default interface PostProductReviewRequestDto {
  productSequence: number;
  rating: number;
  content: string;
  reviewImages: string[] | null;
}