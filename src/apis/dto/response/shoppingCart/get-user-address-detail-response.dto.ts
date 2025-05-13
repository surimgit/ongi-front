import ResponseDto from "../response.dto";

export default interface GetUserAddressDetailResponseDto extends ResponseDto {
  addressLabel: string;
  recipientName: string;
  phone: string;
  zipcode: string;
  address: string;
  detailAddress: string;
}