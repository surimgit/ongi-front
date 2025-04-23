import CalendarColor from "src/types/aliases/calendar-color.alias";

export default interface PatchCalendarRequestDto {
    calendarTitle: string;
    calendarCategory: string;
    calendarMemo: string;
    calendarStart: Date;
    calendarEnd: Date;
    calendarRepeat: string;
    color: CalendarColor;
}