// interface: post question request body DTO //

import { QuestionCategory } from "src/types/aliases";

export default interface PostQuestionRequestDto {
  category: QuestionCategory;
  title: string;
  content: string;
}