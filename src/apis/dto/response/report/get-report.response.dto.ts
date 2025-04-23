import ReportEntity from "src/types/interfaces/report.interface";
import ResponseDto from "../response.dto";

// interface: get report response body DTO //
export default interface GetReportResponseDto extends ResponseDto {
    reports: ReportEntity[];
};