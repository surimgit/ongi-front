import ResponseDto from "../response.dto";

// interface: get helper is apply response body DTO //
export default interface GetHelperIsApplyResponseDto extends ResponseDto {
    isApplied: boolean;
}