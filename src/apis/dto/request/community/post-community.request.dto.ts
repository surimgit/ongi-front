import { Board, CommunityCategory } from "src/types/aliases";

// interface: post community request body DTO //
export default interface PostCommunityRequestDto {
    board: Board;
    category: CommunityCategory;
    title: string;
    content: string;
    images: string[] | null;
}