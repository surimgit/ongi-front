import ResponseDto from "../response.dto";

export default interface GetNoticeResponseDto extends ResponseDto{
  sequence: number;
  postdate: number;
  title: string;
  content: string;
  postDate: string;
}