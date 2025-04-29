export default interface Alert {
    alertSequence: number;
    senderId: string;
    receiverId: string;
    alertType: string;
    alertEntitySequence: number;
    alertContent: string;
    readPara: boolean;
}