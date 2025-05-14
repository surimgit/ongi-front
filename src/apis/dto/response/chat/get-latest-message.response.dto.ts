import ResponseDto from "../response.dto";
import { Message } from "src/types/interfaces";

export default interface GetLatestMessageResponseDto {
    chatSequence: number;
    messageSequence: number;
    content: string;
    chatDate: string;
    fileUrl: string;
    isHelper: boolean;
    senderId: string;
  }