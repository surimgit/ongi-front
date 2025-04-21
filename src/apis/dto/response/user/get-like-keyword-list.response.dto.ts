import { ResponseDto } from 'src/apis/dto/response';
import { LikeKeyword } from 'src/types/interfaces';

export default interface GetLikeKeywordListResponseDto extends ResponseDto {
  likeKeywords: LikeKeyword[];
}
