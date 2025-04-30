import ResponseDto from "../response.dto";

// interface: get is admin response body DTO //
export default interface GetIsAdminResponseDto extends ResponseDto {
    isAdmin: Boolean;
}