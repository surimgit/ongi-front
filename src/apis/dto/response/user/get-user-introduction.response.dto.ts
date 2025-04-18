import { ResponseDto } from 'src/apis/dto/response';
import { LikeKeyword } from 'src/types/interfaces';

export default interface GetUserIntroductionResponseDto extends ResponseDto {
  nickname: string;
  birth: string;
  gender: string;
  profileImage: string;
  mbti: string;
  job: string;
  selfIntro: string;
  likeKeywords: LikeKeyword[];
}
