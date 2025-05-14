import ResponseDto from "../response.dto";

export default interface GetMyActivityCountResponseDto extends ResponseDto {
  communityCommentCount: number;
  communityPostCount: number;
  applyCount: number;
  acceptCount: number;
  shoppingCartCount: number;
  wishListCount: number;
}