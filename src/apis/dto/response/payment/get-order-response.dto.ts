import ResponseDto from "../response.dto";

export default interface GetOrderResponseDto extends ResponseDto{
  orderId: string,
  amount: number,
  phoneNumber: string,
  userName: string,
  buyerAddress: string;
}