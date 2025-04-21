// interface: patch user introduction request body DTO //

import { Gender, Mbti } from "src/types/aliases";

export default interface PatchUserIntroductionRequestDto {
  nickname: string;
  birth: string;
  gender: Gender;
  mbti: Mbti;
  job: string;
  selfIntro: string;
}