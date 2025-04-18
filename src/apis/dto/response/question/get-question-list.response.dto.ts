import Question from "src/types/interfaces/question.interface";
import ResponseDto from "../response.dto";

export default interface GetQuestionListResponseDto extends ResponseDto{
  questions: Question[];
}