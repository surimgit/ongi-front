import { ResponseDto } from 'src/apis/dto/response';

export default interface SignInResponseDto extends ResponseDto {
  accessToken: string;
  expiration: number;
}