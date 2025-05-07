import { ResponseDto } from 'src/apis/dto/response';
import PolicyView from 'src/types/interfaces/policy-view.interface';

export interface GetPolicyViewResponseDto extends ResponseDto {
  policies: PolicyView[];
}
