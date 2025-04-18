import { Board, CommunityCategory } from "src/types/aliases";

// interface: patch community post request body DTO //
export default interface PatchCommunityPostRequestDto {
    board: Board;
    category: CommunityCategory;
    title: string;
    content: string;
}