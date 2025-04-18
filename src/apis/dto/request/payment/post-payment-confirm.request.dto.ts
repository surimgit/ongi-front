export default interface PostPaymentConfirmRequestDto {
  paymentKey: string | null,
  orderId: string | null,
  amount: string | null
}