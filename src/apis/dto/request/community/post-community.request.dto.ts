import { CommunityCategory } from "src/types/aliases";
import Category from "src/types/aliases/category.alias";

// interface: post community request body DTO //
export default interface PostCommunityRequestDto {
    category: CommunityCategory;
    title: string;
    content: string;
}