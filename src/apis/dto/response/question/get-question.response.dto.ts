import { QuestionCategory } from "src/types/aliases";
import ResponseDto from "../response.dto";

export default interface GetQuestionResponseDto extends ResponseDto{
  questionSequence: number;
  userId: string;
  postDate: string;
  title: string;
  content: string;
  category: QuestionCategory;
  answer: string;
  answered: boolean;
}