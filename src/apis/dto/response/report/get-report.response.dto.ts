import ReportCategory from "src/types/aliases/report-category.alias";
import ResponseDto from "../response.dto";

// interface: get report response body DTO //
export default interface GetReportResponseDto extends ResponseDto {
    reporterId: string;
    reportedId: string;
    entityNum: number;
    entityType: string;
    reportedContent: string;
    date: string;
    category: ReportCategory;
    detail: string;
    process: string;
}