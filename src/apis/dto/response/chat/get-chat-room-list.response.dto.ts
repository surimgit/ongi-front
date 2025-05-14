import Chat from "src/types/interfaces/chat.interface";
import ResponseDto from "../response.dto";

export default interface GetChatRoomListResponseDto extends ResponseDto{  
  chatList:  Chat[];

}