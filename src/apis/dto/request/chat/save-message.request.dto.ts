
// interface: save message request body DTO //
export default interface SaveMessageRequestDto {
    chatSequence: number;
    senderId: string;
    content: string;
    fileUrl: string;
}