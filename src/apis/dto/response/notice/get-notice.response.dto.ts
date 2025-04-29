import ResponseDto from "../response.dto";

export default interface GetNoticeResponseDto extends ResponseDto{
  sequence: number;
  title: string;
  content: string;
  postDate: string;
}