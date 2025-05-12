import ResponseDto from "../response.dto";

export default interface GetBadgeResponseDto extends ResponseDto {
  userId: string;
  badge: string;
  isSelected: boolean;
}