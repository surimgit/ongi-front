import { ResponseDto } from "../../response";

export default interface PostUserAddressRequestDto{
  recipientName: string;
  addressLabel: string;
  phone: string;
  zipcode: string;
  address: string;
  detailAddress?: string;
  addressType: string;
}