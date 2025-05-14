import { UserEvent } from "src/types/interfaces";
import ResponseDto from "../response.dto";

// interface: get event list response DTO body //
export default interface GetEventListResponseDto extends ResponseDto {
    events: UserEvent[];
}