export default interface Chat {
    chatSequence: number;
    requesterId: string;
    applicantId: string;
    needHelperSequence: number;
    chatAvailable: boolean;
}