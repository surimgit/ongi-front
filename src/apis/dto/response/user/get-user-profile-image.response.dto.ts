import ResponseDto from "../response.dto";

// interface: get user profile image response body DTO //
export default interface GetUserProfileImageResponseDto extends ResponseDto {
    profileImage: string;
}