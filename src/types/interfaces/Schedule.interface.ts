import CalendarColor from "../aliases/calendar-color.alias";

export default interface Schedule {
    calendarSequence: number;
    calendarTitle: string;
    calendarCategory: string;
    calendarMemo: string;
    calendarStart: Date;
    calendarEnd: Date;
    calendarRepeat: '반복 없음'|'매일'|'매주'|'매년';
    color: CalendarColor;
}