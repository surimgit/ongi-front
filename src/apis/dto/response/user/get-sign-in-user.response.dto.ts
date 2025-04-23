import { ResponseDto } from 'src/apis/dto/response';

export default interface GetSignInUserResponseDto extends ResponseDto {
  userId: string;
  nickname: string;
  admin: boolean;
  profileImage: string | null;
}