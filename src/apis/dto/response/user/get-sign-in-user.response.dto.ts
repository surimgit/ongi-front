import { ResponseDto } from 'src/apis/dto/response';

export default interface GetSignInUserResponseDto extends ResponseDto {
  userId: string;
  nickname: string;
  profileImage: string | null;
}