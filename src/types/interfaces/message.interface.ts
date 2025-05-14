export default interface Message {
    chatSequence:number;
    messageSequence: number;
    senderId: string;
    content: string;
    chatDate: Date;
    fileUrl: string;
    isHelper: boolean;
}