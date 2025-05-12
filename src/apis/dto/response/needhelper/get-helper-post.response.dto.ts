import NeedHelperPost from "src/types/interfaces/need-helper-post.interface";
import ResponseDto from "../response.dto";

// interface: get Helper response body DTO //
export default interface GetHelperPostResponseDto extends ResponseDto {
    sequence: number;
    userId: string;
    nickname: string;
    postDate: string;
    title: string;
    content: string;
    schedule: string;
    meetingType: string;
    city: string;
    district: string;
    date: string;
    reward: string;
    isRequestSolved: boolean;
    liked: number;
    viewCount: number;
    keyword: string;
}