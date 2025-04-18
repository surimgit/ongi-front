import { ResponseDto } from 'src/apis/dto/response';

export default interface GetSignInUserResponseDto extends ResponseDto {
  userId: string;
  name: string;
  nickname: string;
  profileImage: string | null;
  address: string;
  detailAddress: string | null;
  gender: string | null;
  age: number | null;
}