import ReportCategory from "../aliases/report-category.alias";

export default interface ReportEntity {
    reporterId: string,
    reportedNickname: string,
    reportedId: string,
    reportCategory: ReportCategory,
    reportDate: string,
    reportContent: string,
    reportDetail: string,
    reportProcess: string,
    reportedEntityNum: number | string | undefined,
    reportedEntityType: string,
}