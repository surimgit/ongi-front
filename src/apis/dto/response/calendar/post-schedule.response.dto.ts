import { ResponseDto } from 'src/apis/dto/response';

export default interface PostScheduleResponseDto extends ResponseDto {
    calendarSequence: number;
}