import ResponseDto from "../response.dto";

export default interface GetQuestionResponseDto extends ResponseDto{
  questionSequence: number;
  userId: string;
  title: string;
  content: string;
  category: string;
  answer: string;
  inAnswered: boolean;
}