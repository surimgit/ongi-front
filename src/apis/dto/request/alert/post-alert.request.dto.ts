// interface: post alert request body DTO //
export default interface PostAlertRequestDto {
    alertType: string;
    senderId: string;
    receiverId: string;
    alertEntitySequence: number;
}