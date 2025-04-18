export default interface Alert {
    senderId: string;
    receiverId: string;
    alertType: string;
    alertEntitySequence: BigInteger;
    alertContent: string;
}