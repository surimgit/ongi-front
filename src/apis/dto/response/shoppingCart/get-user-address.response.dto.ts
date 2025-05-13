import { UserAddress } from "src/types/interfaces";
import ResponseDto from "../response.dto";

export default interface GetUserAddressResponseDto extends ResponseDto{
  addressLabelList: UserAddress[];
}