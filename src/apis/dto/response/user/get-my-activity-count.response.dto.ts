import ResponseDto from "../response.dto";

export default interface GetMyActivityCountResponseDto extends ResponseDto {
  communityCommentCount: number;
  communityPostCount: number;
  reviewCount: number;
  reviewedCount: number;
  shoppingCartCount: number;
  wishListCount: number;
}