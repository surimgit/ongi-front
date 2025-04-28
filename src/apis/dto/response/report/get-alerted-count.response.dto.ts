import ResponseDto from "../response.dto";

// interface: get alerted count resopnse body DTO //
export default interface GetAlertedCountResponseDto extends ResponseDto {
    alertedCount: number;
}