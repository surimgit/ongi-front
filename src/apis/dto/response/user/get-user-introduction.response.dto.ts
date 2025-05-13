import { ResponseDto } from 'src/apis/dto/response';
import { Gender, Mbti } from 'src/types/aliases';
import { LikeKeyword } from 'src/types/interfaces';

export default interface GetUserIntroductionResponseDto extends ResponseDto {
  nickname: string;
  birth: string;
  gender: Gender;
  profileImage: string;
  mbti: Mbti;
  job: string;
  selfIntro: string;
  likeKeywords: LikeKeyword[];
  userPoint: number;
}
