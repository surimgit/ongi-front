import { ResponseDto } from 'src/apis/dto/response';

export default interface GetUserAccountResponseDto extends ResponseDto {
  userId: string;
  telNumber: string;
  address: string;
  detailAddress: string;
}