import ResponseDto from "../response.dto";

export default interface GetChatRoomResponseDto extends ResponseDto{  
  chatSequence: number;
  requesterId: string;
  applicantId: string;
  needHelperSequence: number;
  chatAvailable: boolean;

}