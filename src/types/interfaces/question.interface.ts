import type { QuestionCategory } from "../aliases";

export default interface Question {
  questionSequence: number;
  postDate: string;
  category: QuestionCategory;
  title: string;
  answered: boolean;
}