import { ResponseDto } from 'src/apis/dto/response';
import Schedule from 'src/types/interfaces/Schedule.interface';

export default interface GetAllScheduleResponseDto extends ResponseDto {
    schedules: Schedule[];
}