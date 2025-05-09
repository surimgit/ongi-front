export default interface MyBuying {
  paymentKey: string;
  orderItemSequence: number;
  productSequence: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  approvedTime: string;
  waybillNumber: string;
  deliveryAddressSnapshot: string;
  userId: string;
}