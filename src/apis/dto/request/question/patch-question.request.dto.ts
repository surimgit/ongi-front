// interface: patch question request body DTO //

import { QuestionCategory } from "src/types/aliases";

export default interface PatchQuestionRequestDto {
  category: QuestionCategory;
  title: string;
  content: string;
}