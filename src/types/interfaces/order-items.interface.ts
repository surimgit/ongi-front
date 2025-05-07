export default interface OrderItems {
  orderItemSequence: number;
  productSequence: number;
  quantity: number;
  waybillNumber: string;
  deliveryAddressSnapshot: string;
  approvedTime: string;
}