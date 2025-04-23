import ReportCategory from "src/types/aliases/report-category.alias";

// interface: post report request body DTO //
export default interface PostReportRequestDto {
    reportedId: string;
    reportedEntityNum: number | string | undefined;
    reportedEntityType: string;
    reportedContent: string;
    reportCategory: ReportCategory;
    reportDetail: string | null;
}