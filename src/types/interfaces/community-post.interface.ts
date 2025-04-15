import CommunityCategory from "../aliases/community-category.alias";

export default interface CommunityPost {
    postSequence: number;
    userId: string;
    nickname: string;
    category: CommunityCategory;
    postDate: string;
    title: string;
    content: string;
    liked: number;
}