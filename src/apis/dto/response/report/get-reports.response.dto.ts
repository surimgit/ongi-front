import ReportEntity from "src/types/interfaces/report.interface";
import ResponseDto from "../response.dto";

// interface: get reports response body DTO //
export default interface GetReportsResponseDto extends ResponseDto {
    reports: ReportEntity[];
};