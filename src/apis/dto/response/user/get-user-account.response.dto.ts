import { ResponseDto } from 'src/apis/dto/response';

export default interface GetUserAccountResponseDto extends ResponseDto {
  userId: string;
  userPassword: string;
  telNumber: string;
  address: string;
  detailAddress: string;
}