import ResponseDto from "../response.dto";
import { Message } from "src/types/interfaces";

export default interface GetChatMessageResponseDto extends ResponseDto{  
  messageList:  Message[];

}