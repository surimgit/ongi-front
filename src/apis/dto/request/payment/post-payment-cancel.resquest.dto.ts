export default interface PostPaymentCancelRequestDto {
  paymentKey: string;
  cancelReason: string;
  cancelAmount: number;
  productSequence: number;
  orderItemSequence: number;
}