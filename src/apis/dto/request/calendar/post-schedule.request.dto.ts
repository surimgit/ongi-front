import CalendarColor from "src/types/aliases/calendar-color.alias";

export default interface PostScheduleRequestDto {
    calendarTitle: string;
    calendarCategory: string;
    calendarMemo: string;
    calendarStart: string;
    calendarEnd: string;
    calendarRepeat: string;
    color: CalendarColor;
}