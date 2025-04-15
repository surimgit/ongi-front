import Category from "src/types/aliases/category.alias";

export default interface PostProductRequestDto {
  name: string;

  price: number;
  category: Category;

  content: string;
  productQuantity: number;
  deadline: string;
  image: string;
}